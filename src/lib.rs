mod pb;
mod abi;
use std::ops::Div;
use std::str::FromStr;

use ethabi::Bytes;
use pb::example::{ Contract, Contracts, BlobTransactions, BlobTransaction };
use hex_literal::hex;
use substreams::pb::substreams::module::input::store;
use substreams::scalar::{ BigDecimal, BigInt };

use substreams::store::{ StoreGetProto, StoreSetProto, StoreGet };
use substreams::Hex;
use substreams_entity_change::pb::entity::EntityChanges;
use substreams_entity_change::tables::{ self, Tables, ToValue };
use substreams_ethereum::pb::eth;

use substreams_ethereum::pb::eth::v2::Block;
use pb::sf::ethereum::r#type::v2::clone::{ Block as ProtoBlock, TransactionReceipt };
use std::fs::File;
use std::io::BufReader;
use serde::Deserialize;
const USDC: [u8; 20] = hex!("a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");
const ONEINCH_ORACLE: [u8; 20] = hex!("0AdDd25a91563696D8567Df78D5A01C9a991F9B8");
const CHAINLINK_ORACLE: [u8; 20] = hex!("5f4eC3Df9cbd43714FE2740f5E3616155c5b8419");
use substreams::store::{ StoreNew, StoreSet };
#[derive(Debug, Deserialize)]
struct PriceData {
    avgPrice: f64,
    timestamp: u64,
    timestampF: String,
    minuteId: u64,
}
use std::collections::HashMap;

#[substreams::handlers::store]
pub fn store_prices(_blk: Block, store: StoreSetProto<f64>) {
    if _blk.number.eq(&19426947) {
        store_prices_from_files1(&store);
        store_prices_from_files2(&store);
        store_prices_from_files3(&store);
        store_prices_from_files4(&store);
        store_prices_from_files5(&store);
    }
}

#[substreams::handlers::map]
fn map_block_full(
    blk: Block,
    store_prices: StoreGetProto<f64>
) -> Result<ProtoBlock, substreams::errors::Error> {
    let key2 = blk.timestamp_seconds() / 60; // Get the day bucket (as u64)
    let key_str = key2.to_string();

    let price = match store_prices.get_last(key_str) {
        Some(pool) => pool,
        None => 0.0,
    };
    let mut eth_price_oneinch = String::from("0.0");

    let mut eth_price_chainlink = String::from("0.0");

    if price.gt(&0.0) {
        substreams::log::println(format!("TAKING PRICE FROM STORE :: {}", price.to_string()));

        eth_price_oneinch = price.to_string();

        eth_price_chainlink = price.to_string();
    } else {
        eth_price_oneinch = get_eth_rate().to_string();
        let op = get_chainlinkoracle_eth_price() / exponent_to_big_decimal(9);

        eth_price_chainlink = op.to_string();
    }
    substreams::log::println(
        format!(
            "eth_price_chainlink1::{}:: {} :: {}",
            blk.timestamp_seconds().to_string(),
            key2.to_string(),
            price.to_string()
        )
    );
    substreams::log::println(format!("eth_price_chainlink :: {}", eth_price_chainlink.clone()));
    substreams::log::println(format!("eth_price_oneinch :: {}", eth_price_oneinch.clone()));
    let txns = blk_to_txn_traces_pb(blk.clone());
    let blk_header = blk_to_blk_header_pb(blk.clone());
    let txnss: Vec<u64> = txns
        .clone()
        .into_iter()
        .map(|t| {
            return t.gas_limit;
        })
        .collect();
    // substreams::log::println(format!("TXNS {:?}", txnss));
    Ok(ProtoBlock {
        transaction_traces: txns.clone(),
        hash: blk.hash.clone(),
        number: blk.number.clone(),
        size: blk.size.clone(),
        header: Some(blk_header.clone()),
        ver: blk.ver.clone(),
        eth_price_chainlink: eth_price_chainlink.to_string(),
        eth_price_oneinch: eth_price_oneinch.to_string(),
    })
    // Ok(blk)
}

#[substreams::handlers::map]
fn map_blob_transactions(blk: Block) -> Result<Block, substreams::errors::Error> {
    let eth_price_oneinch = get_eth_rate() * exponent_to_big_decimal(31);
    let eth_price_chainlink = get_chainlinkoracle_eth_price();
    substreams::log::println(
        format!("eth_price_chainlink :: {}", eth_price_chainlink / exponent_to_big_decimal(9))
    );
    substreams::log::println(format!("DECIMALS :: {}", eth_price_oneinch));

    let mut transactions: Vec<BlobTransaction> = blk
        .clone()
        .transactions()
        .into_iter()
        .filter_map(|t: &eth::v2::TransactionTrace| {
            // Provide a default value if blob_gas is None
            let gas = t.blob_gas.unwrap_or(0);

            // Only create BlobGas if gas is greater than 0
            if gas > 0 {
                let hashes: Vec<String> = t.blob_hashes
                    .clone()
                    .into_iter()
                    .map(|bts| vec_u8_to_hex_string(bts))
                    .collect();
                Some(BlobTransaction {
                    blob_gas_used: t.blob_gas.unwrap_or(0),
                    block_number: blk.number,
                    hash: vec_u8_to_hex_string(t.clone().hash),
                    timestamp: blk.timestamp().to_string(),
                })
            } else {
                None
            }
        })
        .collect();
    Ok(blk)
}
#[substreams::handlers::map]
fn map_contract(block: eth::v2::Block) -> Result<Contracts, substreams::errors::Error> {
    let contracts = block
        .calls()
        .filter(|view| !view.call.state_reverted)
        .filter(|view| view.call.call_type == (eth::v2::CallType::Create as i32))
        .map(|view| Contract {
            address: format!("0x{}", Hex(&view.call.address)),
            block_number: block.number,
            timestamp: block.timestamp_seconds().to_string(),
            ordinal: view.call.begin_ordinal,
        })
        .collect();

    Ok(Contracts { contracts })
}

#[substreams::handlers::map]
pub fn graph_out(contracts: Contracts) -> Result<EntityChanges, substreams::errors::Error> {
    // hash map of name to a table
    let mut tables: Tables = Tables::new();

    for contract in contracts.contracts.into_iter() {
        tables
            .create_row("Contract", contract.address)
            .set("timestamp", contract.timestamp)
            .set("blockNumber", contract.block_number);
    }

    Ok(tables.to_entity_changes())
}

substreams_ethereum::init!();

fn vec_u8_to_hex_string(data: Vec<u8>) -> String {
    data.iter()
        .map(|byte| format!("{:02x}", byte))
        .collect()
}
fn get_decimals() -> substreams::scalar::BigInt {
    let decimals = abi::ERC20::functions::Decimals {};
    let decimals_option = decimals.call(USDC.to_vec());

    decimals_option.unwrap()
}
fn get_chainlinkoracle_eth_price() -> substreams::scalar::BigInt {
    let decimals = abi::ChainLinkOracle::functions::LatestAnswer {};
    let decimals_option = decimals.call(CHAINLINK_ORACLE.to_vec());

    decimals_option.unwrap()
}
fn get_owner() -> String {
    let decimals = abi::OneinchOracle::functions::Owner {};
    let decimals_option = decimals.call(ONEINCH_ORACLE.to_vec());

    let d = decimals_option.unwrap().to_vec();
    vec_u8_to_hex_string(d)
}
pub fn exponent_to_big_decimal(decimals: u64) -> BigDecimal {
    let mut result = BigDecimal::one();
    let big_decimal_ten: &BigDecimal = &BigDecimal::from(10 as i32);

    let mut i = 1 as u64;
    while i < decimals {
        result = result * big_decimal_ten.clone();
        i += 1;
    }

    return result;
}
fn get_eth_rate() -> substreams::scalar::BigDecimal {
    substreams::log::println("INSIDE get_eth_rate ::".to_string());
    let ethprice = abi::OneinchOracle::functions::GetRateToEth {
        src_token: USDC.to_vec(),
        use_src_wrappers: true,
    };
    substreams::log::println("INSIDE get_eth_rate ethprice ::".to_string());

    let ethprice_option = ethprice.call(ONEINCH_ORACLE.to_vec());
    substreams::log::println("INSIDE get_eth_rate ethprice_option ::".to_string());

    substreams::log::println(
        format!(
            "ETH PRICE :: {}",
            ethprice_option.clone().unwrap_or(substreams::scalar::BigInt::from(1))
        )
    );
    let rate = ethprice_option.unwrap();
    let rate_decimal = substreams::scalar::BigDecimal::from(rate.clone());

    let precision_factor = substreams::scalar::BigDecimal::from(1); // Adjust as needed

    return (precision_factor / rate_decimal) * exponent_to_big_decimal(31); // Inverse of rate
}

fn blk_to_txn_traces_pb(blk: Block) -> Vec<pb::sf::ethereum::r#type::v2::clone::TransactionTrace> {
    let transaction_traces = blk
        .transactions()
        .into_iter()
        .map(|t| pb::sf::ethereum::r#type::v2::clone::TransactionTrace {
            to: t.to.clone(),
            nonce: t.nonce.clone(),
            gas_price: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
                bytes: t.gas_price
                    .clone()
                    .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                    .unwrap_or_default(),
            }),

            gas_limit: t.gas_limit.clone(),
            value: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
                bytes: t.value
                    .clone()
                    .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                    .unwrap_or_default(),
            }),
            input: t.input.clone(),
            v: t.v.clone(),
            r: t.r.clone(),
            s: t.s.clone(),
            gas_used: t.gas_used.clone(),
            r#type: t.r#type.clone(),
            max_fee_per_gas: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
                bytes: t.max_fee_per_gas
                    .clone()
                    .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                    .unwrap_or_default(),
            }),
            max_priority_fee_per_gas: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
                bytes: t.max_priority_fee_per_gas
                    .clone()
                    .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                    .unwrap_or_default(),
            }),
            index: t.index.clone(),
            hash: t.hash.clone(),
            from: t.from.clone(),
            return_data: t.return_data.clone(),
            public_key: t.public_key.clone(),
            begin_ordinal: t.begin_ordinal.clone(),
            end_ordinal: t.end_ordinal.clone(),
            status: t.status.clone(),
            receipt: Some(pb::sf::ethereum::r#type::v2::clone::TransactionReceipt {
                cumulative_gas_used: t.receipt
                    .as_ref()
                    .clone()
                    .unwrap()
                    .cumulative_gas_used.clone(),
                logs_bloom: t.receipt.as_ref().clone().unwrap().logs_bloom.clone(),
                state_root: t.receipt.as_ref().clone().unwrap().state_root.clone(),
                blob_gas_used: t.receipt.as_ref().clone().unwrap().blob_gas_used.clone(),
                blob_gas_price: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
                    bytes: t.receipt
                        .as_ref()
                        .clone()
                        .unwrap()
                        .blob_gas_price.clone()
                        .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                        .unwrap_or_default(),
                }),
            }),

            blob_gas: t.blob_gas.clone(),
            blob_gas_fee_cap: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
                bytes: t.blob_gas_fee_cap
                    .clone()
                    .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                    .unwrap_or_default(),
            }),
            blob_hashes: t.blob_hashes.clone(),
        })
        .collect();
    transaction_traces
}

fn blk_to_blk_header_pb(blk: Block) -> pb::sf::ethereum::r#type::v2::clone::BlockHeader {
    let blk_header = pb::sf::ethereum::r#type::v2::clone::BlockHeader {
        parent_hash: blk.header.clone().unwrap().parent_hash.clone(),
        uncle_hash: blk.header.clone().unwrap().uncle_hash.clone(),
        coinbase: blk.header.clone().unwrap().coinbase.clone(),
        state_root: blk.header.clone().unwrap().state_root.clone(),
        transactions_root: blk.header.clone().unwrap().transactions_root.clone(),
        receipt_root: blk.header.clone().unwrap().receipt_root.clone(),
        logs_bloom: blk.header.clone().unwrap().logs_bloom.clone(),
        difficulty: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
            bytes: blk.header
                .clone()
                .unwrap()
                .difficulty.clone()
                .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                .unwrap_or_default(),
        }),
        total_difficulty: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
            bytes: blk.header
                .clone()
                .unwrap()
                .total_difficulty.clone()
                .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                .unwrap_or_default(),
        }),
        number: blk.header.clone().unwrap().number.clone(),
        gas_limit: blk.header.clone().unwrap().gas_limit.clone(),
        gas_used: blk.header.clone().unwrap().gas_used.clone(),
        timestamp: blk.header.clone().unwrap().timestamp.clone(),
        extra_data: blk.header.clone().unwrap().extra_data.clone(),
        mix_hash: blk.header.clone().unwrap().mix_hash.clone(),
        nonce: blk.header.clone().unwrap().nonce.clone(),
        hash: blk.header.clone().unwrap().hash.clone(),
        base_fee_per_gas: Some(pb::sf::ethereum::r#type::v2::clone::BigInt {
            bytes: blk.header
                .clone()
                .unwrap()
                .base_fee_per_gas.clone()
                .map(|gp: eth::v2::BigInt| eth::v2::BigInt::from(gp).bytes)
                .unwrap_or_default(),
        }),
        withdrawals_root: blk.header.clone().unwrap().withdrawals_root.clone(),
        blob_gas_used: blk.header.clone().unwrap().blob_gas_used.clone(),
        excess_blob_gas: blk.header.clone().unwrap().excess_blob_gas.clone(),
        parent_beacon_root: blk.header.clone().unwrap().parent_beacon_root.clone(),
    };
    blk_header
}

pub fn store_prices_from_files1(store: &StoreSetProto<f64>) {
    substreams::log::println(format!("ENTER STORE SAVER"));
    let data = include_str!("data1.json"); // Embed file at compile time
    // Deserialize JSON array into Vec<PriceData>
    let price_list: Vec<PriceData> = serde_json
        ::from_str(data)
        .expect("Failed to parse price data");

    for price_data in price_list {
        // Only store if avgPrice > 0
        if price_data.avgPrice > 0.0 {
            let key = price_data.minuteId;
            let key2 = price_data.minuteId.to_string();
            store.set(key, key2, &price_data.avgPrice);
        }
    }
}
pub fn store_prices_from_files2(store: &StoreSetProto<f64>) {
    substreams::log::println(format!("ENTER STORE SAVER"));
    let data = include_str!("data2.json"); // Embed file at compile time
    // Deserialize JSON array into Vec<PriceData>
    let price_list: Vec<PriceData> = serde_json
        ::from_str(data)
        .expect("Failed to parse price data");

    for price_data in price_list {
        // Only store if avgPrice > 0
        if price_data.avgPrice > 0.0 {
            let key = price_data.minuteId;
            let key2 = price_data.minuteId.to_string();
            store.set(key, key2, &price_data.avgPrice);
        }
    }
}
pub fn store_prices_from_files3(store: &StoreSetProto<f64>) {
    substreams::log::println(format!("ENTER STORE SAVER"));
    let data = include_str!("data3.json"); // Embed file at compile time
    // Deserialize JSON array into Vec<PriceData>
    let price_list: Vec<PriceData> = serde_json
        ::from_str(data)
        .expect("Failed to parse price data");

    for price_data in price_list {
        // Only store if avgPrice > 0
        if price_data.avgPrice > 0.0 {
            let key = price_data.minuteId;
            let key2 = price_data.minuteId.to_string();
            store.set(key, key2, &price_data.avgPrice);
        }
    }
}
pub fn store_prices_from_files4(store: &StoreSetProto<f64>) {
    substreams::log::println(format!("ENTER STORE SAVER"));
    let data = include_str!("data4.json"); // Embed file at compile time
    // Deserialize JSON array into Vec<PriceData>
    let price_list: Vec<PriceData> = serde_json
        ::from_str(data)
        .expect("Failed to parse price data");

    for price_data in price_list {
        // Only store if avgPrice > 0
        if price_data.avgPrice > 0.0 {
            let key = price_data.minuteId;
            let key2 = price_data.minuteId.to_string();
            store.set(key, key2, &price_data.avgPrice);
        }
    }
}
pub fn store_prices_from_files5(store: &StoreSetProto<f64>) {
    substreams::log::println(format!("ENTER STORE SAVER"));
    let data = include_str!("data5.json"); // Embed file at compile time
    // Deserialize JSON array into Vec<PriceData>
    let price_list: Vec<PriceData> = serde_json
        ::from_str(data)
        .expect("Failed to parse price data");

    for price_data in price_list {
        // Only store if avgPrice > 0
        if price_data.avgPrice > 0.0 {
            let key = price_data.minuteId;
            let key2 = price_data.minuteId.to_string();
            store.set(key, key2, &price_data.avgPrice);
        }
    }
}

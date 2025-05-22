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
        let data1 = include_str!("./data/data1.json");
        store_prices_from_files(data1, &store);
        let data2 = include_str!("./data/data2.json");
        store_prices_from_files(data2, &store);
        let data3 = include_str!("./data/data3.json");
        store_prices_from_files(data3, &store);
        let data4 = include_str!("./data/data4.json");
        store_prices_from_files(data4, &store);
        let data5 = include_str!("./data/data5.json");
        store_prices_from_files(data5, &store);
        let data6 = include_str!("./data/data6.json");
        store_prices_from_files(data6, &store);
        let data7 = include_str!("./data/data7.json");
        store_prices_from_files(data7, &store);
        let data8 = include_str!("./data/data8.json");
        store_prices_from_files(data8, &store);
        let data9 = include_str!("./data/data9.json");
        store_prices_from_files(data9, &store);
        let data10 = include_str!("./data/data10.json");
        store_prices_from_files(data10, &store);
        let data11 = include_str!("./data/data11.json");
        store_prices_from_files(data11, &store);
        let data12 = include_str!("./data/data12.json");
        store_prices_from_files(data12, &store);
        let data13 = include_str!("./data/data13.json");
        store_prices_from_files(data13, &store);
        let data14 = include_str!("./data/data14.json");
        store_prices_from_files(data14, &store);
        let data15 = include_str!("./data/data15.json");
        store_prices_from_files(data15, &store);
        let data16 = include_str!("./data/data16.json");
        store_prices_from_files(data16, &store);
        let data17 = include_str!("./data/data17.json");
        store_prices_from_files(data17, &store);
        let data18 = include_str!("./data/data18.json");
        store_prices_from_files(data18, &store);
        let data19 = include_str!("./data/data19.json");
        store_prices_from_files(data19, &store);
        let data20 = include_str!("./data/data20.json");
        store_prices_from_files(data20, &store);
        let data21 = include_str!("./data/data21.json");
        store_prices_from_files(data21, &store);
        let data22 = include_str!("./data/data22.json");
        store_prices_from_files(data22, &store);
        let data23 = include_str!("./data/data23.json");
        store_prices_from_files(data23, &store);
        let data24 = include_str!("./data/data24.json");
        store_prices_from_files(data24, &store);
        let data25 = include_str!("./data/data25.json");
        store_prices_from_files(data25, &store);
        let data26 = include_str!("./data/data26.json");
        store_prices_from_files(data26, &store);
        let data27 = include_str!("./data/data27.json");
        store_prices_from_files(data27, &store);
        let data28 = include_str!("./data/data28.json");
        store_prices_from_files(data28, &store);
        let data29 = include_str!("./data/data29.json");
        store_prices_from_files(data29, &store);
        let data30 = include_str!("./data/data30.json");
        store_prices_from_files(data30, &store);
        let data31 = include_str!("./data/data31.json");
        store_prices_from_files(data31, &store);
        let data32 = include_str!("./data/data32.json");
        store_prices_from_files(data32, &store);
        let data33 = include_str!("./data/data33.json");
        store_prices_from_files(data33, &store);
        let data34 = include_str!("./data/data34.json");
        store_prices_from_files(data34, &store);
        let data35 = include_str!("./data/data35.json");
        store_prices_from_files(data35, &store);
        let data36 = include_str!("./data/data36.json");
        store_prices_from_files(data36, &store);
        let data37 = include_str!("./data/data37.json");
        store_prices_from_files(data37, &store);
        let data38 = include_str!("./data/data38.json");
        store_prices_from_files(data38, &store);
        let data39 = include_str!("./data/data39.json");
        store_prices_from_files(data39, &store);
        let data40 = include_str!("./data/data40.json");
        store_prices_from_files(data40, &store);
        let data41 = include_str!("./data/data41.json");
        store_prices_from_files(data41, &store);
        let data42 = include_str!("./data/data42.json");
        store_prices_from_files(data42, &store);
        let data43 = include_str!("./data/data43.json");
        store_prices_from_files(data43, &store);
        let data44 = include_str!("./data/data44.json");
        store_prices_from_files(data44, &store);
        let data45 = include_str!("./data/data45.json");
        store_prices_from_files(data45, &store);
        let data46 = include_str!("./data/data46.json");
        store_prices_from_files(data46, &store);
        let data47 = include_str!("./data/data47.json");
        store_prices_from_files(data47, &store);
        let data48 = include_str!("./data/data48.json");
        store_prices_from_files(data48, &store);
        let data49 = include_str!("./data/data49.json");
        store_prices_from_files(data49, &store);
        let data50 = include_str!("./data/data50.json");
        store_prices_from_files(data50, &store);
        let data51 = include_str!("./data/data51.json");
        store_prices_from_files(data51, &store);
        let data52 = include_str!("./data/data52.json");
        store_prices_from_files(data52, &store);
        let data53 = include_str!("./data/data53.json");
        store_prices_from_files(data53, &store);
        let data54 = include_str!("./data/data54.json");
        store_prices_from_files(data54, &store);
        let data55 = include_str!("./data/data55.json");
        store_prices_from_files(data55, &store);
        let data56 = include_str!("./data/data56.json");
        store_prices_from_files(data56, &store);
        let data57 = include_str!("./data/data57.json");
        store_prices_from_files(data57, &store);
        let data58 = include_str!("./data/data58.json");
        store_prices_from_files(data58, &store);
        let data59 = include_str!("./data/data59.json");
        store_prices_from_files(data59, &store);
        let data60 = include_str!("./data/data60.json");
        store_prices_from_files(data60, &store);
        let data61 = include_str!("./data/data61.json");
        store_prices_from_files(data61, &store);
        let data62 = include_str!("./data/data62.json");
        store_prices_from_files(data62, &store);
        let data63 = include_str!("./data/data63.json");
        store_prices_from_files(data63, &store);
        let data64 = include_str!("./data/data64.json");
        store_prices_from_files(data64, &store);
        let data65 = include_str!("./data/data65.json");
        store_prices_from_files(data65, &store);
        let data66 = include_str!("./data/data66.json");
        store_prices_from_files(data66, &store);
        let data67 = include_str!("./data/data67.json");
        store_prices_from_files(data67, &store);
        let data68 = include_str!("./data/data68.json");
        store_prices_from_files(data68, &store);
        let data69 = include_str!("./data/data69.json");
        store_prices_from_files(data69, &store);
        let data70 = include_str!("./data/data70.json");
        store_prices_from_files(data70, &store);
        let data71 = include_str!("./data/data71.json");
        store_prices_from_files(data71, &store);
        let data72 = include_str!("./data/data72.json");
        store_prices_from_files(data72, &store);
        let data73 = include_str!("./data/data73.json");
        store_prices_from_files(data73, &store);
        let data74 = include_str!("./data/data74.json");
        store_prices_from_files(data74, &store);
        let data75 = include_str!("./data/data75.json");
        store_prices_from_files(data75, &store);
        let data76 = include_str!("./data/data76.json");
        store_prices_from_files(data76, &store);
        let data77 = include_str!("./data/data77.json");
        store_prices_from_files(data77, &store);
        let data78 = include_str!("./data/data78.json");
        store_prices_from_files(data78, &store);
        let data79 = include_str!("./data/data79.json");
        store_prices_from_files(data79, &store);
        let data80 = include_str!("./data/data80.json");
        store_prices_from_files(data80, &store);
        let data81 = include_str!("./data/data81.json");
        store_prices_from_files(data81, &store);
        let data82 = include_str!("./data/data82.json");
        store_prices_from_files(data82, &store);
        let data83 = include_str!("./data/data83.json");
        store_prices_from_files(data83, &store);
        let data84 = include_str!("./data/data84.json");
        store_prices_from_files(data84, &store);
        let data85 = include_str!("./data/data85.json");
        store_prices_from_files(data85, &store);
        let data86 = include_str!("./data/data86.json");
        store_prices_from_files(data86, &store);
        let data87 = include_str!("./data/data87.json");
        store_prices_from_files(data87, &store);
        let data88 = include_str!("./data/data88.json");
        store_prices_from_files(data88, &store);
        let data89 = include_str!("./data/data89.json");
        store_prices_from_files(data89, &store);
        let data90 = include_str!("./data/data90.json");
        store_prices_from_files(data90, &store);
        let data91 = include_str!("./data/data91.json");
        store_prices_from_files(data91, &store);
        let data92 = include_str!("./data/data92.json");
        store_prices_from_files(data92, &store);
        let data93 = include_str!("./data/data93.json");
        store_prices_from_files(data93, &store);
        let data94 = include_str!("./data/data94.json");
        store_prices_from_files(data94, &store);
        let data95 = include_str!("./data/data95.json");
        store_prices_from_files(data95, &store);
        let data96 = include_str!("./data/data96.json");
        store_prices_from_files(data96, &store);
        let data97 = include_str!("./data/data97.json");
        store_prices_from_files(data97, &store);
        let data98 = include_str!("./data/data98.json");
        store_prices_from_files(data98, &store);
        let data99 = include_str!("./data/data99.json");
        store_prices_from_files(data99, &store);
        let data100 = include_str!("./data/data100.json");
        store_prices_from_files(data100, &store);
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

pub fn store_prices_from_files(data: &'static str, store: &StoreSetProto<f64>) {
    substreams::log::println(format!("ENTER STORE SAVER"));

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

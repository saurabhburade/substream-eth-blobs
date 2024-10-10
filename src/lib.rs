mod pb;

use pb::example::{ Contract, Contracts, BlobTransactions, BlobTransaction };

use substreams::Hex;
use substreams_entity_change::pb::entity::EntityChanges;
use substreams_entity_change::tables::{ Tables, ToValue };
use substreams_ethereum::pb::eth;

use substreams_ethereum::pb::eth::v2::Block;

#[substreams::handlers::map]
fn map_block_full(blk: Block) -> Result<Block, substreams::errors::Error> {
    Ok(blk)
}
#[substreams::handlers::map]
fn map_blob_transactions(blk: Block) -> Result<Block, substreams::errors::Error> {
    let mut transactions: Vec<BlobTransaction> = blk
        .clone()
        .transactions()
        .into_iter()
        .filter_map(|t: &eth::v2::TransactionTrace| {
            // Provide a default value if blob_gas is None
            let gas = t.blob_gas.unwrap_or(0);
            // Using 0 as default

            // Only create BlobGas if gas is greater than 0
            if gas > 0 {
                let hashes: Vec<String> = t.blob_hashes
                    .clone()
                    .into_iter()
                    .map(|bts| vec_u8_to_hex_string(bts))
                    .collect();
                substreams::log::println("TXN::".to_string());
                substreams::log::println(
                    format!("HASH :: 0x{}", vec_u8_to_hex_string(t.clone().hash))
                );
                substreams::log::println(format!("SIZE :: {}", blk.size));
                substreams::log::println(format!("BLOB GAS:: {}", t.blob_gas.unwrap_or(0)));
                substreams::log::println(format!("HASHES {:?}", hashes));

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
    let mut tables = Tables::new();

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

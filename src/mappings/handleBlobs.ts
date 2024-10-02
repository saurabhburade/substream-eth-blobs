import { Bytes, log } from "@graphprotocol/graph-ts";
import { Protobuf } from "as-proto/assembly";
import { Block } from "../pb/sf/ethereum/type/v2/Block";

export function handleTransactions(blockBytes: Uint8Array): void {
  const block: Block = Protobuf.decode<Block>(blockBytes, Block.decode);
  const transactions = block.transactionTraces;

  log.info("BLOCK NUMBER :: {} :: {}", [
    block.number.toString(),
    transactions.length.toString(),
  ]);

  for (let index = 0; index < transactions.length; index++) {
    const txn = transactions[index];
    if (txn.type === 3) {
      log.info("BLOB TXN :: {}", [
        Bytes.fromUint8Array(txn.hash).toHexString(),
      ]);
      log.info("BLOB TXN Data :: {} :: {} :: {} :: TYPE: {} :: {}", [
        txn.blobGas.toString(),
        txn.blobHashes.length.toString(),
        txn.blobHashes.toString(),
        txn.type.toString(),
        typeof txn.type,
      ]);
    }
  }
}

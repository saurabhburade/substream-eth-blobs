import { BigDecimal, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { Protobuf } from "as-proto/assembly";
import { Block } from "../pb/sf/ethereum/type/v2/Block";
import { handleBlobTransaction } from "./entity/blobTransaction";
import { BlobBlockData } from "../../generated/schema";
import { handleBlobBlockRegular } from "./entity/blobBlock";

export function handleTransactions(blockBytes: Uint8Array): void {
  const block: Block = Protobuf.decode<Block>(blockBytes, Block.decode);
  const transactions = block.transactionTraces;
  const blockNumber = new BigDecimal(BigInt.fromU64(block.number));

  log.info("BLOCK NUMBER :: {} :: {}", [
    block.number.toString(),
    transactions.length.toString(),
  ]);

  for (let index = 0; index < transactions.length; index++) {
    const txn = transactions[index];

    if (txn.type === 3) {
      let hashes: string[] = [];
      for (let index = 0; index < txn.blobHashes.length; index++) {
        const blobHashRaw = txn.blobHashes[index];
        const blobHash = Bytes.fromUint8Array(blobHashRaw).toHexString();
        hashes.push(blobHash);
      }
      handleBlobTransaction(txn, block);
      // const hashes = txn.blobHashes.map((v: Uint8Array) => {
      //   return Bytes.fromUint8Array(v).toHexString();
      // });
      log.info("BLOB TXN :: {}", [
        Bytes.fromUint8Array(txn.hash).toHexString(),
      ]);
      log.info("BLOB TXN Data :: {} :: {} :: {} :: TYPE: {} :: {}", [
        txn.blobGas.toString(),
        txn.blobHashes.length.toString(),
        txn.blobHashes.toString(),
        txn.type.toString(),
        hashes.toString(),
      ]);
    } else {
      handleBlobBlockRegular(txn, block);
    }
  }
}

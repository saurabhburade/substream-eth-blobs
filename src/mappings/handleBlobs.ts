import { BigDecimal, BigInt, Bytes, log } from "@graphprotocol/graph-ts";
import { Protobuf } from "as-proto/assembly";
import { Block } from "../pb/sf/ethereum/type/v2/clone/Block";
import { handleBlobTransaction } from "./entity/blobTransaction";
import { BlobBlockData } from "../../generated/schema";
import { handleBlobBlockRegular } from "./entity/blobBlock";

export function handleTransactions(blockBytes: Uint8Array): void {
  const block: Block = Protobuf.decode<Block>(blockBytes, Block.decode);
  const transactions = block.transactionTraces;
  const blockNumber = new BigDecimal(BigInt.fromU64(block.number));

  log.info("BLOCK NUMBER :: {} :: {}", [
    BigInt.fromU64(block.number).toString(),
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
      if (txn.receipt !== null && txn.receipt!.blobGasPrice! !== null) {
        const blobGasPriceHex = Bytes.fromUint8Array(
          txn.receipt!.blobGasPrice!.bytes!
        ).toHexString();
        const blobGasPriceNumber = parseInt(blobGasPriceHex, 16);
        const blobGasPrice = BigDecimal.fromString(
          blobGasPriceNumber.toString()
        );
        log.info("BLOB TXN GGAS:: {}", [blobGasPrice.toString()]);
      }
      log.info("BLOB TXN :: {}", [
        Bytes.fromUint8Array(txn.hash).toHexString(),
      ]);
      log.info("BLOB TXN Data :: {} :: {} :: {} :: TYPE: {} :: {}", [
        BigInt.fromI64(txn.blobGas).toString(),
        txn.blobHashes.length.toString(),
        txn.blobHashes.toString(),
        txn.type.toString(),
        hashes.toString(),
      ]);
      handleBlobTransaction(txn, block);
      // const hashes = txn.blobHashes.map((v: Uint8Array) => {
      //   return Bytes.fromUint8Array(v).toHexString();
      // });
    } else {
      handleBlobBlockRegular(txn, block);
    }
  }
}

import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  BlobBlockData,
  BlobsDayData,
  BlobTransaction,
} from "../../../generated/schema";
import { Block } from "../../pb/sf/ethereum/type/v2/clone/Block";
import { TransactionTrace } from "../../pb/sf/ethereum/type/v2/clone/TransactionTrace";
import { ONE_BD, ZERO_BD } from "../../utils/constants";

export function handleBlobBlockRegular(
  txn: TransactionTrace,
  blk: Block
): void {
  const blockNumber = new BigDecimal(BigInt.fromU64(blk.number));
  const hash = Bytes.fromUint8Array(txn.hash).toHexString();
  const from = Bytes.fromUint8Array(txn.from).toHexString();
  const to = Bytes.fromUint8Array(txn.to).toHexString();
  const publicKey = Bytes.fromUint8Array(txn.publicKey).toHexString();
  const returnData = Bytes.fromUint8Array(txn.returnData).toHexString();
  const input = Bytes.fromUint8Array(txn.input).toHexString();
  const timestamp = blk.header!.timestamp!;
  let blobBlock = BlobBlockData.load(blockNumber.toString());
  if (blobBlock === null) {
    // id: ID!;
    // totalBlobTransactionCount: BigDecimal!;
    // totalTransactionCount: BigDecimal!;

    // totalBlockFeeEth: BigDecimal!;
    // totalGasEth: BigDecimal!;
    // totalFeeEth: BigDecimal!;
    // totalValue: BigDecimal!;
    // totalValueEth: BigDecimal!;

    // totalGasUsed: BigDecimal!;
    // totalCumulativeGasUsed: BigDecimal!;

    // totalBlobGas: BigDecimal!;
    // totalBlobGasEth: BigDecimal!;
    // totalBlobGasFeeCap: BigDecimal!;
    // totalBlobHashesCount: BigDecimal!;
    // blockNumber: BigDecimal;
    // timestamp: BigDecimal;
    // size: BigDecimal;
    blobBlock = new BlobBlockData(blockNumber.toString());
    blobBlock.totalBlobTransactionCount = ZERO_BD;
    blobBlock.totalTransactionCount = ZERO_BD;
    blobBlock.totalValue = ZERO_BD;
    blobBlock.totalValueEth = ZERO_BD;
    blobBlock.totalGasEth = ZERO_BD;
    blobBlock.totalFeeEth = ZERO_BD;
    blobBlock.totalGasUsed = ZERO_BD;
    blobBlock.totalCumulativeGasUsed = ZERO_BD;
    blobBlock.totalBlobGas = ZERO_BD;
    blobBlock.totalBlobGasFeeCap = ZERO_BD;
    blobBlock.totalBlobHashesCount = ZERO_BD;
    blobBlock.totalBlobGasEth = ZERO_BD;
    blobBlock.blockNumber = blockNumber;
    blobBlock.size = new BigDecimal(BigInt.fromU64(blk.size));

    blobBlock.timestamp = new BigDecimal(BigInt.fromI64(timestamp.seconds));

    blobBlock.totalBlockFeeEth = ZERO_BD;
    blobBlock.totalBlockFeeUSD = ZERO_BD;
    blobBlock.totalGasUSD = ZERO_BD;
    blobBlock.totalFeeUSD = ZERO_BD;
    blobBlock.totalValueUSD = ZERO_BD;
    blobBlock.totalBlobGasUSD = ZERO_BD;
  }
  //   txn.gasPrice!;
  if (txn.gasPrice !== null) {
    if (txn.gasPrice!.bytes! !== null) {
      const gasPriceHex = Bytes.fromUint8Array(
        txn.gasPrice!.bytes!
      ).toHexString();
      const gasPriceU64 = Bytes.fromUint8Array(txn.gasPrice!.bytes!).toU64();

      const gasPriceNumber = parseInt(gasPriceHex, 16);
      const gasPrice = BigDecimal.fromString(gasPriceNumber.toString());
      const totalGasEth =
        new BigDecimal(BigInt.fromU64(txn.gasUsed!)).times(gasPrice) || ZERO_BD;
      blobBlock.totalBlockFeeEth = blobBlock.totalBlockFeeEth.plus(totalGasEth);
      blobBlock.totalBlockFeeUSD = blobBlock.totalBlockFeeUSD.plus(
        totalGasEth.times(
          BigDecimal.fromString(blk.ethPriceChainlink.toString())
        )
      );
    }
  }

  blobBlock.totalTransactionCount =
    blobBlock.totalTransactionCount.plus(ONE_BD);
  blobBlock.save();
}
export function handleBlobBlockBlobs(txn: BlobTransaction, blk: Block): void {
  const blockNumber = new BigDecimal(BigInt.fromU64(blk.number));
  const timestamp = blk.header!.timestamp!;
  let blobBlock = BlobBlockData.load(blockNumber.toString());
  if (blobBlock === null) {
    blobBlock = new BlobBlockData(blockNumber.toString());
    blobBlock.totalBlobTransactionCount = ZERO_BD;
    blobBlock.totalTransactionCount = ZERO_BD;

    blobBlock.totalValue = ZERO_BD;
    blobBlock.totalValueEth = ZERO_BD;
    blobBlock.totalGasEth = ZERO_BD;
    blobBlock.totalFeeEth = ZERO_BD;
    blobBlock.totalGasUsed = ZERO_BD;
    blobBlock.totalCumulativeGasUsed = ZERO_BD;
    blobBlock.totalBlobGas = ZERO_BD;
    blobBlock.totalBlobGasFeeCap = ZERO_BD;
    blobBlock.totalBlobHashesCount = ZERO_BD;
    blobBlock.totalBlobGasEth = ZERO_BD;
    blobBlock.blockNumber = blockNumber;
    blobBlock.size = new BigDecimal(BigInt.fromU64(blk.size));

    blobBlock.timestamp = new BigDecimal(BigInt.fromI64(timestamp.seconds));
    blobBlock.totalBlockFeeEth = ZERO_BD;
    blobBlock.totalBlockFeeUSD = ZERO_BD;
    blobBlock.totalGasUSD = ZERO_BD;
    blobBlock.totalFeeUSD = ZERO_BD;
    blobBlock.totalValueUSD = ZERO_BD;
    blobBlock.totalBlobGasUSD = ZERO_BD;
  }
  blobBlock.totalTransactionCount =
    blobBlock.totalTransactionCount.plus(ONE_BD);
  const totalGasEth = txn.gasUsed!.times(txn.gasPrice!) || ZERO_BD;
  const totalBlobGasEth = txn.blobGas!.times(txn.blobGasPrice!) || ZERO_BD;
  const totalFeeEth = txn.gasUsed!.times(txn.gasPrice!) || ZERO_BD;
  const totalValue = txn.value || ZERO_BD;
  const totalValueEth = txn.value || ZERO_BD;
  const totalGasUsed = txn.gasUsed || ZERO_BD;
  const totalCumulativeGasUsed = txn.cumulativeGasUsed || ZERO_BD;
  const totalBlobGas = txn.blobGas || ZERO_BD;
  const totalBlobGasFeeCap = txn.blobGasFeeCap || ZERO_BD;
  const totalBlobHashesCount = txn.blobHashesLength || ZERO_BD;
  blobBlock.totalBlobTransactionCount =
    blobBlock.totalBlobTransactionCount.plus(ONE_BD);

  blobBlock.totalGasEth = blobBlock.totalGasEth.plus(totalGasEth!);
  blobBlock.totalBlockFeeEth = blobBlock.totalBlockFeeEth.plus(totalGasEth);
  blobBlock.totalBlockFeeUSD = blobBlock.totalBlockFeeUSD.plus(
    totalGasEth.times(BigDecimal.fromString(blk.ethPriceChainlink.toString()))
  );
  blobBlock.totalFeeEth = blobBlock.totalFeeEth.plus(totalFeeEth!);
  blobBlock.totalValue = blobBlock.totalValue.plus(totalValue!);
  blobBlock.totalValueEth = blobBlock.totalValueEth.plus(totalValueEth!);
  blobBlock.totalGasUsed = blobBlock.totalGasUsed.plus(totalGasUsed!);
  blobBlock.totalCumulativeGasUsed = blobBlock.totalCumulativeGasUsed.plus(
    totalCumulativeGasUsed!
  );

  blobBlock.totalBlobGas = blobBlock.totalBlobGas.plus(totalBlobGas!);
  blobBlock.totalBlobGasFeeCap = blobBlock.totalBlobGasFeeCap.plus(
    totalBlobGasFeeCap!
  );
  blobBlock.totalBlobHashesCount = blobBlock.totalBlobHashesCount.plus(
    totalBlobHashesCount!
  );
  blobBlock.totalBlobGasEth = blobBlock.totalBlobGasEth.plus(totalBlobGasEth!);
  blobBlock.totalGasUSD = blobBlock.totalGasUSD.plus(
    totalBlobGasEth!.times(
      BigDecimal.fromString(blk.ethPriceChainlink.toString())
    )
  );
  blobBlock.totalFeeUSD = blobBlock.totalFeeUSD.plus(
    totalFeeEth!.times(BigDecimal.fromString(blk.ethPriceChainlink.toString()))
  );
  blobBlock.totalValueUSD = blobBlock.totalValueUSD.plus(
    totalValueEth!.times(
      BigDecimal.fromString(blk.ethPriceChainlink.toString())
    )
  );
  blobBlock.totalBlobGasUSD = blobBlock.totalBlobGasUSD.plus(
    totalBlobGasEth!.times(
      BigDecimal.fromString(blk.ethPriceChainlink.toString())
    )
  );
  blobBlock.save();
}

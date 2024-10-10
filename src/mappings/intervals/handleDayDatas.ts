import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import {
  Account,
  BlobsDayData,
  BlobTransaction,
} from "../../../generated/schema";
import { Block } from "../../pb/sf/ethereum/type/v2/Block";
import { TransactionTrace } from "../../pb/sf/ethereum/type/v2/TransactionTrace";
import { ONE_BD, ZERO_BD } from "../../utils/constants";

export function handleBlobsDayData(txn: BlobTransaction, blk: Block): void {
  const totalGasEth = txn.cumulativeGasUsed!.times(txn.gasPrice!) || ZERO_BD;
  const totalBlobGasEth = txn.blobGas!.times(txn.blobGasPrice!) || ZERO_BD;
  const totalFeeEth = txn.gasUsed!.times(txn.gasPrice!) || ZERO_BD;
  const totalValue = txn.value || ZERO_BD;
  const totalValueEth = txn.value || ZERO_BD;
  const totalGasUsed = txn.gasUsed || ZERO_BD;
  const totalCumulativeGasUsed = txn.cumulativeGasUsed || ZERO_BD;
  const totalBlobGas = txn.blobGas || ZERO_BD;
  const totalBlobGasFeeCap = txn.blobGasFeeCap || ZERO_BD;
  const totalBlobHashesCount = txn.blobHashesLength || ZERO_BD;
  if (blk.header !== null && blk.header!.timestamp !== null) {
    let timestamp = blk.header!.timestamp!;
    if (timestamp !== null && timestamp.seconds !== null) {
      let dayID = BigInt.fromI64(timestamp.seconds).div(BigInt.fromI32(86400));
      let pdayID = BigInt.fromI64(timestamp.seconds)
        .minus(BigInt.fromI32(86400))
        .div(BigInt.fromI32(86400));

      let dayStartTimestamp = dayID.times(BigInt.fromI32(86400));
      let prevdayStartTimestamp = pdayID.times(BigInt.fromI32(86400));
      let blobsDayID = "BlobsDayData-"
        .toString()
        .concat("-")
        .concat(dayID.toString());
      let blobsDayIDPrev = "BlobsDayData-"
        .toString()
        .concat("-")
        .concat(pdayID.toString());
      let blobsDayData = BlobsDayData.load(blobsDayID);
      let blobsDayDataPrev = BlobsDayData.load(blobsDayIDPrev);
      if (blobsDayData === null) {
        blobsDayData = new BlobsDayData(blobsDayID);
        blobsDayData.totalBlobTransactionCount = ZERO_BD;
        blobsDayData.totalGasEth = ZERO_BD;
        blobsDayData.totalValue = ZERO_BD;
        blobsDayData.totalValueEth = ZERO_BD;
        blobsDayData.totalGasUsed = ZERO_BD;
        blobsDayData.totalCumulativeGasUsed = ZERO_BD;
        blobsDayData.totalBlobGas = ZERO_BD;
        blobsDayData.totalBlobGasFeeCap = ZERO_BD;
        blobsDayData.totalBlobHashesCount = ZERO_BD;
        blobsDayData.totalBlobGasEth = ZERO_BD;
        blobsDayData.totalFeeEth = ZERO_BD;
        blobsDayData.totalBlobBlocks = ZERO_BD;
        blobsDayData.dayStartTimestamp = new BigDecimal(dayStartTimestamp);
      }
      if (blobsDayDataPrev !== null) {
        blobsDayData.previousBlobsDayData = blobsDayDataPrev.id;
      }

      blobsDayData.totalBlobTransactionCount =
        blobsDayData.totalBlobTransactionCount.plus(ONE_BD);

      blobsDayData.totalGasEth = blobsDayData.totalGasEth.plus(totalGasEth!);
      blobsDayData.totalFeeEth = blobsDayData.totalFeeEth.plus(totalFeeEth!);
      blobsDayData.totalValue = blobsDayData.totalValue.plus(totalValue!);
      blobsDayData.totalValueEth = blobsDayData.totalValueEth.plus(
        totalValueEth!
      );
      blobsDayData.totalGasUsed = blobsDayData.totalGasUsed.plus(totalGasUsed!);
      blobsDayData.totalCumulativeGasUsed =
        blobsDayData.totalCumulativeGasUsed.plus(totalCumulativeGasUsed!);

      blobsDayData.totalBlobGas = blobsDayData.totalBlobGas.plus(totalBlobGas!);
      blobsDayData.totalBlobGasFeeCap = blobsDayData.totalBlobGasFeeCap.plus(
        totalBlobGasFeeCap!
      );
      blobsDayData.totalBlobHashesCount =
        blobsDayData.totalBlobHashesCount.plus(totalBlobHashesCount!);
      blobsDayData.totalBlobGasEth = blobsDayData.totalBlobGasEth.plus(
        totalBlobGasEth!
      );
      const blocknumber = new BigDecimal(BigInt.fromU64(blk.number));
      if (blobsDayData.lastUpdatedBlock !== null) {
        if (blocknumber.equals(blobsDayData.lastUpdatedBlock!)) {
          blobsDayData.lastUpdatedBlock = blobsDayData.lastUpdatedBlock!;
        } else {
          blobsDayData.lastUpdatedBlock = blocknumber;
          blobsDayData.totalBlobBlocks =
            blobsDayData.totalBlobBlocks!.plus(ONE_BD);
        }
      } else {
        blobsDayData.lastUpdatedBlock = blocknumber;
        blobsDayData.totalBlobBlocks =
          blobsDayData.totalBlobBlocks!.plus(ONE_BD);
      }
      blobsDayData.save();
    }
  }
}


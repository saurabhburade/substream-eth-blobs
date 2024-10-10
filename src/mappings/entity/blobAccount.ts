import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import {
  Account,
  BlobBlockData,
  BlobsDayData,
  BlobsHourData,
  BlobTransaction,
  CollectiveData,
} from "../../../generated/schema";
import { Block } from "../../pb/sf/ethereum/type/v2/Block";
import { TransactionTrace } from "../../pb/sf/ethereum/type/v2/TransactionTrace";
import { ONE_BD, ZERO_BD, ZERO_BI } from "../../utils/constants";
import { handleBlobsDayData } from "../intervals/handleDayDatas";
import { handleBlobsHourData } from "../intervals/handleHourDatas";
import { handleAccountDayData } from "../intervals/handleDayDataAccount";
import { handleAccountHourData } from "../intervals/handleHourDataAccount";

export function handleBlobsAccount(txn: BlobTransaction, blk: Block): void {
  const from = txn.from;
  let blobAccount = Account.load(from);
  if (blobAccount === null) {
    blobAccount = new Account(from);
    blobAccount.totalBlobTransactionCount = ZERO_BD;
    blobAccount.totalValue = ZERO_BD;
    blobAccount.totalValueEth = ZERO_BD;
    blobAccount.totalGasEth = ZERO_BD;
    blobAccount.totalFeeEth = ZERO_BD;
    blobAccount.totalGasUsed = ZERO_BD;
    blobAccount.totalCumulativeGasUsed = ZERO_BD;
    blobAccount.totalBlobGas = ZERO_BD;
    blobAccount.totalBlobGasFeeCap = ZERO_BD;
    blobAccount.totalBlobHashesCount = ZERO_BD;
    blobAccount.totalBlobGasEth = ZERO_BD;
    blobAccount.totalBlobBlocks = ZERO_BD;
    handleNewBlobsAccount(txn, blk);
  }
  //   let totalGasEth = ZERO_BD;
  //     if (txn.gasUsed !== null && ) {
  //   }
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
  blobAccount.totalBlobTransactionCount =
    blobAccount.totalBlobTransactionCount.plus(ONE_BD);

  blobAccount.totalGasEth = blobAccount.totalGasEth.plus(totalGasEth!);
  blobAccount.totalFeeEth = blobAccount.totalFeeEth.plus(totalFeeEth!);
  blobAccount.totalValue = blobAccount.totalValue.plus(totalValue!);
  blobAccount.totalValueEth = blobAccount.totalValueEth.plus(totalValueEth!);
  blobAccount.totalGasUsed = blobAccount.totalGasUsed.plus(totalGasUsed!);
  blobAccount.totalCumulativeGasUsed = blobAccount.totalCumulativeGasUsed.plus(
    totalCumulativeGasUsed!
  );

  blobAccount.totalBlobGas = blobAccount.totalBlobGas.plus(totalBlobGas!);
  blobAccount.totalBlobGasFeeCap = blobAccount.totalBlobGasFeeCap.plus(
    totalBlobGasFeeCap!
  );
  blobAccount.totalBlobHashesCount = blobAccount.totalBlobHashesCount.plus(
    totalBlobHashesCount!
  );
  blobAccount.totalBlobGasEth = blobAccount.totalBlobGasEth.plus(
    totalBlobGasEth!
  );
  const blocknumber = new BigDecimal(BigInt.fromU64(blk.number));
  if (blobAccount.lastUpdatedBlock !== null) {
    if (blocknumber.equals(blobAccount.lastUpdatedBlock!)) {
      blobAccount.lastUpdatedBlock = blobAccount.lastUpdatedBlock!;
    } else {
      blobAccount.lastUpdatedBlock = blocknumber;
      blobAccount.totalBlobBlocks = blobAccount.totalBlobBlocks!.plus(ONE_BD);
    }
  } else {
    blobAccount.lastUpdatedBlock = blocknumber;
    blobAccount.totalBlobBlocks = blobAccount.totalBlobBlocks!.plus(ONE_BD);
  }
  // BLOBS DAY DATAS
  //   handleBlobsDayData(txn, blk);
  //   handleBlobsHourData(txn, blk);

  // let blobsDayData =
  handleAccountDayData(txn, blk, blobAccount);
  handleAccountHourData(txn, blk, blobAccount);
  blobAccount.save();
}

export function handleNewBlobsAccount(txn: BlobTransaction, blk: Block): void {
  const blockNumber = new BigDecimal(BigInt.fromU64(blk.number));
  let collectiveData = CollectiveData.load("1");
  if (collectiveData !== null) {
    if (collectiveData.totalBlobAccounts === null) {
      collectiveData.totalBlobAccounts = ZERO_BD;
    }
    collectiveData.totalBlobAccounts =
      collectiveData.totalBlobAccounts!.plus(ONE_BD);
    collectiveData.save();
  }
  let blobBlock = BlobBlockData.load(blockNumber.toString());
  if (blobBlock !== null) {
    if (blobBlock.totalBlobAccounts === null) {
      blobBlock.totalBlobAccounts = ZERO_BD;
    }
    blobBlock.totalBlobAccounts = blobBlock.totalBlobAccounts!.plus(ONE_BD);
    blobBlock.save();
  }
  if (blk.header !== null && blk.header!.timestamp !== null) {
    let timestamp = blk.header!.timestamp!;
    if (timestamp !== null && timestamp.seconds !== null) {
      let dayID = BigInt.fromI64(timestamp.seconds).div(BigInt.fromI32(86400));
      let hourID = BigInt.fromI64(timestamp.seconds).div(BigInt.fromI32(3600));
      let blobsDayID = "BlobsDayData-"
        .toString()
        .concat("-")
        .concat(dayID.toString());
      let blobsHourID = "BlobsHourData-"
        .toString()
        .concat("-")
        .concat(hourID.toString());
      let blobsDayData = BlobsDayData.load(blobsDayID);
      let blobsHourData = BlobsHourData.load(blobsHourID);
      if (blobsDayData !== null) {
        if (blobsDayData.totalBlobAccounts === null) {
          blobsDayData.totalBlobAccounts = ZERO_BD;
        }
        blobsDayData.totalBlobAccounts =
          blobsDayData.totalBlobAccounts!.plus(ONE_BD);
        blobsDayData.save();
      }
      if (blobsHourData !== null) {
        if (blobsHourData.totalBlobAccounts === null) {
          blobsHourData.totalBlobAccounts = ZERO_BD;
        }
        blobsHourData.totalBlobAccounts =
          blobsHourData.totalBlobAccounts!.plus(ONE_BD);
        blobsHourData.save();
      }
    }
  }
}

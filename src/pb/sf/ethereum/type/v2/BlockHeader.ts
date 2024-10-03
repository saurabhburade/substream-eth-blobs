// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";
import { BigInt } from "./BigInt";
import { Timestamp } from "../../../../google/protobuf/Timestamp";
import { Uint64NestedArray } from "./Uint64NestedArray";

export class BlockHeader {
  static encode(message: BlockHeader, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.parentHash);

    writer.uint32(18);
    writer.bytes(message.uncleHash);

    writer.uint32(26);
    writer.bytes(message.coinbase);

    writer.uint32(34);
    writer.bytes(message.stateRoot);

    writer.uint32(42);
    writer.bytes(message.transactionsRoot);

    writer.uint32(50);
    writer.bytes(message.receiptRoot);

    writer.uint32(58);
    writer.bytes(message.logsBloom);

    const difficulty = message.difficulty;
    if (difficulty !== null) {
      writer.uint32(66);
      writer.fork();
      BigInt.encode(difficulty, writer);
      writer.ldelim();
    }

    const totalDifficulty = message.totalDifficulty;
    if (totalDifficulty !== null) {
      writer.uint32(138);
      writer.fork();
      BigInt.encode(totalDifficulty, writer);
      writer.ldelim();
    }

    writer.uint32(72);
    writer.uint64(message.number);

    writer.uint32(80);
    writer.uint64(message.gasLimit);

    writer.uint32(88);
    writer.uint64(message.gasUsed);

    const timestamp = message.timestamp;
    if (timestamp !== null) {
      writer.uint32(98);
      writer.fork();
      Timestamp.encode(timestamp, writer);
      writer.ldelim();
    }

    writer.uint32(106);
    writer.bytes(message.extraData);

    writer.uint32(114);
    writer.bytes(message.mixHash);

    writer.uint32(120);
    writer.uint64(message.nonce);

    writer.uint32(130);
    writer.bytes(message.hash);

    const baseFeePerGas = message.baseFeePerGas;
    if (baseFeePerGas !== null) {
      writer.uint32(146);
      writer.fork();
      BigInt.encode(baseFeePerGas, writer);
      writer.ldelim();
    }

    writer.uint32(154);
    writer.bytes(message.withdrawalsRoot);

    const txDependency = message.txDependency;
    if (txDependency !== null) {
      writer.uint32(162);
      writer.fork();
      Uint64NestedArray.encode(txDependency, writer);
      writer.ldelim();
    }

    writer.uint32(176);
    writer.uint64(message.blobGasUsed);

    writer.uint32(184);
    writer.uint64(message.excessBlobGas);

    writer.uint32(194);
    writer.bytes(message.parentBeaconRoot);
  }

  static decode(reader: Reader, length: i32): BlockHeader {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new BlockHeader();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.parentHash = reader.bytes();
          break;

        case 2:
          message.uncleHash = reader.bytes();
          break;

        case 3:
          message.coinbase = reader.bytes();
          break;

        case 4:
          message.stateRoot = reader.bytes();
          break;

        case 5:
          message.transactionsRoot = reader.bytes();
          break;

        case 6:
          message.receiptRoot = reader.bytes();
          break;

        case 7:
          message.logsBloom = reader.bytes();
          break;

        case 8:
          message.difficulty = BigInt.decode(reader, reader.uint32());
          break;

        case 17:
          message.totalDifficulty = BigInt.decode(reader, reader.uint32());
          break;

        case 9:
          message.number = reader.uint64();
          break;

        case 10:
          message.gasLimit = reader.uint64();
          break;

        case 11:
          message.gasUsed = reader.uint64();
          break;

        case 12:
          message.timestamp = Timestamp.decode(reader, reader.uint32());
          break;

        case 13:
          message.extraData = reader.bytes();
          break;

        case 14:
          message.mixHash = reader.bytes();
          break;

        case 15:
          message.nonce = reader.uint64();
          break;

        case 16:
          message.hash = reader.bytes();
          break;

        case 18:
          message.baseFeePerGas = BigInt.decode(reader, reader.uint32());
          break;

        case 19:
          message.withdrawalsRoot = reader.bytes();
          break;

        case 20:
          message.txDependency = Uint64NestedArray.decode(
            reader,
            reader.uint32()
          );
          break;

        case 22:
          message.blobGasUsed = reader.uint64();
          break;

        case 23:
          message.excessBlobGas = reader.uint64();
          break;

        case 24:
          message.parentBeaconRoot = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  parentHash: Uint8Array;
  uncleHash: Uint8Array;
  coinbase: Uint8Array;
  stateRoot: Uint8Array;
  transactionsRoot: Uint8Array;
  receiptRoot: Uint8Array;
  logsBloom: Uint8Array;
  difficulty: BigInt | null;
  totalDifficulty: BigInt | null;
  number: u64;
  gasLimit: u64;
  gasUsed: u64;
  timestamp: Timestamp | null;
  extraData: Uint8Array;
  mixHash: Uint8Array;
  nonce: u64;
  hash: Uint8Array;
  baseFeePerGas: BigInt | null;
  withdrawalsRoot: Uint8Array;
  txDependency: Uint64NestedArray | null;
  blobGasUsed: u64;
  excessBlobGas: u64;
  parentBeaconRoot: Uint8Array;

  constructor(
    parentHash: Uint8Array = new Uint8Array(0),
    uncleHash: Uint8Array = new Uint8Array(0),
    coinbase: Uint8Array = new Uint8Array(0),
    stateRoot: Uint8Array = new Uint8Array(0),
    transactionsRoot: Uint8Array = new Uint8Array(0),
    receiptRoot: Uint8Array = new Uint8Array(0),
    logsBloom: Uint8Array = new Uint8Array(0),
    difficulty: BigInt | null = null,
    totalDifficulty: BigInt | null = null,
    number: u64 = 0,
    gasLimit: u64 = 0,
    gasUsed: u64 = 0,
    timestamp: Timestamp | null = null,
    extraData: Uint8Array = new Uint8Array(0),
    mixHash: Uint8Array = new Uint8Array(0),
    nonce: u64 = 0,
    hash: Uint8Array = new Uint8Array(0),
    baseFeePerGas: BigInt | null = null,
    withdrawalsRoot: Uint8Array = new Uint8Array(0),
    txDependency: Uint64NestedArray | null = null,
    blobGasUsed: u64 = 0,
    excessBlobGas: u64 = 0,
    parentBeaconRoot: Uint8Array = new Uint8Array(0)
  ) {
    this.parentHash = parentHash;
    this.uncleHash = uncleHash;
    this.coinbase = coinbase;
    this.stateRoot = stateRoot;
    this.transactionsRoot = transactionsRoot;
    this.receiptRoot = receiptRoot;
    this.logsBloom = logsBloom;
    this.difficulty = difficulty;
    this.totalDifficulty = totalDifficulty;
    this.number = number;
    this.gasLimit = gasLimit;
    this.gasUsed = gasUsed;
    this.timestamp = timestamp;
    this.extraData = extraData;
    this.mixHash = mixHash;
    this.nonce = nonce;
    this.hash = hash;
    this.baseFeePerGas = baseFeePerGas;
    this.withdrawalsRoot = withdrawalsRoot;
    this.txDependency = txDependency;
    this.blobGasUsed = blobGasUsed;
    this.excessBlobGas = excessBlobGas;
    this.parentBeaconRoot = parentBeaconRoot;
  }
}

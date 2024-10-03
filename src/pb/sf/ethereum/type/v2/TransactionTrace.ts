// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";
import { BigInt } from "./BigInt";
import { AccessTuple } from "./AccessTuple";
import { TransactionReceipt } from "./TransactionReceipt";
import { Call } from "./Call";
import { Type } from "./TransactionTrace/Type";
import { TransactionTraceStatus } from "./TransactionTraceStatus";

export class TransactionTrace {
  static encode(message: TransactionTrace, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.to);

    writer.uint32(16);
    writer.uint64(message.nonce);

    const gasPrice = message.gasPrice;
    if (gasPrice !== null) {
      writer.uint32(26);
      writer.fork();
      BigInt.encode(gasPrice, writer);
      writer.ldelim();
    }

    writer.uint32(32);
    writer.uint64(message.gasLimit);

    const value = message.value;
    if (value !== null) {
      writer.uint32(42);
      writer.fork();
      BigInt.encode(value, writer);
      writer.ldelim();
    }

    writer.uint32(50);
    writer.bytes(message.input);

    writer.uint32(58);
    writer.bytes(message.v);

    writer.uint32(66);
    writer.bytes(message.r);

    writer.uint32(74);
    writer.bytes(message.s);

    writer.uint32(80);
    writer.uint64(message.gasUsed);

    writer.uint32(96);
    writer.int32(message.type);

    const accessList = message.accessList;
    for (let i: i32 = 0; i < accessList.length; ++i) {
      writer.uint32(114);
      writer.fork();
      AccessTuple.encode(accessList[i], writer);
      writer.ldelim();
    }

    const maxFeePerGas = message.maxFeePerGas;
    if (maxFeePerGas !== null) {
      writer.uint32(90);
      writer.fork();
      BigInt.encode(maxFeePerGas, writer);
      writer.ldelim();
    }

    const maxPriorityFeePerGas = message.maxPriorityFeePerGas;
    if (maxPriorityFeePerGas !== null) {
      writer.uint32(106);
      writer.fork();
      BigInt.encode(maxPriorityFeePerGas, writer);
      writer.ldelim();
    }

    writer.uint32(160);
    writer.uint32(message.index);

    writer.uint32(170);
    writer.bytes(message.hash);

    writer.uint32(178);
    writer.bytes(message.from);

    writer.uint32(186);
    writer.bytes(message.returnData);

    writer.uint32(194);
    writer.bytes(message.publicKey);

    writer.uint32(200);
    writer.uint64(message.beginOrdinal);

    writer.uint32(208);
    writer.uint64(message.endOrdinal);

    writer.uint32(240);
    writer.int32(message.status);

    const receipt = message.receipt;
    if (receipt !== null) {
      writer.uint32(250);
      writer.fork();
      TransactionReceipt.encode(receipt, writer);
      writer.ldelim();
    }

    const calls = message.calls;
    for (let i: i32 = 0; i < calls.length; ++i) {
      writer.uint32(258);
      writer.fork();
      Call.encode(calls[i], writer);
      writer.ldelim();
    }

    writer.uint32(264);
    writer.uint64(message.blobGas);

    const blobGasFeeCap = message.blobGasFeeCap;
    if (blobGasFeeCap !== null) {
      writer.uint32(274);
      writer.fork();
      BigInt.encode(blobGasFeeCap, writer);
      writer.ldelim();
    }

    const blobHashes = message.blobHashes;
    if (blobHashes.length !== 0) {
      for (let i: i32 = 0; i < blobHashes.length; ++i) {
        writer.uint32(282);
        writer.bytes(blobHashes[i]);
      }
    }
  }

  static decode(reader: Reader, length: i32): TransactionTrace {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new TransactionTrace();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.to = reader.bytes();
          break;

        case 2:
          message.nonce = reader.uint64();
          break;

        case 3:
          message.gasPrice = BigInt.decode(reader, reader.uint32());
          break;

        case 4:
          message.gasLimit = reader.uint64();
          break;

        case 5:
          message.value = BigInt.decode(reader, reader.uint32());
          break;

        case 6:
          message.input = reader.bytes();
          break;

        case 7:
          message.v = reader.bytes();
          break;

        case 8:
          message.r = reader.bytes();
          break;

        case 9:
          message.s = reader.bytes();
          break;

        case 10:
          message.gasUsed = reader.uint64();
          break;

        case 12:
          message.type = reader.int32();
          break;

        case 14:
          message.accessList.push(AccessTuple.decode(reader, reader.uint32()));
          break;

        case 11:
          message.maxFeePerGas = BigInt.decode(reader, reader.uint32());
          break;

        case 13:
          message.maxPriorityFeePerGas = BigInt.decode(reader, reader.uint32());
          break;

        case 20:
          message.index = reader.uint32();
          break;

        case 21:
          message.hash = reader.bytes();
          break;

        case 22:
          message.from = reader.bytes();
          break;

        case 23:
          message.returnData = reader.bytes();
          break;

        case 24:
          message.publicKey = reader.bytes();
          break;

        case 25:
          message.beginOrdinal = reader.uint64();
          break;

        case 26:
          message.endOrdinal = reader.uint64();
          break;

        case 30:
          message.status = reader.int32();
          break;

        case 31:
          message.receipt = TransactionReceipt.decode(reader, reader.uint32());
          break;

        case 32:
          message.calls.push(Call.decode(reader, reader.uint32()));
          break;

        case 33:
          message.blobGas = reader.uint64();
          break;

        case 34:
          message.blobGasFeeCap = BigInt.decode(reader, reader.uint32());
          break;

        case 35:
          message.blobHashes.push(reader.bytes());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  to: Uint8Array;
  nonce: u64;
  gasPrice: BigInt | null;
  gasLimit: u64;
  value: BigInt | null;
  input: Uint8Array;
  v: Uint8Array;
  r: Uint8Array;
  s: Uint8Array;
  gasUsed: u64;
  type: Type;
  accessList: Array<AccessTuple>;
  maxFeePerGas: BigInt | null;
  maxPriorityFeePerGas: BigInt | null;
  index: u32;
  hash: Uint8Array;
  from: Uint8Array;
  returnData: Uint8Array;
  publicKey: Uint8Array;
  beginOrdinal: u64;
  endOrdinal: u64;
  status: TransactionTraceStatus;
  receipt: TransactionReceipt | null;
  calls: Array<Call>;
  blobGas: u64;
  blobGasFeeCap: BigInt | null;
  blobHashes: Array<Uint8Array>;

  constructor(
    to: Uint8Array = new Uint8Array(0),
    nonce: u64 = 0,
    gasPrice: BigInt | null = null,
    gasLimit: u64 = 0,
    value: BigInt | null = null,
    input: Uint8Array = new Uint8Array(0),
    v: Uint8Array = new Uint8Array(0),
    r: Uint8Array = new Uint8Array(0),
    s: Uint8Array = new Uint8Array(0),
    gasUsed: u64 = 0,
    type: Type = 0,
    accessList: Array<AccessTuple> = [],
    maxFeePerGas: BigInt | null = null,
    maxPriorityFeePerGas: BigInt | null = null,
    index: u32 = 0,
    hash: Uint8Array = new Uint8Array(0),
    from: Uint8Array = new Uint8Array(0),
    returnData: Uint8Array = new Uint8Array(0),
    publicKey: Uint8Array = new Uint8Array(0),
    beginOrdinal: u64 = 0,
    endOrdinal: u64 = 0,
    status: TransactionTraceStatus = 0,
    receipt: TransactionReceipt | null = null,
    calls: Array<Call> = [],
    blobGas: u64 = 0,
    blobGasFeeCap: BigInt | null = null,
    blobHashes: Array<Uint8Array> = []
  ) {
    this.to = to;
    this.nonce = nonce;
    this.gasPrice = gasPrice;
    this.gasLimit = gasLimit;
    this.value = value;
    this.input = input;
    this.v = v;
    this.r = r;
    this.s = s;
    this.gasUsed = gasUsed;
    this.type = type;
    this.accessList = accessList;
    this.maxFeePerGas = maxFeePerGas;
    this.maxPriorityFeePerGas = maxPriorityFeePerGas;
    this.index = index;
    this.hash = hash;
    this.from = from;
    this.returnData = returnData;
    this.publicKey = publicKey;
    this.beginOrdinal = beginOrdinal;
    this.endOrdinal = endOrdinal;
    this.status = status;
    this.receipt = receipt;
    this.calls = calls;
    this.blobGas = blobGas;
    this.blobGasFeeCap = blobGasFeeCap;
    this.blobHashes = blobHashes;
  }
}

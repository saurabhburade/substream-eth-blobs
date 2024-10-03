// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";
import { Log } from "./Log";
import { BigInt } from "./BigInt";

export class TransactionReceipt {
  static encode(message: TransactionReceipt, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.stateRoot);

    writer.uint32(16);
    writer.uint64(message.cumulativeGasUsed);

    writer.uint32(26);
    writer.bytes(message.logsBloom);

    const logs = message.logs;
    for (let i: i32 = 0; i < logs.length; ++i) {
      writer.uint32(34);
      writer.fork();
      Log.encode(logs[i], writer);
      writer.ldelim();
    }

    writer.uint32(40);
    writer.uint64(message.blobGasUsed);

    const blobGasPrice = message.blobGasPrice;
    if (blobGasPrice !== null) {
      writer.uint32(50);
      writer.fork();
      BigInt.encode(blobGasPrice, writer);
      writer.ldelim();
    }
  }

  static decode(reader: Reader, length: i32): TransactionReceipt {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new TransactionReceipt();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.stateRoot = reader.bytes();
          break;

        case 2:
          message.cumulativeGasUsed = reader.uint64();
          break;

        case 3:
          message.logsBloom = reader.bytes();
          break;

        case 4:
          message.logs.push(Log.decode(reader, reader.uint32()));
          break;

        case 5:
          message.blobGasUsed = reader.uint64();
          break;

        case 6:
          message.blobGasPrice = BigInt.decode(reader, reader.uint32());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  stateRoot: Uint8Array;
  cumulativeGasUsed: u64;
  logsBloom: Uint8Array;
  logs: Array<Log>;
  blobGasUsed: u64;
  blobGasPrice: BigInt | null;

  constructor(
    stateRoot: Uint8Array = new Uint8Array(0),
    cumulativeGasUsed: u64 = 0,
    logsBloom: Uint8Array = new Uint8Array(0),
    logs: Array<Log> = [],
    blobGasUsed: u64 = 0,
    blobGasPrice: BigInt | null = null
  ) {
    this.stateRoot = stateRoot;
    this.cumulativeGasUsed = cumulativeGasUsed;
    this.logsBloom = logsBloom;
    this.logs = logs;
    this.blobGasUsed = blobGasUsed;
    this.blobGasPrice = blobGasPrice;
  }
}

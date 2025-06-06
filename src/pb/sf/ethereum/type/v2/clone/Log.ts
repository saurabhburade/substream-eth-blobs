// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";

export class Log {
  static encode(message: Log, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.address);

    const topics = message.topics;
    if (topics.length !== 0) {
      for (let i: i32 = 0; i < topics.length; ++i) {
        writer.uint32(18);
        writer.bytes(topics[i]);
      }
    }

    writer.uint32(26);
    writer.bytes(message.data);

    writer.uint32(32);
    writer.uint32(message.index);

    writer.uint32(48);
    writer.uint32(message.blockIndex);

    writer.uint32(56);
    writer.uint64(message.ordinal);
  }

  static decode(reader: Reader, length: i32): Log {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new Log();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;

        case 2:
          message.topics.push(reader.bytes());
          break;

        case 3:
          message.data = reader.bytes();
          break;

        case 4:
          message.index = reader.uint32();
          break;

        case 6:
          message.blockIndex = reader.uint32();
          break;

        case 7:
          message.ordinal = reader.uint64();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  address: Uint8Array;
  topics: Array<Uint8Array>;
  data: Uint8Array;
  index: u32;
  blockIndex: u32;
  ordinal: u64;

  constructor(
    address: Uint8Array = new Uint8Array(0),
    topics: Array<Uint8Array> = [],
    data: Uint8Array = new Uint8Array(0),
    index: u32 = 0,
    blockIndex: u32 = 0,
    ordinal: u64 = 0
  ) {
    this.address = address;
    this.topics = topics;
    this.data = data;
    this.index = index;
    this.blockIndex = blockIndex;
    this.ordinal = ordinal;
  }
}

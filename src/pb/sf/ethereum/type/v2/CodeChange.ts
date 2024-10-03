// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";

export class CodeChange {
  static encode(message: CodeChange, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.address);

    writer.uint32(18);
    writer.bytes(message.oldHash);

    writer.uint32(26);
    writer.bytes(message.oldCode);

    writer.uint32(34);
    writer.bytes(message.newHash);

    writer.uint32(42);
    writer.bytes(message.newCode);

    writer.uint32(48);
    writer.uint64(message.ordinal);
  }

  static decode(reader: Reader, length: i32): CodeChange {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new CodeChange();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.bytes();
          break;

        case 2:
          message.oldHash = reader.bytes();
          break;

        case 3:
          message.oldCode = reader.bytes();
          break;

        case 4:
          message.newHash = reader.bytes();
          break;

        case 5:
          message.newCode = reader.bytes();
          break;

        case 6:
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
  oldHash: Uint8Array;
  oldCode: Uint8Array;
  newHash: Uint8Array;
  newCode: Uint8Array;
  ordinal: u64;

  constructor(
    address: Uint8Array = new Uint8Array(0),
    oldHash: Uint8Array = new Uint8Array(0),
    oldCode: Uint8Array = new Uint8Array(0),
    newHash: Uint8Array = new Uint8Array(0),
    newCode: Uint8Array = new Uint8Array(0),
    ordinal: u64 = 0
  ) {
    this.address = address;
    this.oldHash = oldHash;
    this.oldCode = oldCode;
    this.newHash = newHash;
    this.newCode = newCode;
    this.ordinal = ordinal;
  }
}

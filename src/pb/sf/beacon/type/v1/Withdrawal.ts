// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";

export class Withdrawal {
  static encode(message: Withdrawal, writer: Writer): void {
    writer.uint32(8);
    writer.uint64(message.withdrawalIndex);

    writer.uint32(16);
    writer.uint64(message.validatorIndex);

    writer.uint32(26);
    writer.bytes(message.address);

    writer.uint32(32);
    writer.uint64(message.gwei);
  }

  static decode(reader: Reader, length: i32): Withdrawal {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new Withdrawal();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawalIndex = reader.uint64();
          break;

        case 2:
          message.validatorIndex = reader.uint64();
          break;

        case 3:
          message.address = reader.bytes();
          break;

        case 4:
          message.gwei = reader.uint64();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  withdrawalIndex: u64;
  validatorIndex: u64;
  address: Uint8Array;
  gwei: u64;

  constructor(
    withdrawalIndex: u64 = 0,
    validatorIndex: u64 = 0,
    address: Uint8Array = new Uint8Array(0),
    gwei: u64 = 0
  ) {
    this.withdrawalIndex = withdrawalIndex;
    this.validatorIndex = validatorIndex;
    this.address = address;
    this.gwei = gwei;
  }
}

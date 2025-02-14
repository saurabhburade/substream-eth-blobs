// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";

export class SyncAggregate {
  static encode(message: SyncAggregate, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.syncCommiteeBits);

    writer.uint32(18);
    writer.bytes(message.syncComitteeSignature);
  }

  static decode(reader: Reader, length: i32): SyncAggregate {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new SyncAggregate();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.syncCommiteeBits = reader.bytes();
          break;

        case 2:
          message.syncComitteeSignature = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  syncCommiteeBits: Uint8Array;
  syncComitteeSignature: Uint8Array;

  constructor(
    syncCommiteeBits: Uint8Array = new Uint8Array(0),
    syncComitteeSignature: Uint8Array = new Uint8Array(0)
  ) {
    this.syncCommiteeBits = syncCommiteeBits;
    this.syncComitteeSignature = syncComitteeSignature;
  }
}

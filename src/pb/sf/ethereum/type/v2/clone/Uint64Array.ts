// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";

export class Uint64Array {
  static encode(message: Uint64Array, writer: Writer): void {
    const val = message.val;
    if (val.length !== 0) {
      for (let i: i32 = 0; i < val.length; ++i) {
        writer.uint32(8);
        writer.uint64(val[i]);
      }
    }
  }

  static decode(reader: Reader, length: i32): Uint64Array {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new Uint64Array();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.val.push(reader.uint64());
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  val: Array<u64>;

  constructor(val: Array<u64> = []) {
    this.val = val;
  }
}

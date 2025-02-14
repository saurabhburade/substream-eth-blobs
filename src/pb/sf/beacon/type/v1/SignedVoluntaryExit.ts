// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";
import { VoluntaryExit } from "./VoluntaryExit";

export class SignedVoluntaryExit {
  static encode(message: SignedVoluntaryExit, writer: Writer): void {
    const message_2 = message.message;
    if (message_2 !== null) {
      writer.uint32(10);
      writer.fork();
      VoluntaryExit.encode(message_2, writer);
      writer.ldelim();
    }

    writer.uint32(18);
    writer.bytes(message.signature);
  }

  static decode(reader: Reader, length: i32): SignedVoluntaryExit {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new SignedVoluntaryExit();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.message = VoluntaryExit.decode(reader, reader.uint32());
          break;

        case 2:
          message.signature = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  message: VoluntaryExit | null;
  signature: Uint8Array;

  constructor(
    message: VoluntaryExit | null = null,
    signature: Uint8Array = new Uint8Array(0)
  ) {
    this.message = message;
    this.signature = signature;
  }
}

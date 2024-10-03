// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";
import { AttestationData } from "./AttestationData";

export class Attestation {
  static encode(message: Attestation, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.aggregationBits);

    const data = message.data;
    if (data !== null) {
      writer.uint32(18);
      writer.fork();
      AttestationData.encode(data, writer);
      writer.ldelim();
    }

    writer.uint32(26);
    writer.bytes(message.signature);
  }

  static decode(reader: Reader, length: i32): Attestation {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new Attestation();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.aggregationBits = reader.bytes();
          break;

        case 2:
          message.data = AttestationData.decode(reader, reader.uint32());
          break;

        case 3:
          message.signature = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  aggregationBits: Uint8Array;
  data: AttestationData | null;
  signature: Uint8Array;

  constructor(
    aggregationBits: Uint8Array = new Uint8Array(0),
    data: AttestationData | null = null,
    signature: Uint8Array = new Uint8Array(0)
  ) {
    this.aggregationBits = aggregationBits;
    this.data = data;
    this.signature = signature;
  }
}

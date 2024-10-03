// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";
import { BigInt } from "./BigInt";
import { StorageChange } from "./StorageChange";
import { BalanceChange } from "./BalanceChange";
import { NonceChange } from "./NonceChange";
import { Log } from "./Log";
import { CodeChange } from "./CodeChange";
import { GasChange } from "./GasChange";
import { AccountCreation } from "./AccountCreation";
import { CallType } from "./CallType";

export class Call {
  static encode(message: Call, writer: Writer): void {
    writer.uint32(8);
    writer.uint32(message.index);

    writer.uint32(16);
    writer.uint32(message.parentIndex);

    writer.uint32(24);
    writer.uint32(message.depth);

    writer.uint32(32);
    writer.int32(message.callType);

    writer.uint32(42);
    writer.bytes(message.caller);

    writer.uint32(50);
    writer.bytes(message.address);

    const value = message.value;
    if (value !== null) {
      writer.uint32(58);
      writer.fork();
      BigInt.encode(value, writer);
      writer.ldelim();
    }

    writer.uint32(64);
    writer.uint64(message.gasLimit);

    writer.uint32(72);
    writer.uint64(message.gasConsumed);

    writer.uint32(106);
    writer.bytes(message.returnData);

    writer.uint32(114);
    writer.bytes(message.input);

    writer.uint32(120);
    writer.bool(message.executedCode);

    writer.uint32(128);
    writer.bool(message.suicide);

    const keccakPreimages = message.keccakPreimages;
    if (keccakPreimages !== null) {
      const keccakPreimagesKeys = keccakPreimages.keys();
      for (let i: i32 = 0; i < keccakPreimagesKeys.length; ++i) {
        const keccakPreimagesKey = keccakPreimagesKeys[i];
        writer.uint32(162);
        writer.fork();
        writer.uint32(10);
        writer.string(keccakPreimagesKey);
        writer.uint32(18);
        writer.string(keccakPreimages.get(keccakPreimagesKey));
        writer.ldelim();
      }
    }

    const storageChanges = message.storageChanges;
    for (let i: i32 = 0; i < storageChanges.length; ++i) {
      writer.uint32(170);
      writer.fork();
      StorageChange.encode(storageChanges[i], writer);
      writer.ldelim();
    }

    const balanceChanges = message.balanceChanges;
    for (let i: i32 = 0; i < balanceChanges.length; ++i) {
      writer.uint32(178);
      writer.fork();
      BalanceChange.encode(balanceChanges[i], writer);
      writer.ldelim();
    }

    const nonceChanges = message.nonceChanges;
    for (let i: i32 = 0; i < nonceChanges.length; ++i) {
      writer.uint32(194);
      writer.fork();
      NonceChange.encode(nonceChanges[i], writer);
      writer.ldelim();
    }

    const logs = message.logs;
    for (let i: i32 = 0; i < logs.length; ++i) {
      writer.uint32(202);
      writer.fork();
      Log.encode(logs[i], writer);
      writer.ldelim();
    }

    const codeChanges = message.codeChanges;
    for (let i: i32 = 0; i < codeChanges.length; ++i) {
      writer.uint32(210);
      writer.fork();
      CodeChange.encode(codeChanges[i], writer);
      writer.ldelim();
    }

    const gasChanges = message.gasChanges;
    for (let i: i32 = 0; i < gasChanges.length; ++i) {
      writer.uint32(226);
      writer.fork();
      GasChange.encode(gasChanges[i], writer);
      writer.ldelim();
    }

    writer.uint32(80);
    writer.bool(message.statusFailed);

    writer.uint32(96);
    writer.bool(message.statusReverted);

    writer.uint32(90);
    writer.string(message.failureReason);

    writer.uint32(240);
    writer.bool(message.stateReverted);

    writer.uint32(248);
    writer.uint64(message.beginOrdinal);

    writer.uint32(256);
    writer.uint64(message.endOrdinal);

    const accountCreations = message.accountCreations;
    for (let i: i32 = 0; i < accountCreations.length; ++i) {
      writer.uint32(266);
      writer.fork();
      AccountCreation.encode(accountCreations[i], writer);
      writer.ldelim();
    }
  }

  static decode(reader: Reader, length: i32): Call {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new Call();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.index = reader.uint32();
          break;

        case 2:
          message.parentIndex = reader.uint32();
          break;

        case 3:
          message.depth = reader.uint32();
          break;

        case 4:
          message.callType = reader.int32();
          break;

        case 5:
          message.caller = reader.bytes();
          break;

        case 6:
          message.address = reader.bytes();
          break;

        case 7:
          message.value = BigInt.decode(reader, reader.uint32());
          break;

        case 8:
          message.gasLimit = reader.uint64();
          break;

        case 9:
          message.gasConsumed = reader.uint64();
          break;

        case 13:
          message.returnData = reader.bytes();
          break;

        case 14:
          message.input = reader.bytes();
          break;

        case 15:
          message.executedCode = reader.bool();
          break;

        case 16:
          message.suicide = reader.bool();
          break;

        case 20:
          let keccakPreimagesKey: string = "";
          let keccakPreimagesValue: string = "";
          let keccakPreimagesHasKey: bool = false;
          let keccakPreimagesHasValue: bool = false;
          for (
            const end: usize = reader.ptr + reader.uint32();
            reader.ptr < end;

          ) {
            const tag = reader.uint32();
            switch (tag >>> 3) {
              case 1:
                keccakPreimagesKey = reader.string();
                keccakPreimagesHasKey = true;
                break;

              case 2:
                keccakPreimagesValue = reader.string();
                keccakPreimagesHasValue = true;
                break;

              default:
                reader.skipType(tag & 7);
                break;
            }
            if (message.keccakPreimages === null) {
              message.keccakPreimages = new Map<string, string>();
            }
            const keccakPreimages = message.keccakPreimages;
            if (
              keccakPreimages !== null &&
              keccakPreimagesHasKey &&
              keccakPreimagesHasValue
            ) {
              keccakPreimages.set(keccakPreimagesKey, keccakPreimagesValue);
            }
          }
          break;

        case 21:
          message.storageChanges.push(
            StorageChange.decode(reader, reader.uint32())
          );
          break;

        case 22:
          message.balanceChanges.push(
            BalanceChange.decode(reader, reader.uint32())
          );
          break;

        case 24:
          message.nonceChanges.push(
            NonceChange.decode(reader, reader.uint32())
          );
          break;

        case 25:
          message.logs.push(Log.decode(reader, reader.uint32()));
          break;

        case 26:
          message.codeChanges.push(CodeChange.decode(reader, reader.uint32()));
          break;

        case 28:
          message.gasChanges.push(GasChange.decode(reader, reader.uint32()));
          break;

        case 10:
          message.statusFailed = reader.bool();
          break;

        case 12:
          message.statusReverted = reader.bool();
          break;

        case 11:
          message.failureReason = reader.string();
          break;

        case 30:
          message.stateReverted = reader.bool();
          break;

        case 31:
          message.beginOrdinal = reader.uint64();
          break;

        case 32:
          message.endOrdinal = reader.uint64();
          break;

        case 33:
          message.accountCreations.push(
            AccountCreation.decode(reader, reader.uint32())
          );
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  index: u32;
  parentIndex: u32;
  depth: u32;
  callType: CallType;
  caller: Uint8Array;
  address: Uint8Array;
  value: BigInt | null;
  gasLimit: u64;
  gasConsumed: u64;
  returnData: Uint8Array;
  input: Uint8Array;
  executedCode: bool;
  suicide: bool;
  keccakPreimages: Map<string, string>;
  storageChanges: Array<StorageChange>;
  balanceChanges: Array<BalanceChange>;
  nonceChanges: Array<NonceChange>;
  logs: Array<Log>;
  codeChanges: Array<CodeChange>;
  gasChanges: Array<GasChange>;
  statusFailed: bool;
  statusReverted: bool;
  failureReason: string;
  stateReverted: bool;
  beginOrdinal: u64;
  endOrdinal: u64;
  accountCreations: Array<AccountCreation>;

  constructor(
    index: u32 = 0,
    parentIndex: u32 = 0,
    depth: u32 = 0,
    callType: CallType = 0,
    caller: Uint8Array = new Uint8Array(0),
    address: Uint8Array = new Uint8Array(0),
    value: BigInt | null = null,
    gasLimit: u64 = 0,
    gasConsumed: u64 = 0,
    returnData: Uint8Array = new Uint8Array(0),
    input: Uint8Array = new Uint8Array(0),
    executedCode: bool = false,
    suicide: bool = false,
    keccakPreimages: Map<string, string> = new Map(),
    storageChanges: Array<StorageChange> = [],
    balanceChanges: Array<BalanceChange> = [],
    nonceChanges: Array<NonceChange> = [],
    logs: Array<Log> = [],
    codeChanges: Array<CodeChange> = [],
    gasChanges: Array<GasChange> = [],
    statusFailed: bool = false,
    statusReverted: bool = false,
    failureReason: string = "",
    stateReverted: bool = false,
    beginOrdinal: u64 = 0,
    endOrdinal: u64 = 0,
    accountCreations: Array<AccountCreation> = []
  ) {
    this.index = index;
    this.parentIndex = parentIndex;
    this.depth = depth;
    this.callType = callType;
    this.caller = caller;
    this.address = address;
    this.value = value;
    this.gasLimit = gasLimit;
    this.gasConsumed = gasConsumed;
    this.returnData = returnData;
    this.input = input;
    this.executedCode = executedCode;
    this.suicide = suicide;
    this.keccakPreimages = keccakPreimages;
    this.storageChanges = storageChanges;
    this.balanceChanges = balanceChanges;
    this.nonceChanges = nonceChanges;
    this.logs = logs;
    this.codeChanges = codeChanges;
    this.gasChanges = gasChanges;
    this.statusFailed = statusFailed;
    this.statusReverted = statusReverted;
    this.failureReason = failureReason;
    this.stateReverted = stateReverted;
    this.beginOrdinal = beginOrdinal;
    this.endOrdinal = endOrdinal;
    this.accountCreations = accountCreations;
  }
}

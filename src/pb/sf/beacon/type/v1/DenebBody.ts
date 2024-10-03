// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v5.26.1

import { Writer, Reader } from "as-proto/assembly";
import { Eth1Data } from "./Eth1Data";
import { ProposerSlashing } from "./ProposerSlashing";
import { AttesterSlashing } from "./AttesterSlashing";
import { Attestation } from "./Attestation";
import { Deposit } from "./Deposit";
import { SignedVoluntaryExit } from "./SignedVoluntaryExit";
import { SyncAggregate } from "./SyncAggregate";
import { DenebExecutionPayload } from "./DenebExecutionPayload";
import { SignedBLSToExecutionChange } from "./SignedBLSToExecutionChange";
import { Blob } from "./Blob";

export class DenebBody {
  static encode(message: DenebBody, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.randoReveal);

    const eth1Data = message.eth1Data;
    if (eth1Data !== null) {
      writer.uint32(18);
      writer.fork();
      Eth1Data.encode(eth1Data, writer);
      writer.ldelim();
    }

    writer.uint32(26);
    writer.bytes(message.graffiti);

    const proposerSlashings = message.proposerSlashings;
    for (let i: i32 = 0; i < proposerSlashings.length; ++i) {
      writer.uint32(34);
      writer.fork();
      ProposerSlashing.encode(proposerSlashings[i], writer);
      writer.ldelim();
    }

    const attesterSlashings = message.attesterSlashings;
    for (let i: i32 = 0; i < attesterSlashings.length; ++i) {
      writer.uint32(42);
      writer.fork();
      AttesterSlashing.encode(attesterSlashings[i], writer);
      writer.ldelim();
    }

    const attestations = message.attestations;
    for (let i: i32 = 0; i < attestations.length; ++i) {
      writer.uint32(50);
      writer.fork();
      Attestation.encode(attestations[i], writer);
      writer.ldelim();
    }

    const deposits = message.deposits;
    for (let i: i32 = 0; i < deposits.length; ++i) {
      writer.uint32(58);
      writer.fork();
      Deposit.encode(deposits[i], writer);
      writer.ldelim();
    }

    const voluntaryExits = message.voluntaryExits;
    for (let i: i32 = 0; i < voluntaryExits.length; ++i) {
      writer.uint32(66);
      writer.fork();
      SignedVoluntaryExit.encode(voluntaryExits[i], writer);
      writer.ldelim();
    }

    const syncAggregate = message.syncAggregate;
    if (syncAggregate !== null) {
      writer.uint32(74);
      writer.fork();
      SyncAggregate.encode(syncAggregate, writer);
      writer.ldelim();
    }

    const executionPayload = message.executionPayload;
    if (executionPayload !== null) {
      writer.uint32(82);
      writer.fork();
      DenebExecutionPayload.encode(executionPayload, writer);
      writer.ldelim();
    }

    const blsToExecutionChanges = message.blsToExecutionChanges;
    for (let i: i32 = 0; i < blsToExecutionChanges.length; ++i) {
      writer.uint32(90);
      writer.fork();
      SignedBLSToExecutionChange.encode(blsToExecutionChanges[i], writer);
      writer.ldelim();
    }

    const blobKzgCommitments = message.blobKzgCommitments;
    if (blobKzgCommitments.length !== 0) {
      for (let i: i32 = 0; i < blobKzgCommitments.length; ++i) {
        writer.uint32(98);
        writer.bytes(blobKzgCommitments[i]);
      }
    }

    const embeddedBlobs = message.embeddedBlobs;
    for (let i: i32 = 0; i < embeddedBlobs.length; ++i) {
      writer.uint32(162);
      writer.fork();
      Blob.encode(embeddedBlobs[i], writer);
      writer.ldelim();
    }
  }

  static decode(reader: Reader, length: i32): DenebBody {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new DenebBody();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.randoReveal = reader.bytes();
          break;

        case 2:
          message.eth1Data = Eth1Data.decode(reader, reader.uint32());
          break;

        case 3:
          message.graffiti = reader.bytes();
          break;

        case 4:
          message.proposerSlashings.push(
            ProposerSlashing.decode(reader, reader.uint32())
          );
          break;

        case 5:
          message.attesterSlashings.push(
            AttesterSlashing.decode(reader, reader.uint32())
          );
          break;

        case 6:
          message.attestations.push(
            Attestation.decode(reader, reader.uint32())
          );
          break;

        case 7:
          message.deposits.push(Deposit.decode(reader, reader.uint32()));
          break;

        case 8:
          message.voluntaryExits.push(
            SignedVoluntaryExit.decode(reader, reader.uint32())
          );
          break;

        case 9:
          message.syncAggregate = SyncAggregate.decode(reader, reader.uint32());
          break;

        case 10:
          message.executionPayload = DenebExecutionPayload.decode(
            reader,
            reader.uint32()
          );
          break;

        case 11:
          message.blsToExecutionChanges.push(
            SignedBLSToExecutionChange.decode(reader, reader.uint32())
          );
          break;

        case 12:
          message.blobKzgCommitments.push(reader.bytes());
          break;

        case 20:
          message.embeddedBlobs.push(Blob.decode(reader, reader.uint32()));
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  randoReveal: Uint8Array;
  eth1Data: Eth1Data | null;
  graffiti: Uint8Array;
  proposerSlashings: Array<ProposerSlashing>;
  attesterSlashings: Array<AttesterSlashing>;
  attestations: Array<Attestation>;
  deposits: Array<Deposit>;
  voluntaryExits: Array<SignedVoluntaryExit>;
  syncAggregate: SyncAggregate | null;
  executionPayload: DenebExecutionPayload | null;
  blsToExecutionChanges: Array<SignedBLSToExecutionChange>;
  blobKzgCommitments: Array<Uint8Array>;
  embeddedBlobs: Array<Blob>;

  constructor(
    randoReveal: Uint8Array = new Uint8Array(0),
    eth1Data: Eth1Data | null = null,
    graffiti: Uint8Array = new Uint8Array(0),
    proposerSlashings: Array<ProposerSlashing> = [],
    attesterSlashings: Array<AttesterSlashing> = [],
    attestations: Array<Attestation> = [],
    deposits: Array<Deposit> = [],
    voluntaryExits: Array<SignedVoluntaryExit> = [],
    syncAggregate: SyncAggregate | null = null,
    executionPayload: DenebExecutionPayload | null = null,
    blsToExecutionChanges: Array<SignedBLSToExecutionChange> = [],
    blobKzgCommitments: Array<Uint8Array> = [],
    embeddedBlobs: Array<Blob> = []
  ) {
    this.randoReveal = randoReveal;
    this.eth1Data = eth1Data;
    this.graffiti = graffiti;
    this.proposerSlashings = proposerSlashings;
    this.attesterSlashings = attesterSlashings;
    this.attestations = attestations;
    this.deposits = deposits;
    this.voluntaryExits = voluntaryExits;
    this.syncAggregate = syncAggregate;
    this.executionPayload = executionPayload;
    this.blsToExecutionChanges = blsToExecutionChanges;
    this.blobKzgCommitments = blobKzgCommitments;
    this.embeddedBlobs = embeddedBlobs;
  }
}

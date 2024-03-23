//

import {PullStream} from "./pull-stream";


export class BufferPullStream extends PullStream {

  public buffer: Buffer;
  public pointer: number = 0;

  public constructor(buffer: Buffer) {
    super();
    this.buffer = buffer;
  }

  public pull(buffer: Buffer, offset: number, length?: number): number {
    const actualLength = length ?? buffer.length;
    const readLength = Math.min(actualLength, this.buffer.length - this.pointer);
    buffer.set(this.buffer.subarray(this.pointer, this.pointer + readLength), offset);
    this.pointer += readLength;
    return readLength;
  }

  public skip(length: number): number {
    const readLength = Math.min(length, this.buffer.length - this.pointer);
    this.pointer += readLength;
    return readLength;
  }

  public read(): number {
    try {
      const byte = this.buffer.readUIntLE(this.pointer, 1);
      this.pointer ++;
      return byte;
    } catch (error) {
      return -1;
    }
  }

  public close(): void {
  }

}
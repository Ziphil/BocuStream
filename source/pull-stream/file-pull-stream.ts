//

import {PullStream} from "./pull-stream";


export class FilePullStream extends PullStream {

  private fs: FsLike;
  public path: string;
  private descriptor: number;

  public constructor(path: string, fs?: FsLike) {
    super();
    this.fs = fs ?? require("fs");
    this.path = path;
    this.descriptor = this.fs.openSync(this.path, "r");
  }

  public pull(buffer: Buffer, offset: number, length?: number): number {
    const actualLength = length ?? buffer.length;
    const readLength = this.fs.readSync(this.descriptor, buffer, offset, actualLength, null);
    return readLength;
  }

  public close(): void {
    this.fs.closeSync(this.descriptor);
  }

}


export type FsLike = {
  openSync: (path: string, mode: string) => number,
  readSync: (descriptor: number, buffer: Buffer, offset: number, length: number, position: number | null) => number,
  closeSync: (descriptor: number) => void
};
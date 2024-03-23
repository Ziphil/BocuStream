//


export abstract class PullStream {

  /** `length` に指定されたバイト数分だけデータを読み込んで、`buffer` に渡されたバッファに対して `offset` に指定された位置から書き込みます。
   * `length` が省略された場合は、`buffer` の長さと同じ値が指定されたものと見なされます。
   * ここで指定されたバイト数分のデータが残っていない場合は、エラーは発生させずに、単にデータを最後まで読み込みます。
   * 実際に読み込まれたバイト数を返します。*/
  public abstract pull(buffer: Buffer, offset: number, length?: number): number;

  public skip(length: number): number {
    const buffer = Buffer.alloc(length);
    const readLength = this.pull(buffer, 0);
    return readLength;
  }

  /** 1 バイトのデータを読み込み、数値として返します。
   * すでにデータの終端に到達していて読み込むデータが存在しない場合は、`-1` を返します。*/
  public read(): number {
    const buffer = Buffer.alloc(1);
    const readLength = this.pull(buffer, 0);
    if (readLength === 1) {
      const byte = buffer[0];
      return byte;
    } else {
      return -1;
    }
  }

  /** 指定されたバイト数のデータを読み込み、`Buffer` として返します。
   * データが足りなかった場合はエラーが発生します。*/
  public readBuffer(length: number): Buffer {
    const buffer = Buffer.alloc(length);
    const readLength = this.pull(buffer, 0, length);
    if (readLength === length) {
      return buffer;
    } else {
      throw new Error("out of range");
    }
  }

  /** 指定されたバイト数のデータを読み込み、リトルエンディアンで符号なし整数に変換して返します。
   * データが足りなかった場合はエラーが発生します。*/
  public readUIntLE(length: number): number {
    const buffer = Buffer.alloc(length);
    const readLength = this.pull(buffer, 0);
    if (readLength === length) {
      const number = buffer.readUIntLE(0, length);
      return number;
    } else {
      throw new Error("out of range");
    }
  }

  /** 指定されたバイト数のデータを読み込み、ビッグエンディアンで符号なし整数に変換して返します。
   * データが足りなかった場合はエラーが発生します。*/
  public readUIntBE(length: number): number {
    const buffer = Buffer.alloc(length);
    const readLength = this.pull(buffer, 0, length);
    if (readLength === length) {
      const number = buffer.readUIntBE(0, length);
      return number;
    } else {
      throw new Error("out of range");
    }
  }

  public readMaybeBuffer<T>(length: number, defaultValue: T): Buffer | T {
    try {
      return this.readBuffer(length);
    } catch (error) {
      return defaultValue;
    }
  }

  public readMaybeUIntLE<T>(length: number, defaultValue: T): number | T {
    try {
      return this.readUIntLE(length);
    } catch (error) {
      return defaultValue;
    }
  }

  public readMaybeUIntBE<T>(length: number, defaultValue: T): number | T {
    try {
      return this.readUIntBE(length);
    } catch (error) {
      return defaultValue;
    }
  }

  public abstract close(): void;

}

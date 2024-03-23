<div align="center">
<h1>BOCU-1 Decoder </h1>
</div>


## 概要
[BOCU-1 形式](https://www.unicode.org/notes/tn6/)でエンコードされたデータをデコードするためのユーティリティ群です。

## インストール
[npm](https://www.npmjs.com/package/bocu-stream) 経由でインストールできます。
```
npm i bocu-stream
```

## 使い方
### プル形式
`BocuPullStream` クラスのオブジェクトを生成し、`readBocuString` メソッドを呼ぶことで BOCU-1 形式をデコードした文字列を取得できます。
`BocuPullStream` クラスのコンストラクタには、エンコードされたデータを保持したプル形式ストリーム (後述) を渡してください。
```ts
const stream = new BocuPullStream(sourceStream);
const decodedString = stream.readBocuString();
```

ここで利用できるプル形式ストリームとして、`BufferPullStream` と `FilePullStream` の 2 種類が用意されています。
どちらを利用しても構いません。

- `BufferPullStream` … `Buffer` オブジェクトから読み込む
- `FulePullStream` … ローカルファイルを読み込む

### プッシュ形式
準備中です。
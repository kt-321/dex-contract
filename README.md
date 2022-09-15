# dex-contract

DEXを想定したスマートコントラクト

- ガス代の関係でRinkebyネットワークにデプロイ

- メインネットでは「Chainlinkを使用して独自トークンそれぞれのモデルとなったトークンの価格を取得」ができる想定でコード記述しています。

- 以下のスワップのみ対応しています。

ETH　→　独自トークン

独自トークン　→ ETH

- 独自トークンの売却前にトークンのコントラクトでApproveを行う必要があります。
spenderにDexのコントラクトアドレス、amountに売却する数量を入力してApprove実行してください。


**etherscan**
- DEXコントラクト
https://rinkeby.etherscan.io/address/0x5dd4d70f90b24009ab6f58556130dc30da7a971d

- Dai（独自トークン）コントラクト
https://rinkeby.etherscan.io/token/0xa9197ec4647e02029db84520bade22f256c50116

- Chainlink(独自トークン)コントラクト
https://rinkeby.etherscan.io/token/0xf60e0783797cded7c66d62f281387eb620c04f62

- Comp(独自トークン)コントラクト
https://rinkeby.etherscan.io/token/0x1cf7043852a9b0fdfc85c16515e9cd0ce38bfb6c

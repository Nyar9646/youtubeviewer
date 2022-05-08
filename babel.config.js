/** json形式で記述も可能。babel.donfig.json */

module.exports = api => {
  /** produxtion = 本番 */
  const isProduction = api.env('production')
  api.cache(true)

  const presets = [
    [
      /** トランスパイルする際、どの環境で動かすようにするか */
      '@babel/preset-env',
      {
        targets: {
          chrome: '79',
          ie: '11',
          firefox: '72',
          safari: '13',
        },
        /**
         * 指定先の環境で対応していない機能について、どのように補完するか
         *  ex : ie では未対応の Promise を、ie で使用できるよう変換
         */
        useBuiltIns: 'entry',
        corejs: 3,
      },
    ],
    [
      /** トランスパイルする際、jsx構文を js に変換 */
      '@babel/preset-react',
      {
        /**
         * option. 開発モードになるよう設定 not isProduction
         *  開発モード : ブラウザの開発ツールでデバッグする際、使用する component 情報が残る
         */
        development: !isProduction,
      },
    ],
  ]

  /** babel と関連づけたい他の lib を記載 */
  const plugins = [
    [
      'babel-plugin-styled-components',
      isProduction
        ? {
          // クラス名にファイル名を含めるか
          fileName: false,
          // クラス名に React の component 名を含めるか
          displayName: false,
          // 到達不能コードがある場合、除去するか
          pure: true,
        }
        : {
          minify: false,
        },
    ]
  ]

  return {
    presets,
    plugins,
  }
}
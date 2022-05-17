import path from 'path'
import { IgnorePlugin } from 'webpack'
import Dotenv from 'dotenv-webpack'

export default (env, args) => {
  const isProduction = args.mode === 'production'

  /**
   * producitonモードでない場合はソースマップを出力
   * source map : コンパイル前後の対応関係を記したファイル。json形式
   */
  const devtool = !isProduction && 'inline-source-map'

  const rules = [
    /** js, jsx ファイルは babel-loader で変換 */
    {
      test: /\.jsx?$/,
      use: ['babel-loader'],
    },
  ]

  return {
    devtool,
    entry: './src/entries/app.jsx',
    output: {
      path: path.join(__dirname, './public/js/'),
      filename: 'app.js',
    },
    module: { rules },
    resolve: {
      modules: ['node_modules'],
      alias: {
        '~': path.join(__dirname, './src/'),
      },
      extensions: ['.js', '.jsx'],
    },
    plugins: [
      // new Dotenv(),
      /**
       * 正規表現にマッチするモジュールを作成しない
       *  moment の中の locale 以下を作成しない
       */
      new IgnorePlugin(/^\.\/locale$/,/moment$/),
    ],
  }
}

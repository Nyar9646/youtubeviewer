import webpack from 'webpack'
import path from 'path'
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
      new Dotenv(),
    ],
    // /** size の worning 出力を無効化 */
    performance: {
      hints: false
    }
  }
}
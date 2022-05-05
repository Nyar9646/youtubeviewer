/** entry point */

/** polyfill */
import 'core-js/stable'               // core-js : ブラウザのjsの基本的な機能
import 'regenerator-runtime/runtime'  // 非同期関数の機能

import React from 'react'
import ReactDOM from 'react-dom'

import App from '~/routings/App'

const rootEl = document.getElementById('root')

ReactDOM.render(
  <App />,
  rootEl
)

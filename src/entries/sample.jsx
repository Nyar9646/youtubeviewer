/** entry point */

import 'core-js/stable'
import 'regenerator-runtime/runtime'
import React from 'react'
import ReactDom from 'react-dom'

const rootEl = document.getElementById('root')

ReactDom.render(
  <h1>Hello react.</h1>,
  rootEl,
)
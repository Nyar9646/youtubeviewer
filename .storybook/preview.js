/** story表示時に実行する処理 */

import React from "react";

/**
 * URLパスを使用せずにメモリ上で画面遷移状態を管理
 *   storybook 上では story の遷移の履歴管理は不要であるため採用 */
import { MemoryRouter } from "react-router";
/**
 * <Link> : 何かしらのルータの役割を持つ component の子孫要素である必要がある
 * <BrowserRouter> : ブラウザの HistoryAPI を使用して UI を URL と同期させる
 */

import { addDecorator } from "@storybook/react";
import GlobalStyle from '../src/style/GlobalStyle'

/** story を描画する関数を受け取り、新しい story を描画 */
addDecorator(storyFn => (
  <MemoryRouter
    initialEntries={['/', 'posts']}
  >
    {storyFn()}
  </MemoryRouter>
))

/** style-components の利用 */
addDecorator(storyFn => <><GlobalStyle />{storyFn()}</>)

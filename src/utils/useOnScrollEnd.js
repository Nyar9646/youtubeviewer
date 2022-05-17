import { useEffect } from "react";

/**
 * スクロール処理
 *  scroll ハンドラを DOM に設定したいので副作用がある => useEffect 使用
 *  無限スクロール : 1番下までスクロールされたら動画一覧の続きを読み込めるようにする
 */
export default (onScrollEnd) => {
  useEffect(() => {
    let cleanup

    if(!onScrollEnd) {
      return cleanup
    }

    const scrollHandler = ({ target: { scrollingElement } }) => {
      const { scrollTop, scrollHeight, clientHeight } = scrollingElement

      /** 1番下までスクロールされていない場合 */
      if (scrollTop < scrollHeight - clientHeight) {
        return
      }

      /** 親コンポーネントで、続きをロードする */
      onScrollEnd()
    }

    /** イベントハンドラの設定 */
    window.document.addEventListener('scroll', scrollHandler)

    cleanup = () => {
      window.document.removeEventListener('scroll', scrollHandler)
    }

    return cleanup
  }, [onScrollEnd])
}
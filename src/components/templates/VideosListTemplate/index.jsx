import React, { useEffect } from "react";
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.div`
  width: 100%;
  height: 100%;
`

const HeaderWrapper = styled.div`
  max-width: 720px;
  margin: auto;
  border-bottom: 1px solid #ccc;
`

const SearchFormWrapper = styled.div`
  max-width: 720px;
  margin: auto;
`

const VideosListWrapper = styled.div`
  max-width: 720px;
  margin: auto;
`

const VideosListTemplate = ({
  headerContents,
  searchFormContents,
  videosListContents,
  onScrollEnd,
}) => {
  /**
   * スクロール処理
   *  scroll ハンドラを DOM に設定したいので副作用がある => useEffect 使用
   *  無限スクロール : 1番下までスクロールされたら動画一覧の続きを読み込めるようにする
   */
  useEffect(() => {
    if (!onScrollEnd) {
      return
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

    /** component の un mount 時 / onScrollEnd が変更された際、ハンドラを削除 */
    return () => {
      window.document.removeEventListener('scroll', scrollHandler)
    }
  }, [onScrollEnd])

  return (
    <Root>
      <HeaderWrapper>
        {headerContents}
      </HeaderWrapper>
      <SearchFormWrapper>
        {searchFormContents}
      </SearchFormWrapper>
      <VideosListWrapper>
        {videosListContents}
      </VideosListWrapper>
    </Root>
  )
}

VideosListTemplate.propTypes = {
  headerContents: PropTypes.node,
  searchFormContents: PropTypes.node,
  videosListContents: PropTypes.node.isRequired,
  onScrollEnd: PropTypes.func,
}

VideosListTemplate.defaultProps = {
  headerContents: null,
  searchFormContents: null,
  onScrollEnd: null,
}

export default VideosListTemplate

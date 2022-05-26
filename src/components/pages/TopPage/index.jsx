/**
 * TopPage
 *  Presenter = 画面の表示
 *  Conteiner = 動画検索結果を非同期通信で取得する機能
 */

import React, {useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import VideosListTemplate from '~/components/templates/VideosListTemplate'
import Header from '~/components/organisms/Header'
import SearchForm from '~/components/organisms/SearchForm'
import VideosList from '~/components/organisms/VideosList'

export const TopPagePresenter = ({
  search,
  searchNext,
  defaultKeyword,
  videos,
  loading,
}) => (
  <VideosListTemplate
    headerContents={<Header />}
    searchFormContents={(
      <SearchForm onSubmit={search} defaultValue={defaultKeyword} />
    )}
    videosListContents={<VideosList videos={videos} loading={loading} withFavoriteButton />}
    onScrollEnd={searchNext}
  />
)

TopPagePresenter.propTypes = {
  search: PropTypes.func.isRequired,
  searchNext: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string,
  videos: VideosList.propTypes.videos,
  loading: PropTypes.bool,
}

TopPagePresenter.defaultProps = {
  defaultKeyword: '',
  videos: null,
  loading: false,
}

const TopPageContainer = ({
  api,
  presenter,
  defaultKeyword,
}) => {
  const [videos, setVideos] = useState([])
  const [nextPageToken, setNextPageToken] = useState(null)
  const [keyword, setKeyword] = useState(defaultKeyword)
  const [loading, setLoading] = useState(false)
  const cleanedUp = useRef(false)

  /**
   * ビデオの取得
   * @param pageToken 続きを取得する場合は前回取得時のレスポンスに含まれる nextPageToken を指定する
   * @returns {Promise<void>}
   */
  const getVideos = async (pageToken) => {
    /** 1. Loading 状態にする */
    setLoading(true)

    /** 2. 動画を取得する非同期関数の呼び出し */
    const {
      data: {
        items,
        nextPageToken: newNextPageToken,
      },
      /** api.search = defaultProps の api:{search:} で設定した関数が入る */
    } = await api.search(keyword, { pageToken })

    /**
     * 3. un mount されている際は return
     *  un mount された component の state 操作は、メモリリーク等の不具合が起きる可能性がある
     */
    if (cleanedUp.current) {
      return
    }

    /** 4. 動画一覧の取得 */
    let nextVideos

    if (pageToken) {
      /** 続きのロードの場合。既存のビデオ一覧に取得したリストを追加 */

      const itemsWithoutDuplicated = items.filter(
        ({ id: itemId }) => !videos.find(({ id }) => id === itemId),
      )

      nextVideos = videos.concat(itemsWithoutDuplicated)
    } else {
      /** 始めに取得したリスト */
      nextVideos = items
    }

    /** 5. state の更新 */
    setVideos(nextVideos)
    setNextPageToken(newNextPageToken)
    setLoading(false)
  }

  /** keyword が変更されたら videos を取得 */
  useEffect(() => {
    setNextPageToken(undefined)
    setVideos([])
    getVideos()
  }, [keyword])

  /** component が un mount されたら覚えておく */
  useEffect(() => (() => {
    cleanedUp.current = true
  }), [])

  return presenter({
    search: setKeyword,

    /**
     * 1番下までスクロールした場合の処理
     *  (TopPagePresenter の VideosListTemplate component の onScrollEnd に渡している)
     */
    searchNext: () => {
      /** ロード中、または次ページがない場合 */
      if (loading || !nextPageToken) {
        return
      }

      getVideos(nextPageToken)
    },
    defaultKeyword,
    videos,
    loading,
  })
}

TopPageContainer.propTypes = {
  api: PropTypes.shape({
    search: PropTypes.func,
  }),
  defaultKeyword: PropTypes.string,
  presenter: PropTypes.func.isRequired,
}

TopPageContainer.defaultProps = {
  api: {
    search: (keyword, params) => axios.get(`/api/videos/search/${keyword}`, { params }),
  },
  defaultKeyword: 'ねこ',
}

export default (props) => (
  <TopPageContainer
    presenter={TopPagePresenter}
    {...props}
  />
)

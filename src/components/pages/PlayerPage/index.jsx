import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import VideosListTemplate from '~/components/templates/VideoPlayerTemplate'
import Header from '~/components/organisms/Header'
import VideoInfo from '~/components/organisms/VideoInfo'
import VideosList from '~/components/organisms/VideosList'
import YoutubeInlineFrame from '~/components/atoms/YoutubeInlineFrame'
import Typography from '~/components/atoms/Typography'

const RecommendVideosWrapper = styled.div`
  padding: 10px;
  box-sizing: border-box;
`

export const PlayerPagePresenter = ({
  videoId,
  videoData,
  relatedVideos,
  loadingRelatedVideos,
  onScrollEnd,
}) => (
  <VideosListTemplate
    headerContents={<Header />}
    playerContents={<YoutubeInlineFrame videoId={videoId} />}
    videoInfoContents={videoData && <VideoInfo item={videoData} />}
    relatedVideosListContents={(
      <RecommendVideosWrapper>
        <Typography variant="subtitle" bold>関連動画</Typography>
        <VideosList videos={relatedVideos} loading={loadingRelatedVideos} />
      </RecommendVideosWrapper>
    )}
    onScrollEnd={onScrollEnd}
  />
)

PlayerPagePresenter.propTypes = {
  videoId: PropTypes.string.isRequired,
  relatedVideos: PropTypes.arrayOf(PropTypes.shape({})),
  loadingRelatedVideos: PropTypes.bool,
  videoData: PropTypes.shape({}),
  onSrcollEnd: PropTypes.func,
}

PlayerPagePresenter.defaultProps = {
  relatedVideos: [],
  loadingRelatedVideos: false,
  videoData: null,
  onSrcollEnd: null,
}

export const PlayerPageContainer = ({
  api,
  presenter,
}) => {
  /** URLパスのパラメータ('?'以降)取得 ... src/routings/App.jsx で指定 */
  const {videoId} = useParams()

  const [videoData, setVideoData] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [loadingRelatedVideos, setLoadingRelatedVideos] = useState(false)
  const [nextPageToken, setNextPageToken] = useState('')

  const getVideoData = async () => {
    const {data} = await api.getVideoData(videoId)
    setVideoData(data)
  }

  const getRelatedVideos = async () => {
    // 関連動画読込中であれば何もしない
    if(loadingRelatedVideos) {
      return
    }

    // 関連動画読込中ステータスにする
    setLoadingRelatedVideos(true)

    /**
     * api から関連動画を取得
     * 前回関連動画を読み込んだときに、nextPageToken が返ってきていればそれを設定して続きを取得
     */
    const {
      data: {
        items: videos,
        nextPageToken: newNextPageToken,
      },
    } = await api.getRelatedVideos(videoId, newNextPageToken)

    setLoadingRelatedVideos(false)

    /**
     * 重複を削除して取得済のデータと結合
     * id: itemId = 'id' を 'itemId' という名前にする
     */
    setRelatedVideos(relatedVideos.concat(videos.filter(
      ({id: itemId}) => !relatedvideos.find(({id}) => id === itemId),
    )))

    // 続きを取得するための nextPageToken を覚えておく
    setNextPageToken(newNextPageToken)
  }

  useEffect(() => {
    getVideoData();
    getRelatedVideos();
  }, [videoId])

  return presenter({
    videoId,
    videoData,
    relatedVideos,
    loadingRelatedVideos,
    onScrollEnd: getRelatedVideos,
  })
}

PlayerPageContainer.propTypes = {
  api: PropTypes.shape({
    getRelatedVideos: PropTypes.func,
    getVideoData: PropTypes.func,
  }),
}

PlayerPageContainer.defaultProps = {
  api: {
    getVideoData: (videoId) => axios.get(`/api/videos/${videoId}`),
    getRelatedVideos: (videoId, pageToken = '') => axios.get(`/api/videos/${videoId}/related?pageToken=${pageToken}`),
  },
}

export default props => {
  <PlayerPageContainer
    presenter={PlayerPagePresenter}
    {...props}
  />
}

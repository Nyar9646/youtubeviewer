import React from "react";
import PropTypes from 'prop-types'
import styled from 'styled-components'
import VideoListItem from '~/components/organisms/VideoListItem'
import Spinner from '~/components/atoms/Spinner'
import Typography from '~/components/atoms/Typography'

const StyledVideosListItem = styled(VideoListItem)`
  margin-top: 10px;
`

const Loading = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`

const VideosList = ({
  loading,
  videos,
  withFavoriteButton,
}) => (
  <>
    {!loading && !videos.length && <Typography>ビデオがありません</Typography>}

    {videos.map(video => (
      <StyledVideosListItem
        key={video.id}
        video={video}
        withFavoriteButton={withFavoriteButton}
      />
    ))}

    {loading && <Loading><Spinner /></Loading>}
  </>
)

VideosList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
  withFavoriteButton: PropTypes.bool,
}

VideosList.defaultProps = {
  videos: [],
  loading: false,
  withFavoriteButton: false,
}

export default VideosList

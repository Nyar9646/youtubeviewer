import React from "react";
import PropTypes from 'prop-types'
import styled from 'styled-components'

const InlineFrame = styled.iframe`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  border: none;
`

const YoutubeInlineFrame = ({
  className,
  videoId,
}) => (
  <InlineFrame
    className={className}
    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
    allowFullScreen
    frameborder={0}
    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
  />
)

YoutubeInlineFrame.propTypes = {
  className: PropTypes.string,
  videoId: PropTypes.string.isRequired,
}

YoutubeInlineFrame.defaultProps = {
  className: '',
}

export default YoutubeInlineFrame

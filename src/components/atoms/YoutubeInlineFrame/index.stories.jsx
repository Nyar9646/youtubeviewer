import React from "react";
import styled from 'styled-components'
import YoutubeInlineFrame from ".";

/**
 * YoutubeInlineFrame は、親要素のサイズに依存するように設計
 * story で確認するため、ラップ
 */
const Wrapper = styled.div`
  position: relative;
  width: 560px;
  height: 315px;
`

export default { title: 'atoms/YoutubeInlineFrame' }

export const inlineFrame = () => (
  <Wrapper>
    <YoutubeInlineFrame
      videoId="39m7aKAT170"
    />
  </Wrapper>
)
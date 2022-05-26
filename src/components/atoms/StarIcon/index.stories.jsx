import React from "react";
import styled from 'styled-components'
import StarIcon from ".";

const Wrapper = styled.div`
  background-color: #ddd;
`

// onでない時は白の表示で背景と同化するため、decorators で story を背景グレーでラップして表示
export default {
  title: 'molecules/StarIcon',
  decorators: [(storyFn) => <Wrapper>{storyFn()}</Wrapper>]
}

export const on = () => <StarIcon on />
export const off = () => <StarIcon />
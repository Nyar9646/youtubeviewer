import React from "react";
import PropTypes from 'prop-types'
import styled from 'styled-components'

const COLOR_ON = '#ffff00'
const COLOR_OFF = '#999999'

// {on, ...props} ... on を span に渡さない。ブラウザで警告が出る
const StyledIcon = styled(({on, ...props}) => (<span {...props} />))`
  color: ${({on}) => (on ? COLOR_ON : COLOR_OFF)};
  margin-right: 5px;
  display: inline-block;
  width: 10px;
  font-size: 4px;
  &:before {
    content: "★";
  }
`

const StarIcon = ({on}) => (
  <StyledIcon on={on} />
)

StarIcon.propTypes = {
  on: PropTypes.bool,
}

StarIcon.defaultProps = {
  on: false,
}

export default StarIcon

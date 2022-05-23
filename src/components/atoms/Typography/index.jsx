import React from "react";
import PropTypes from 'prop-types'
import styled, {css} from 'styled-components'

const sizeMap = {
  xs: css`
    font-size: 12px;
    line-height: 1.66;
  `,
  s: css`
    font-size: 16px;
    line-height: 1.66;
  `,
  subtitle: css`
    font-size: 18px;
    line-height: 1.66;
  `,
  title: css`
    font-size: 20px;
    line-height: 1.66;
  `,
}

const colorsMap = {
  inherit: 'inherit',
  black: '#000000',
  red: '#ff3300',
  gray: '#8c8c8c',
}

export const sizes = Object.keys(sizeMap)
export const colors = Object.keys(colorsMap)
export const displays = ['initial', 'block', 'inline', 'inline-block']
export const aligns = ['lest', 'right', 'center']

/**
 * styled-components の実装
 *  Root を pタグの component として定義
 *  記載法 color: ${({ color }) => colorsMap[color]};
 *    = color: ${({ props }) => colorMap[props.color]}
 *  利用法 <Root color="red">Hello world!</Root> ⇦ color: #ff3300 のスタイルになる
 */
const Root = styled.p`
  margin: 0;
  color: ${({ color }) => colorsMap[color]};
  ${({ size }) => sizeMap[size]};
  display: ${({ display }) => display};
  text-align: ${({ align }) => align};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
`

/**
 * Typography 実態
 *  各プロパティを styled-components で作成した Root に渡す
 *  children : テキストコンテンツ <Typography>text</Typography>
 */
const Typography = ({
  className,
  size,
  color,
  display,
  align,
  bold,
  children,
}) => (
  <Root
    className={className}
    size={size}
    color={color}
    display={display}
    align={align}
    bold={bold}
  >
    { children }
  </Root>
)

/**
 * PropTypes : パッケージ prop-types を使った機能
 * 未定義の property が渡されると警告が出る
 *   node = render できるもの
 */
Typography.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(sizes),
  color: PropTypes.oneOf(colors),
  display: PropTypes.oneOf(displays),
  align: PropTypes.oneOf(aligns),
  bold: PropTypes.bool,
  children: PropTypes.node.isRequired,
}

/** 未設定の property の初期値 */
Typography.defaultProps = {
  className: '',
  size: 's',
  color: 'inherit',
  align: 'lest',
  bold: false,
  display: 'block',
}

export default Typography
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Input from '~/components/atoms/Input'
import Button from '~/components/atoms/Button'

const Root = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  > *:first-child {
    flex-grow: 1;
    margin-right: 2px;
    width: auto;
  }
`

const SearchFormPresenter = ({
  className,
  onChange,
  defaultValue,
  onSubmit,
}) => (
  <Root className={className}>
    <Input onChange={onChange} defaultValue={defaultValue} />
    <Button onClick={onSubmit} size="l">検索</Button>
  </Root>
)

SearchFormPresenter.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
}

SearchFormPresenter.defaultProps = {
  className: '',
  defaultValue: '',
}

/**
 * 責務：onSubmit に検索ワードを渡して呼び出すまで
 *  処理の内容は親component に任せる
 */
const SearchFormConteiner = ({
  className,
  defaultValue,
  onSubmit,
  presenter,
}) => {
  const [keyword, setKeyword] = useState(defaultValue)

  return presenter({
    className,
    defaultValue,
    // 入力値が更新されたら keyword を更新
    onChange: setKeyword,
    // 検索ボタンが押された時の keyword を引数に渡して onSubmit を呼ぶ
    onSubmit: () => onSubmit(keyword)
  })
}

SearchFormConteiner.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  presenter: PropTypes.func.isRequired,
}

SearchFormConteiner.defaultProps = {
  className: '',
  defaultValue: '',
}

export default props => (
  <SearchFormConteiner
    presenter={SearchFormPresenter}
    {...props}
  />
)

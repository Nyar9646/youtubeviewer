import React, { useState } from "react";
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Root = styled.input`
  width: 100%;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 4px;
  border: 2px solid #ddd;
  box-sizing: border-box;
  :focus {
    /** rgba の a : 透明度 */
    border-color: rgba(100, 100, 255, .5)
  }
  ::placeholder {
    color: #ddd
  }
`

/** プレゼンテーショナルコンポーネント */
export const InputPresenter = ({
  className,
  onChange,
  defaultValue,
  placeholder,
}) => (
  <Root
    className={className}
    defaultValue={defaultValue}
    onChange={onChange}
    placeholder={placeholder}
  />
)

InputPresenter.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
}

InputPresenter.defaultProps = {
  className: '',
  onChange: null,
  defaultValue: '',
  placeholder: '',
}

/** コンテナ・コンポーネント */
export const InputContainer = ({
  className,
  onChange,
  defaultValue,
  placeholder,
  presenter,
}) => {
  const [value, setValue] = useState(defaultValue)

  return presenter({
    className,
    onChange: e => {
      // 入力が変更された時のハンドラ
      const { value: newValue } = e.target

      if (newValue === value) {
        return
      }

      setValue(newValue)

      // 親コンポーネントから渡された onChange を呼ぶ
      onChange(newValue)
    },
    defaultValue,
    placeholder,
  })
}

InputContainer.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  presenter: PropTypes.func.isRequired,
}

InputContainer.defaultProps = {
  className: '',
  onChange: null,
  defaultValue: '',
  placeholder: '',
  presenter: '',
}

/** コンテナーコンポーネントがプレゼンテーションコンポーネントを受け取って実装 */
export default (props) => (
  <InputContainer
    presenter={InputPresenter}
    {...props}
  />
)

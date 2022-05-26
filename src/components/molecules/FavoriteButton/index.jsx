import React, {useContext} from "react";
import PropTypes from 'prop-types'

import axios from "axios";
import FavoriteContext from '~/contexts/FavoriteContext'
import StarIcon from "~/components/atoms/StarIcon";
import Button from '~/components/atoms/Button'

export const FavoriteButtonPresenter = ({
  className,
  isFavorite,
  onClick,
}) => (
  <Button
    className={className}
    onClick={onClick}
    size="s"
  >
    <StarIcon on={isFavorite} />
    お気に入り
  </Button>
)

FavoriteButtonPresenter.propTypes = {
  className: PropTypes.string,
  isFavorite: PropTypes.bool,
  onClick: PropTypes.func,
}

FavoriteButtonPresenter.defaultProps = {
  className: '',
  isFavorite: false,
  onClick: null,
}

const FavoriteButtonContainer = ({
  className,
  videoId,
  api,
  presenter,
}) => {
  const {state: {ids: favoriteIds}, dispatch} = useContext(FavoriteContext)

  // お気に入りリストが未設定(取得前)であれば、お気に入りボタンは表示しない
  if (!favoriteIds) {
    return null
  }

  const isFavorite = favoriteIds.indexOf(videoId) !== -1

  const onClickHandler = e => {
    e.stopPropagation()
    api[isFavorite ? 'delete' : 'post'](videoId)
    dispatch({type: isFavorite ? 'remove' : 'add', id: videoId})
  }

  return presenter({
    className,
    isFavorite,
    onClick: onClickHandler,
  })
}

FavoriteButtonContainer.propTypes = {
  className: PropTypes.string,
  videoId: PropTypes.string.isRequired,
  presenter: PropTypes.func.isRequired,
  api: PropTypes.shape({
    post: PropTypes.func,
    dlete: PropTypes.func,
  }),
}

FavoriteButtonContainer.defaultProps = {
  className: '',
  api: {
    post: (videoId) => axios.post(`/api/favorites/${videoId}`),
    delete: (videoId) => axios.delete(`/api/favorites/${videoId}`),
  }
}

export default (props) => (
  <FavoriteButtonContainer
    {...props}
    presenter={FavoriteButtonPresenter}
  />
)


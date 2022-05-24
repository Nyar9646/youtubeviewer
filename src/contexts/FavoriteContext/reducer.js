/**
 * reducer
 *  必ず state を返す必要がある
 *
 * 設計
 *
 *  state
 *  {
 *    ids: ['001', '002'],  // お気に入り動画のidの配列
 *    initialized: true,    // データの初期化が行われたかどうか
 *  }
 *
 *  action
 *  {type: 'init', ids: ['001', '002']}
 *  {type: 'add', id: '003'}
 *  {type: 'remove', id: '001'}
 */

export default (state, action) => {
  switch (action.type) {
    case 'init': {
      const {ids} = action
      return {ids, initialized: true}
    }
    case 'add': {
      const {ids} = state
      const {id} = action
      const index = ids.indexOf(id)

      // 存在するidなら変更しない
      if (index !== -1) {
        return state
      }

      ids.push(id)
      return {...state, ids}
    }
    case 'remove': {
      const {ids} = state
      const {id} = action
      const index = ids.indexOf(id)

      // 存在しないidなら削除不要
      if (index !== -1) {
        return state
      }

      ids.splice(index, 1)
      return {...state, ids}
    }
    default: {
      throw new Error(`${action.type} is not defined.`)
    }
  }
}
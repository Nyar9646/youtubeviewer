const express = require('express')
const { google } = require('googleapis')
const {readFavoriteIds, writeFavoriteIds} = require('../src/utils/favorite')

const YOUTUBE_API_KEY = ''
console.log(process.env.YOUTUBE_API_KEY)  // x undefind

const youtube = google.youtube({
  version: 'v3',
  auth: YOUTUBE_API_KEY,
})

const router = express.Router()

/** 動画の検索結果の取得 */
router.get('/videos/search/:keyword', (req, res, next) => {
  const { keyword } = req.params;
  const { pageToken } = req.query;

  (async () => {
    const { data: { items: idItems, nextPageToken }} = await youtube.search.list({
      part: 'id',
      q: keyword,
      type: 'video',
      maxResults: 20,
      pageToken,
    })

    const ids = idItems.map(({ id: {videoId} }) => videoId)

    const { data: { items }} = await youtube.videos.list({
      part: 'statistics,snippet',
      id: ids.join(','),
    })

    res.json({ items, nextPageToken })
  })().catch(next)
})

/**
 * お気に入り動画の取得
 *  router.get('/videos/:videoId') より前に書くこと。videoId を favorites と誤認するため
 */
router.get('/videos/favorites', (req, res, next) => {
  (async () => {
    const favoriteIds = await readFavoriteIds()

    if (!favoriteIds.length) {
      res.json({items: []})
      return
    }

    const {data: {items}} = await youtube.videos.list({
      part: 'statistics,snippet',
      id: favoriteIds.join(','),
    })

    res.json({items})
  })().catch(next)
})

/** 動画詳細情報の取得 */
router.get('/videos/:videoId', (req, res, next) => {
  const {videoId} = req.params

  (async () => {
    // 動画の情報を取得
    const {data: {items}} = await youtube.videos.list({
      part: 'statistics,snippet',
      id: videoId,
    })

    res.json(items[0])
  })().catch(next)
})

/** 関連動画の取得 */
router.get('/videos/:videoId/related', (req, res, next) => {
  const {videoId: relatedToVideoId} = req.params
  const {pageToken} =req.query

  (async () => {
    // 関連動画のIDを取得
    const {data: {items: idItems, nextPageToken}} = await youtube.search.list({
      part: 'id',
      relatedToVideoId,
      type: 'video',
      maxResults: 20,
      pageToken,
    })

    // 動画の情報を取得
    const ids = idItems.map(({id: {videoId}}) => videoId)

    const {data: {items}} = await youtube.videos.list({
      part: 'statistics,snippet',
      id: ids.join(',')
    })

    res.json({items, nextPageToken})
  })().catch(next)
})

/** お気に入り動画ID一覧の取得 */
router.get('/favorites', (req, res, next) => {
  readFavoriteIds().then(data => {
    res.json(data)
  }).catch(next)
})

/** お気に入り登録・解除 */
router.route('/favorites/:id')
  // お気に入り登録
  .post((req, res, next) => {
    (async () => {
      const {id} = req.params
      const favoriteIds = await readFavoriteIds()

      if (favoriteIds.indexOf(id) === -1) {
        // お気に入りリストに追加
        favoriteIds.unshift(id)
        // お気に入りリストを書き込む
        writeFavoriteIds(favoriteIds)
      }

      res.end()
    })().catch(next)
  })
  // お気に入り削除
  .delete((req, res, next) => {
    (async () => {
      const {id} = req.params
      const favoriteIds = await readFavoriteIds()
      const indexOfId = favoriteIds.indexOf(id)

      if (indexOfId !== -1) {
        writeFavoriteIds(favoriteIds.filter(favoriteId => (favoriteId !== id)))
      }

      res.end()
    })().catch(next)
  })

module.exports = router

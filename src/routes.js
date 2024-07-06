const express = require('express')
const playlistsController = require('./controllers/playlists-controller')

const router = express.Router()

router.get('/playlists', playlistsController.index)
router.get('/playlists/:id', playlistsController.show)
router.post('/playlists', playlistsController.save)
router.put('/playlists', playlistsController.update)
router.delete('/playlists/:id', playlistsController.delete)
router.post('/playlists/:id/musics', playlistsController.addMusic)
router.delete('/playlists/playlistId/musics/:musicsId', playlistsController.removeMusic)


module.exports = router
let playlists = []

module.exports = {
    // GET / playlists
    index: (req, res) =>{
        res.json(playlists)
    },
    // GET / playlists / :id
    show: (req, res) => {
        const {id} = req.params

        const playlist = playlists.find(pl => pl.id === +id) 

        if(!playlist) return res.tatus(404).json({ message: 'Playlist nt found'})
        
        res.json(playlist)
    },

    // POST / playlists
    save: (req, res) => {
        const {name, tags, musics} = req.body

        if (typeof name !== 'string') {
            return res.status(400).json({message: 'name must be a string'})
        }

        if (!Array.isArray(tags)) {
            return res.status(400).json({message: 'tags must be an array'})
        }

        const newPlaylist = {
            id: Math.floor(Math.random() * 999999),
            name: name,
            tags: tags,
            musics: musics ?? []
        }

        playlists.push(newPlaylist)
        res.status(201).json(newPlaylist)
    },

    // PUT / playlists / :id
    update: (req, res) => {
        const {id} = req.params
        const {name, tags} = req.body

        const playlistIndex = playlists.findIndex(pl => pl.id === +id)

        if(playlistIndex === -1) {return res.tatus(404).json({ message: 'Playlist nt found'})}

        if (typeof name === 'string') {
            playlists[playlistIndex].name = name
        }
        if (tags && Array.isArray(tags)) {
            playlists[playlistIndex].tags = tags
        }

        res.json(playlists[playlistIndex])
    },

    // DELETE / playlists/ :id 
    delete: (req, res) => {
        const { id } = req.params
    
        const playlistIndex = playlists.findIndex(pl => pl.id === +id)
    
        if (playlistIndex === -1) {
          return res.status(404).json({ message: 'playlist not found' })
        }
    
        const deletedPlaylist = playlists.splice(playlistIndex, 1)
    
        res.json(deletedPlaylist)
      },

      // POST /api/playlists/:id/musics
      addMusic: (req, res) => {
        const {title, year, artist, album } = req.body 
        const {id} = req.params

        const playlist = playlists.find(pl => pl.id === +id)
        if(!playlist) return res.status(404).json({message: 'playlist not found'})

        if (typeof title !== 'string' || typeof year !== 'number' || typeof artist !== 'string' || typeof album !== 'string') {
            return res.status(400).json({ message: 'invalid fields'})
        }
        
        const newMusic = {
            id: Math.floor(Math.random() * 999999),
            title: title,
            year: year,
            artist: artist,
            album: album
        }

        playlist.musics.push(newMusic)
        res.status(201).json(newMusic)
      },

      //DELETE /api/playlists/:playlistId/musics/musicId
     removeMusic: (req, res) => {
        const {playlistId, musicId} = req.params
        const playlist = playlist.find(pl => pl.id === +playlistId)

        if (!playlist){
            res.status(404).json({message: "playlist not found"})
        }

        const musicIndex = playlist.musics.findIndex(music => music.id === +musicId)

        if (musicIndex === -1) {
            res.status(404).json({ message: 'music not found' })
          }

        playlist.musics.splice(musicIndex, 1)

        res.status(204).end()
}}
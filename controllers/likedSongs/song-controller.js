import likedSongs from "./likedSongs.js";
import * as likedSongDao from './liked-song-dao.js';

let likedSongArr = likedSongs

const songController = (app) => {
    app.post('/api/like', likeSong)
    app.get('/api/like/:uid', getLikedSongs)
}

const likeSong = async (req, res) => {
    const track = req.body
    const uri = track.uri
    const albumId = track.album.id
    const id = uri.substring(14)
    const user = track.user
    const smallestAlbumImage = track.album.images.reduce(
        (smallest, image) => {
            if (image.height < smallest.height) {
                return image
            }
            return smallest
        },
        track.album.images[0]
    )

    const artist = track.artists[0].name
    const title = track.name
    const albumUrl = smallestAlbumImage.url
    const uid = track.uid

    const likedTrack = {
        'user': user,
        'trackId': id,
        'albumId': albumId,
        'artist': artist,
        'title': title,
        'uri': uri,
        'albumUrl': albumUrl,

    }

    // console.log(likedTrack)
    const likesSong = await likedSongDao.createLikedSong(likedTrack)
}

const getLikedSongs = async (req, res) => {
    const userId = req.params.uid
    const likedSongs = await likedSongDao.findLikedSong(userId)
    res.json(likedSongs);
}

export default songController;
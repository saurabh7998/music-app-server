import likedSongs from "./likedSongs.js";
import * as likedSongDao from './liked-song-dao.js';

let likedSongArr = likedSongs

const songController = (app) => {
    app.post('/api/like', likeSong)
    app.get('/api/like', getLikedSongs)
}

const likeSong = async (req, res) => {
    const track = req.body
    const id = track.album.id;
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
    const uri = track.uri
    const albumUrl = smallestAlbumImage.url

    const likedTrack = {
        'trackId': id,
        'artist': artist,
        'title': title,
        'uri': uri,
        'albumUrl': albumUrl,
    }

    console.log(likedTrack)
    const likesSong = await likedSongDao.createLikedSong(likedTrack)
}

const getLikedSongs = async (req, res) => {
    const likedSongs = await likedSongDao.findLikedSong()
    res.json(likedSongs);
}

export default songController;
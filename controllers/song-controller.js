import likedSongs from "./likedSongs.js";

let likedSongArr = likedSongs

const songController = (app) => {
    app.post('/api/like', likeSong)
    app.get('/api/getLiked', getLikedSongs)
}

const likeSong = async (req, res) => {
    console.log("reached server!!!")
    const track = req.body
    likedSongArr.push(track)
    res.json(track)
}

const getLikedSongs = (req, res) => {

}


export default songController;
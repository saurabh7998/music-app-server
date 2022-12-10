import mongoose from 'mongoose';
import likedSongSchema from "./liked-song-schema.js";

const likedSongModel = mongoose.model('LikedSongModel', likedSongSchema);

export default likedSongModel;


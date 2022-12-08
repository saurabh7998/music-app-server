import likedSongModel from "./liked-song-model.js";

export const findLikedSong = async () => await likedSongModel.find();
export const createLikedSong = async (track) => await likedSongModel.create(track);
export const deleteLikedSong = async (trackId) => await likedSongModel.deleteOne({_id: trackId});


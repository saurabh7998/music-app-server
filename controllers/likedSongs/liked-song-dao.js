import likedSongModel from "./liked-song-model.js";

export const findLikedSong = async (userId) => await likedSongModel.find({user: userId});
export const createLikedSong = async (track) => await likedSongModel.create(track);
export const deleteLikedSong = async (userId,id) => await likedSongModel.deleteOne({trackId: id});


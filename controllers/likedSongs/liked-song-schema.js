import mongoose from 'mongoose';

const schema = mongoose.Schema({
                                   trackId: String,
                                   artist: String,
                                   title: String,
                                   uri: String,
                                   albumUrl: String,
                               }, {collection: 'likedSongs'});
export default schema;

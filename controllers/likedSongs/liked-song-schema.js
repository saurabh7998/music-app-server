import mongoose from 'mongoose';

const schema = mongoose.Schema({
                                   user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
                                   trackId: String,
                                   albumId: String,
                                   artist: String,
                                   title: String,
                                   uri: String,
                                   albumUrl: String,
                               }, {collection: 'likedSongs'});
export default schema;

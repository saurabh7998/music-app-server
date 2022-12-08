import mongoose from 'mongoose';

const schema = mongoose.Schema({
                                   trackId: String
                               }, {collection: 'likedSongs'});
export default schema;

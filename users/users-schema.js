import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: String,
    firstName: String,
    lastName: String,
    dob: String,
    address: String,
    role: {type: String, enum: ['ADMIN','USER']},
    //likedSongs: {type: String, enum: ['ADMIN','USER']}
}, {collection: 'users'})

export default usersSchema
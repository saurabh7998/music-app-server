import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    email: String,
    firstName: String,
    lastName: String,
    dob: String,
    address: String,
    admin: Boolean,
    //likedSongs: {type: String, enum: ['ADMIN','USER']}
}, {collection: 'users'})

export default usersSchema
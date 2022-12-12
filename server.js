import express from "express"
import cors from "cors"
import bodyParser from "body-parser";
import lyricsFinder from "lyrics-finder"
import SpotifyWebApi from "spotify-web-api-node"
import songController from "./controllers/likedSongs/song-controller.js"
import mongoose from "mongoose";
import usersController from "./users/users-controller.js";
import session from 'express-session'
import SessionController from "./session-controller.js";
import request from 'request'

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false,
    maxPoolSize: 10,
    socketTimeoutMS: 45000,
    family: 4
}

// const CONNECTION_STRING = 'mongodb://localhost:27017/songs'
const CONNECTION_STRING = "mongodb+srv://saurabh7998:MyTuiterDb7998!@cluster0.wivmu9n.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(CONNECTION_STRING, options);

const app = express()

app.use(cors({
                 credentials: true,
                 origin: 'http://localhost:3000'
             }))
app.use(session({
                    secret: 'should be an environment variable',
                    resave: false,
                    saveUninitialized: true,
                    cookie: {secure: false}
                }))
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const client_id = 'bb235ac85acd4799bac266127f244d7f';
const client_secret = 'f90c5e786138486693a7387946739c3f';

app.post("/authenticate", (req, res) => {
    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(
                             client_id + ':' + client_secret).toString(
                'base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const token = body.access_token;
            // res.json({
            //              accessToken: token
            //          })
            res.json({
                'token': token
                     })
        }
    });
})

app.get("/lyrics", async (req, res) => {
    const lyrics =
        (await lyricsFinder(req.query.artist, req.query.track))
        || "No Lyrics Found"
    res.json({lyrics})
})

usersController(app)
SessionController(app)
songController(app)

app.listen(4000)




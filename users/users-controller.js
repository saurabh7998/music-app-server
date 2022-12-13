import * as userDao from './users-dao.js'

const UsersController = (app) => {
    app.get('/api/users', findAllUsers)
    app.get('/api/users/:uid', findUserById)
    app.post('/api/users', createUser)
    app.put('/api/users/:uid', updateUser)
    app.delete('/api/users/:uid', deleteUser)

    app.post('/api/register', register)
    app.post('/api/login', login)
    app.post('/api/logout', logout)
    app.post('/api/profile', profile)
}

const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers()
    res.json(users)
}
const createUser = async (req, res) => {
    const newUser = req.body;
    const actualUser = await userDao.createUser(newUser)
    res.json(actualUser)
}
const updateUser = () => {
}
const deleteUser = () => {
}

const register = async (req, res) => {
    const user = req.body;
    const existingUser = await userDao
        .findUserByUsername(user.username)
    if (existingUser) {
        res.sendStatus(403)
        return
    }
    const currentUser = await userDao.createUser(user)
    // console.log(currentUser)
    req.session['currentUser'] = currentUser
    res.json(currentUser)
}

const login = async (req, res) => {
    res.setHeader("Access-Control-Allow-Headers",
                  "Origin, X-Requested-With, Content-Type, Accept");
    const credentials = req.body
    const existingUser = await userDao
        .findUserByCredentials(
            credentials.username, credentials.password)
    if (existingUser) {
        req.session['currentUser'] = existingUser
        res.json(existingUser)
        return
    }
    res.sendStatus(403)
}

const logout = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
}

const profile = (req, res) => {
    if (req.session['currentUser']) {
        res.send(req.session['currentUser'])
    } else {
        res.sendStatus(403)
    }
}

const findUserById = async (req, res) => {
    const uid = req.params.uid
    const user = await userDao.findUserById(uid)
    if (user) {
        res.json(user)
        return
    }
    res.sendStatus(404)
}

export default UsersController
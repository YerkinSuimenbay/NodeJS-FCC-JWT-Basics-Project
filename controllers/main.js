require('dotenv').config()
const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
const CustomAPIError = require('../errors/custom-error')

const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) throw new BadRequestError('Please provide username and password to login')
    
    const id = Date.now()
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, { expiresIn: '1day' })
    res.status(200).json({ msg: 'Logged in', token })
}

const dashboard = async (req, res) => {
    const { id, username } = req.user
    const decoded = req.body.decoded
    const luckyNumber = Math.floor(Math.random() * 100)
    res.status(200).json({ msg: `Hello, ${username}`, secret: `Here is ur authorized data, ur lucky number is ${luckyNumber}` })
}

module.exports = {
    login,
    dashboard,
}
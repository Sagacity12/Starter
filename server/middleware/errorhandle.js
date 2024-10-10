const errorHandlerMiddleware = (err, req, res, next) => {
    return res.status(err.status).json({ msg: `Something went wrong, try again later` })
}

module.exports = errorHandlerMiddleware 

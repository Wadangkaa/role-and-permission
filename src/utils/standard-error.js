function errorFormate() {
    return (error, req, res, next) => {
        error.statusCode = error.statusCode || 500
        return res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        })
    }
}

export { errorFormate }

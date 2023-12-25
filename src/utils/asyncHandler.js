const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) =>
            next(error)
        )
    }
}

export { asyncHandler }

// or try catch way
/*
	const asyncHandler = (fn) => async (req, res, next) => {
		try {
			await fn(req, res, next)
		} catch (error) {
			res.status(err.status || 500).json({
				status: false,
				message: err.message,
			})
		}
	}
*/

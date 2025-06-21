const ENVIRONMENT = process.env.ENVIRONMENT

function environmentMiddleware(environment) {
    return (req, res, next) => {
        if (!ENVIRONMENT) {
            console.error('Environment variable ENVIRONMENT is not set')
            return res.status(500).json({ message: 'Internal Server Error'})
        }

        if (ENVIRONMENT !== environment) {
            console.warn(`Request made in ${ENVIRONMENT} environment, expected ${environment}`)
            return res.status(403).json({ message: `Forbidden: This endpoint is not available in ${ENVIRONMENT} environment` })
        }

        next()
    }
}

module.exports = {
    environmentMiddleware
}
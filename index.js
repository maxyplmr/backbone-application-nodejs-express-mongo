const app = require('./app')

process
    .on('unhandledRejection', (reason, p) => console.error(reason, ' Promise Rejection At:', p))
    .on('uncaughtException', err => {
        console.error(err)
        process.exit(1)
    })


app.listen(process.env.PORT, () => {
    console.log(`localhost:${ process.env.PORT } ${ process.env.NODE_ENV } mode`)
})
const app = require('./app')


app.listen(process.env.PORT, () => {
    console.log(`localhost:${ process.env.PORT } ${ process.env.NODE_ENV } mode`)
})
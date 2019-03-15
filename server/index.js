import Express from 'express'
import Path from 'path'
import Http from 'http'
import routes from './routes'

const app = Express()

app.use('/', Express.static(Path.join(__dirname, '..', 'dist')))
app.use('/dist', Express.static(Path.join(__dirname, '..', 'dist')))
app.use('/', routes)

const port = process.env.PORT || '3000'
app.set('port', port)


const server = Http.createServer(app)

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server Running on port ${port}`))
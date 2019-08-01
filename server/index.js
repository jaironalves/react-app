import Express from 'express'
import Path from 'path'
import Http from 'http'
import Routes from './routes'

const app = Express()

const rootPath = Path.join(__dirname, '..', 'dist/')

app.use('/', Express.static(rootPath))
app.use('/', Routes(rootPath))

const port = process.env.PORT || '3000'
app.set('port', port)

const server = Http.createServer(app)

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server Running on port ${port}`))

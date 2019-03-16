import Path from 'path'

export default (rootPath) => {

  const router = require('express').Router()

  router.get('*', (req, res) => {
    const route = Path.join(rootPath, 'index.html')
    res.sendFile(route)
  })

  return router
}

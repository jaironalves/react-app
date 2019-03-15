import Path from 'path'

const router = require('express').Router()

router.get('*', (req, res) => {
  const route = Path.join(__dirname, '..', '..', 'dist', 'index.html')
  res.sendFile(route)
})

export default router

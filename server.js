require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3001
const postsRouter = require('./routes/postsRouter')

app.use(express.json())
app.use(express.static('public'))
app.use('/posts', postsRouter)

app.listen(port, () => {
  console.log('Server running at http://localhost:' + port);
})
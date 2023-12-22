import 'dotenv/config'

(async () => {
  const port = process.env.PORT
  const app = (await import('./config/app')).default
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
  })
})()

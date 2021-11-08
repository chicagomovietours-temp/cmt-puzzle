const express = require("express")
const fs = require("fs")
const app = express()
const serverless = require("serverless-http")
app.get("/api/puzzle/:id", (req, res) => {
  let id = req.params.id
  try {
    id = parseInt(id)
  } catch {
    res.sendStatus(400)
    return
  }
  if (typeof id === "number" && Number.isInteger(id) && id >= 0 && id < 10000) {
    fs.readFile(`../cms/puzzle/${id}.json`, (err, data) => {
      if (err) {
        res.sendStatus(500)
      }
      res.json(JSON.parse(data))
    })
  } else {
    res.sendStatus(400)
  }
})
exports.handler = serverless(app)

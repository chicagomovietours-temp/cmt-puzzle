exports.handler = async function (event, context) {
  if (event.httpMethod === "POST") {
    let path = event.path.split("/")
    if (path.length >= 2 && path[path.length - 2] === "game-data") {
      let text = path[path.length - 1]
      let id = -1
      try {
        id = parseInt(text)
      } catch {
        return {
          statusCode: 400,
        }
      }
      if (
        typeof id === "number" &&
        Number.isInteger(id) &&
        id >= 0 &&
        id < 10000
      ) {
        let data = event.body
        try {
          data = JSON.parse(data)
          if (typeof data === "object" && Array.isArray(data.access_codes)) {
            const access_codes = data.access_codes.filter(
              d => typeof d === "string"
            )
            let { games } = require("../../cms/games.json")
            games = games
              .filter(game => game.game_id === id)
              .filter(game => {
                for (let b of access_codes) {
                  if (game.access_codes.includes(b)) {
                    return true
                  }
                }
                return false
              })
            if (games.length === 1) {
              const game = games[0]
              try {
                const gameData = {
                  name: game.name,
                  id: game.game_id,
                  description: game.description,
                  intro: game.intro,
                  intro_image: game.intro_image,
                  conclusion: game.conclusion,
                  conclusion_image: game.conclusion_image,
                  sequences: game.sequences,
                  puzzles: game.puzzles,
                }
                return {
                  statusCode: 200,
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(gameData),
                }
              } catch (err) {
                if (err.code === "ENOENT") {
                  return {
                    statusCode: 404,
                    body: "Not Found",
                  }
                }
                console.error("Error reading puzzle:", id)
                console.error(err)
                return {
                  statusCode: 500,
                  body: "Internal Server Error",
                }
              }
            } else {
              return {
                statusCode: 400,
                body: "Bad Request",
              }
            }
          } else {
            return {
              statusCode: 400,
              body: "Bad Request",
            }
          }
        } catch (err) {
          return {
            statusCode: 400,
            body: "Bad Request",
          }
        }
      } else {
        return {
          statusCode: 400,
          body: "Bad Request",
        }
      }
    } else {
      return {
        statusCode: 400,
        body: "Bad Request",
      }
    }
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    }
  }
}

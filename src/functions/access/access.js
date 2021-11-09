exports.handler = async function (event, context) {
  if (event.httpMethod === "POST") {
    let data = event.body
    try {
      data = JSON.parse(data)
      if (typeof data === "object" && Array.isArray(data.access_codes)) {
        const access_codes = data.access_codes.filter(
          d => typeof d === "string"
        )
        const { games } = require("../../cms/games.json")
        const allowed = games
          .filter(game => {
            for (let b of access_codes) {
              if (game.access_codes.includes(b)) {
                return true
              }
            }
            return false
          })
          .map(game => {
            return {
              id: game.game_id,
              name: game.name,
              description: game.description,
            }
          })
        if (allowed.length > 0) {
          return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ games: allowed }),
          }
        } else {
          return {
            statusCode: 403,
            body: "Access Forbidden",
          }
        }
      } else {
        return {
          statusCode: 400,
          body: "Bad Request",
        }
      }
    } catch (err) {
      console.error("Error while handling access request - request body:")
      console.error(data)
      console.error(err)
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

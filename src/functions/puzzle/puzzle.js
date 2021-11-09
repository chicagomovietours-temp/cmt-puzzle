const fs = require("fs")
exports.handler = async function (event, context) {
  if (event.httpMethod === "GET") {
    const { access_code } = require("../../cms/config.json")
    if (event.headers.authorization === `Bearer ${access_code}`) {
      let path = event.path.split("/")
      if (path.length >= 2 && path[path.length - 2] === "puzzle") {
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
          id < 10000 &&
          id.toString() === text
        ) {
          try {
            let data = fs.readFileSync(`src/cms/puzzle/${id}.json`)
            return {
              statusCode: 200,
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(JSON.parse(data)),
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
    } else {
      return {
        statusCode: 403,
        body: "Access Forbidden",
      }
    }
  } else {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    }
  }
}

const fs = require("fs")
const { access_code } = require("../../cms/config.json")
exports.handler = async function (event, context) {
  if (event.httpMethod === "GET") {
    if (event.headers?.authorization === `Bearer ${access_code}`) {
      return {
        statusCode: 200,
        body: "OK",
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

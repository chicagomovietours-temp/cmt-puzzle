import { useState, useEffect } from "react"
import { checkAccessCodes } from "../util/util.js"
import { Link } from "gatsby"

const IndexPage = () => {
  let [games, setGames] = useState({})
  useEffect(() => {
    if (window !== undefined) {
      try {
        let data = JSON.parse(localStorage.getItem("access_codes"))
        if (data != null && Array.isArray(data.access_codes)) {
          checkAccessCodes(data.access_codes).then(res => {
            if (res != null) {
              setGames(gamesTemp => {
                return { ...res.games, ...gamesTemp }
              })
            }
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }, [])
  let [alertInvalid, setAlertInvalid] = useState(false)
  useEffect(() => {}, [games])
  let gameComponents = Object.values(games).map(game => (
    <div key={game.id} className="game">
      <h3>{game.name}</h3>
      <p>{game.description}</p>
      <Link to={`/game/${game.id}`}>Play</Link>
    </div>
  ))
  return (
    <main>
      <h1>Chicago Movie Tours - Puzzle Game</h1>
      <p>Welcome.</p>
      <div className="access-entry">
        <p>
          <strong>Add a game below</strong>
        </p>
        <form
          onSubmit={event => {
            event.preventDefault()
            let value = document.getElementById("access_code")?.value
            checkAccessCodes([value]).then(res => {
              if (res != null) {
                setGames(gamesTemp => {
                  return { ...res.games, ...gamesTemp }
                })
                setAlertInvalid(false)
                let access_codes = []
                try {
                  let data = JSON.parse(localStorage.getItem("access_codes"))
                  if (data != null && Array.isArray(data.access_codes)) {
                    access_codes = data.access_codes
                  }
                } catch {}
                access_codes.push(value)
                localStorage.setItem(
                  "access_codes",
                  JSON.stringify({ access_codes })
                )
              } else {
                setAlertInvalid(true)
              }
            })
          }}
        >
          <label htmlFor="access_code">Access Code:</label>
          <input type="text" id="access_code" name="access_code" />
          <input type="submit" value="Submit" />
        </form>
        {alertInvalid ? (
          <p className="invalid-code">Invalid access code. Try again.</p>
        ) : (
          <></>
        )}
      </div>
      <div className="games">
        <h2>Your Games</h2>
        {gameComponents.length > 0 ? (
          <div>{gameComponents}</div>
        ) : (
          <p>
            You don't have any games right now. Enter an access code to get
            access!
          </p>
        )}
      </div>
    </main>
  )
}

export default IndexPage

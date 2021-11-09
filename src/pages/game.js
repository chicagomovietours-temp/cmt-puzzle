import { navigate } from "gatsby"
import { useEffect, useState } from "react"
import { getGameData } from "../util/util.js"

/*import Puzzle from "../components/puzzle.js"
<Puzzle
  id={1}
  next_id={2}
  name="Puzzle 1"
  image="/data/uploads/puzzle1.jpg"
  answer="4"
  hint="Take a look around, young ones! If you can tell me exactly how many street signs there are at this corner, I will let you pass!"
  answer_correct_text="Curses, foiled again! Your grandfather told me only the smartest of kids would be able to solve my puzzle, but I know another person across the river that should be able to stump you. Here, your grandfather gave me a snapshot of the location."
/>
*/

const GamePage = () => {
  let [data, setData] = useState(null)
  let [error, setError] = useState(null)
  let path = location.pathname.split("/")
  let id = -1
  if (path.length === 3 && path[1] === "game") {
    let idText = path[2]
    try {
      id = parseInt(idText)
    } catch {}
    if (
      typeof id !== "number" ||
      !Number.isInteger(id) ||
      id < 0 ||
      id >= 10000
    ) {
      navigate("/")
    }
  } else {
    navigate("/")
  }
  useEffect(() => {
    if (window !== null && id >= 0 && data === null) {
      try {
        let data = JSON.parse(localStorage.getItem("access_codes"))
        if (data != null && Array.isArray(data.access_codes)) {
          getGameData(data.access_codes, id).then(res => {
            if (res.data !== null) {
              setData(res.data)
            } else {
              setError(res.error)
            }
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }, [])

  return (
    <main>
      {error === null ? (
        data === null ? (
          <p>Loading game data... Please wait.</p>
        ) : (
          <></>
        )
      ) : (
        <>
          <p>Error while loading data!</p>
          <code>{error}</code>
        </>
      )}
    </main>
  )
}

export default GamePage

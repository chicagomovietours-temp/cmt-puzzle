import { Link } from "gatsby"
import { useEffect, useState } from "react"
import Puzzle from "../components/puzzle.js"
import { getGameData } from "../util/util.js"
import { navigate } from "gatsby"

const Game = ({ gameId, puzzleId, isConclusion }) => {
  let [sequence, setSequence] = useState(null)
  let [data, setData] = useState(null)
  let [error, setError] = useState(null)
  useEffect(() => {
    if (window !== null && gameId >= 0 && data === null) {
      try {
        let data = JSON.parse(localStorage.getItem("access_codes"))
        if (data != null && Array.isArray(data.access_codes)) {
          getGameData(data.access_codes, gameId).then(res => {
            if (res.data !== null) {
              setData(res.data)
              setSequence(
                res.data.sequences[
                  Math.floor(Math.random() * res.data.sequences.length)
                ]
                  .split(",")
                  .map(n => parseInt(n))
              )
            } else {
              setError(res.error)
            }
          })
        }
      } catch (err) {
        console.error(err)
      }
    }
  }, [gameId])
  let puzzleData = {}
  if (puzzleId !== null && data != null) {
    let p = data.puzzles.filter(p => p.id === puzzleId)
    if (p.length === 1) {
      puzzleData = p[0]
    } else {
      navigate(`/game/${gameId}`)
    }
  }
  return (
    <>
      {error === null ? (
        data === null || sequence === null ? (
          <p>Loading game data... Please wait.</p>
        ) : puzzleId === null ? (
          isConclusion ? (
            <>
              <h1>{data.name} - Conclusion</h1>
              <p>{data.conclusion}</p>
              {data.conclusion_image ? (
                <img src={data.conclusion_image} width="100" />
              ) : (
                <></>
              )}
              <Link to={`/game/${gameId}`}>Back To Start</Link>
            </>
          ) : (
            <>
              <h1>{data.name}</h1>
              <p>{data.description}</p>
              {data.intro || data.intro_image ? <h2>Introduction</h2> : <></>}
              {data.intro ? <p>{data.intro}</p> : <></>}
              {data.intro_image ? (
                <img src={data.intro_image} width="100" />
              ) : (
                <></>
              )}
              <p>
                <Link to={`puzzle/${sequence[0]}`}>Start Game</Link>
              </p>
              <p>
                <Link to="/">Back to Main Page</Link>
              </p>
            </>
          )
        ) : (
          <Puzzle
            gameId={gameId}
            prev={sequence[sequence.indexOf(puzzleId) - 1]}
            next={sequence[sequence.indexOf(puzzleId) + 1]}
            {...puzzleData}
          />
        )
      ) : (
        <>
          <p>Error getting game data:</p>
          <code>{error}</code>
        </>
      )}
    </>
  )
}

export default Game

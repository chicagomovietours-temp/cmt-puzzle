import { navigate, Link } from "gatsby"
import { useEffect, useState } from "react"
import { getGameData } from "../util/util.js"

import Puzzle from "../components/puzzle.js"

const GamePageComponent = () => {
  let [data, setData] = useState(null)
  let [error, setError] = useState(null)
  let path = location.pathname.split("/")
  let gameId = -1
  let puzzleId = -1
  let isConclusion = path.length === 4 && path[3] === "conclusion"
  let isPuzzlePath = path.length === 5 && path[3] === "puzzle"
  if (
    (path.length === 3 || isPuzzlePath || isConclusion) &&
    path[1] === "game"
  ) {
    let idText = path[2]
    try {
      gameId = parseInt(idText)
    } catch {}
    if (
      typeof gameId !== "number" ||
      !Number.isInteger(gameId) ||
      gameId < 0 ||
      gameId >= 10000
    ) {
      navigate("/")
    }
  } else {
    navigate("/")
  }
  if (isPuzzlePath) {
    let idText = path[4]
    try {
      puzzleId = parseInt(idText)
    } catch {}
    if (
      typeof puzzleId !== "number" ||
      !Number.isInteger(puzzleId) ||
      puzzleId < 0 ||
      puzzleId >= 10000
    ) {
      navigate(`/game/${gameId}`)
    }
  }
  useEffect(() => {
    if (window !== null && gameId >= 0 && data === null) {
      try {
        let data = JSON.parse(localStorage.getItem("access_codes"))
        if (data != null && Array.isArray(data.access_codes)) {
          getGameData(data.access_codes, gameId).then(res => {
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

  let puzzleData = {}
  if (puzzleId !== -1 && data != null) {
    let p = data.puzzles.filter(p => p.id === puzzleId)
    if (p.length === 1) {
      puzzleData = p[0]
      puzzleData.last =
        puzzleId === Math.max(...data.puzzles.map(puzzle => puzzle.id))
    } else {
      navigate(`/game/${gameId}`)
    }
  }

  return (
    <>
      {error === null ? (
        data === null ? (
          <p>Loading game data... Please wait.</p>
        ) : puzzleId === -1 ? (
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
                <Link to="puzzle/0">Start Game</Link>
              </p>
              <p>
                <Link to="/">Back to Main Page</Link>
              </p>
            </>
          )
        ) : (
          <Puzzle gameId={gameId} {...puzzleData} />
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

export default GamePageComponent

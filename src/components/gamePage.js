import { navigate } from "gatsby"
import Game from "./game"

const GamePageComponent = () => {
  let path = location.pathname.split("/")
  let gameId = null
  let puzzleId = null
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

  return (
    <Game gameId={gameId} puzzleId={puzzleId} isConclusion={isConclusion} />
  )
}

export default GamePageComponent

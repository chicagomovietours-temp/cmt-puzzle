import { useEffect, useState } from "react"
import { Link } from "gatsby"

const Puzzle = ({
  title,
  id,
  image,
  hint,
  answer,
  answer_correct_text,
  answer_incorrect_text,
  gameId,
  prev,
  next,
}) => {
  let [answerOK, setAnswerOK] = useState(-1)
  useEffect(() => {
    // Make sure answer state resets when ID changes
    setAnswerOK(-1)
  }, [id])
  return (
    <div className="puzzle" id={`puzzle-${id}`}>
      <h1 className="title">{title}</h1>
      <img className="puzzle-image" src={image} width="100" />
      <p className="hint">{hint}</p>
      {answerOK !== 1 ? (
        <>
          <form
            onSubmit={event => {
              event.preventDefault()
              if (document.getElementById("answer")?.value === answer) {
                setAnswerOK(1)
              } else {
                setAnswerOK(0)
              }
            }}
          >
            <label htmlFor="answer">Answer:</label>
            <input type="text" id="answer" name="answer" />
            <input type="submit" value="Submit" />
          </form>
          {answerOK === 0 ? (
            <p>{answer_incorrect_text || "Incorrect answer! Try again."}</p>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          <p className="correct-text">
            {answer_correct_text || "Correct answer!"}
          </p>
          <p>
            {next === undefined ? (
              <Link className="next-button" to={`/game/${gameId}/conclusion`}>
                To The End
              </Link>
            ) : (
              <Link
                className="next-button"
                to={`/game/${gameId}/puzzle/${next}`}
              >
                Next Puzzle
              </Link>
            )}
          </p>
        </>
      )}
      <p>
        <Link
          className="back-button"
          to={
            prev === undefined
              ? `/game/${gameId}`
              : `/game/${gameId}/puzzle/${prev}`
          }
        >
          Go Back
        </Link>
      </p>
    </div>
  )
}

export default Puzzle

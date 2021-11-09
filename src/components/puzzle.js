import { useState } from "react"
import { Link } from "gatsby"

const Puzzle = ({
  title,
  id,
  image,
  hint,
  answer,
  answer_correct_text,
  gameId,
  last,
}) => {
  let [answerOK, setAnswerOK] = useState(-1)
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
          {answerOK === 0 ? <p>Incorrect answer! Try again.</p> : <></>}
        </>
      ) : (
        <>
          <p className="correct-text">{answer_correct_text}</p>
          <p>
            {last ? (
              <Link className="next-button" to={`/game/${gameId}/conclusion`}>
                To The End
              </Link>
            ) : (
              <Link
                className="next-button"
                to={`/game/${gameId}/puzzle/${id + 1}`}
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
          to={id > 1 ? `/game/${gameId}/puzzle/${id - 1}` : `/game/${gameId}`}
        >
          Go Back
        </Link>
      </p>
    </div>
  )
}

export default Puzzle

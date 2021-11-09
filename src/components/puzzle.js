import { useState } from "react"
import { Link } from "gatsby"

const Puzzle = ({
  title,
  id,
  image,
  hint,
  answer,
  answer_correct_text,
  next_id,
}) => {
  let [answerOK, setAnswerOK] = useState(-1)
  return (
    <div className="puzzle" id={`puzzle-${id}`}>
      <h1 className="title">{title}</h1>
      <img className="puzzle-image" src={image} width="100" />
      <p className="hint">{hint}</p>
      {answerOK !== 1 ? (
        <>
          <p>Please enter your access code below to get started.</p>
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
            <Link className="next-button" to={`/puzzle/${id + 1}`}>
              Next Puzzle
            </Link>
          </p>
        </>
      )}
      <Link
        className="back-button"
        to={id > 1 ? `/puzzle/${id - 1}` : `/puzzle`}
      >
        Go Back
      </Link>
    </div>
  )
}

export default Puzzle

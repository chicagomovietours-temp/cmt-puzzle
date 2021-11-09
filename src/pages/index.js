import { checkAccessCode } from "../util/util.js"

const IndexPage = () => {
  return (
    <main>
      <h1>Chicago Movie Tours - Puzzle Game</h1>
      <p>Welcome! Please enter your access code below to get started.</p>
      <form
        onSubmit={event => {
          event.preventDefault()
          let value = document.getElementById("access_code")?.value
          checkAccessCode(value).then(pass => {
            if (pass) {
              alert("Success!")
              localStorage.setItem("access_code", value)
            } else {
              alert("Invalid code")
            }
          })
        }}
      >
        <label htmlFor="access_code">Access Code:</label>
        <input type="text" id="access_code" name="access_code" />
        <input type="submit" value="Submit" />
      </form>
    </main>
  )
}

export default IndexPage

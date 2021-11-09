import GamePageComponent from "../components/gamePage"
import ClientOnly from "../components/clientOnly"

const GamePage = () => {
  return (
    <main>
      <ClientOnly>
        <GamePageComponent />
      </ClientOnly>
    </main>
  )
}

export default GamePage

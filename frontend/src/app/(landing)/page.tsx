import { Hero } from "./_components/Hero"
import { Social } from "./_components/Social"

const LandingPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10">
      <Hero />
      <Social />
    </div>
  )
}

export default LandingPage

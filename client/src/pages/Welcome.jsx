import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import HowItWorks from '../components/HowItWorks'
import KeyFeatures from '../components/KeyFeatures'
import Footer from '../components/Footer'

function Welcome() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <HowItWorks />
      <KeyFeatures />
      <Footer />
    </main>
  )
}
export default Welcome
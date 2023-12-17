import HeroSection from "./HeroSection"
import './App.css'

import { MuiNavbar } from "./components/MuiNavbar.js";
import { About, HowTo, Features } from './components/descriptions.js'

const App = () => {
    return (
        <>
            <section id='first'>

                <div>

                <MuiNavbar />
                </div>

                <div id="firstHero">
                    <HeroSection />
                </div>

            </section>

            <section>
                <HowTo />
            </section>

            <section>
                <Features></Features>
            </section>

            <section>
                <About />
            </section>

        </>
    )
}

export default App
import HeroSection from "./HeroSection"
import './App.css'

import { MuiNavbar } from "./components/MuiNavbar.js";
import { About, HowTo, Features } from './components/descriptions.js'

import HeroSectionMobile from "./components/HeroSectionMobile.js";
import { useMediaQuery } from "react-responsive";


const App = () => {
    const isMobile = useMediaQuery({ maxWidth: 900 })
    return (
        <>
            <section id='first'>

                <div>
                    <MuiNavbar />
                </div>

                {isMobile ? (<div id="heroMobile"><HeroSectionMobile /></div>) : (<div id="firstHero"><HeroSection /></div>)}

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

            {/* Cover for smaller screens */}
            {/* <div className="coverMessage"><p>Sorry, not yet configured for smaller screens.</p>
                <a href="https://github.com/sauravkhanal/yolo-inference-webapp">view source Code</a>
            </div> */}
        </>
    )
}

export default App
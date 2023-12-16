import HeroSection from "./HeroSection"
import './App.css'

// import Header from './components/Header.js';
import { MuiNavbar } from "./components/MuiNavbar.js";
// import { Dummy1, Dummy2 } from "./components/Dummy.js";
import { About } from './components/descriptions.js'

const App = () => {
    return (
        <>
            <section id="hero">
                <MuiNavbar />
                <HeroSection />
            </section>

            {/* <Header/> */}
            {/* <Dummy1/> */}

            <section>
                <About /> 
            </section>

            {/* <section>
                <Dummy2 />
            </section> */}
        </>
    )
}

export default App
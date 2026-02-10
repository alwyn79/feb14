import FloatingElements from "./components/FloatingElements";
import Hero from "./components/Hero";
import Slideshow from "./components/Slideshow";
import Quiz from "./components/Quiz";
import SecretMessage from "./components/SecretMessage";
import Compliments from "./components/Compliments";
import TreasureHunt from "./components/TreasureHunt";
import LoveLetter from "./components/LoveLetter";
import BackgroundMusic from "./components/BackgroundMusic";

function App() {
    return (
        <div className="relative selection:bg-pink-300 selection:text-white">
            {/* Background Layer */}
            <FloatingElements />

            {/* Music Layer */}
            <BackgroundMusic />

            {/* Main Content Sections */}
            <main className="relative z-10 w-full">
                <Hero />

                <div id="adventure-content" className="space-y-0">
                    <Slideshow />
                    <Quiz />
                    <Compliments />
                    <SecretMessage />
                    <TreasureHunt />
                    <LoveLetter />
                </div>
            </main>

            {/* Footer */}
            <footer className="py-12 bg-pink-100 text-center text-pink-500 font-medium">
                Made with ❤️ for Valentine's Day 2026
            </footer>
        </div>
    );
}

export default App;

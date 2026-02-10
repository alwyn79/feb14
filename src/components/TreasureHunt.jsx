import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const clues = [
    { q: "Where is our next dream destination?", a: "paris" },
    { q: "What's the name of our special song?", a: "perfect" },
    { q: "The date of our first kiss (DDMM)?", a: "1402" }
];

const TreasureHunt = () => {
    const [step, setStep] = useState(0);
    const [input, setInput] = useState("");
    const [error, setError] = useState(false);

    const check = (e) => {
        e.preventDefault();
        if (input.toLowerCase().trim() === clues[step].a) {
            if (step + 1 < clues.length) {
                setStep(step + 1);
                setInput("");
                setError(false);
            } else {
                setStep(100); // Finished
            }
        } else {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <section className="py-20 bg-white flex flex-col items-center px-4">
            <div className="max-w-md w-full glass p-8 rounded-[40px] shadow-2xl border-4 border-pink-100">
                <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center"> Romantic Treasure Hunt 🗺️</h2>

                {step < 100 ? (
                    <div className="space-y-6">
                        <div className="text-center">
                            <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-bold">Clue #{step + 1}</span>
                        </div>
                        <p className="text-xl text-center text-gray-700 font-medium">{clues[step].q}</p>
                        <form onSubmit={check} className="flex flex-col gap-4">
                            <motion.input
                                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Answer here..."
                                className="w-full p-4 rounded-2xl border-2 border-pink-200 outline-none focus:border-pink-500 transition-colors text-center font-bold text-pink-700"
                            />
                            <button
                                type="submit"
                                className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold transition-all shadow-md"
                            >
                                Unlock Next Clue 🔓
                            </button>
                        </form>
                    </div>
                ) : (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                        <div className="text-6xl mb-4">🏆</div>
                        <h3 className="text-3xl font-bold text-pink-500 mb-4 italic">Surprise waiting for you ❤️</h3>
                        <p className="text-pink-400">You've reached the end of the adventure!</p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default TreasureHunt;

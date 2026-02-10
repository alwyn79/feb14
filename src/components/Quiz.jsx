import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
    {
        q: "Where did we first meet?",
        options: ["College", "Mall", "Park", "Online"],
        correct: 0
    },
    {
        q: "What is my favorite color on you?",
        options: ["Red", "Pink", "Black", "Blue"],
        correct: 2
    },
    {
        q: "What was our first dinner together?",
        options: ["Pizza", "Pasta", "Sushi", "Burgers"],
        correct: 1
    }
];

const Quiz = () => {
    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleAnswer = (index) => {
        if (index === questions[current].correct) setScore(score + 1);

        if (current + 1 < questions.length) {
            setCurrent(current + 1);
        } else {
            setFinished(true);
        }
    };

    return (
        <section className="py-20 bg-pink-50 px-4 flex flex-col items-center">
            <div className="max-w-md w-full glass p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">How well do you know us?</h2>

                {!finished ? (
                    <motion.div
                        key={current}
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="space-y-4"
                    >
                        <p className="text-xl font-medium text-gray-700">{questions[current].q}</p>
                        <div className="grid grid-cols-1 gap-3">
                            {questions[current].options.map((opt, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(i)}
                                    className="p-4 bg-white hover:bg-pink-100 border-2 border-pink-200 rounded-xl transition-colors text-left font-medium text-pink-700"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        <div className="text-sm text-pink-300 text-center">Question {current + 1} of {questions.length}</div>
                    </motion.div>
                ) : (
                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                        <div className="text-6xl mb-4">🎉</div>
                        <h3 className="text-2xl font-bold text-pink-500 mb-2">Quiz Finished!</h3>
                        <p className="text-lg text-pink-400 mb-6">You scored {score} out of {questions.length}!</p>
                        <button onClick={() => { setCurrent(0); setScore(0); setFinished(false); }} className="text-pink-600 underline">Try again?</button>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default Quiz;

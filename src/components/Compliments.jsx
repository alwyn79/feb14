import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const compliments = [
    "You make my world brighter ❤️",
    "Life is better with you ✨",
    "My favorite place is next to you 🥰",
    "You're my forever person 💕",
    "Your smile is my favorite thing in the universe 🌟",
    "I am so proud of everything you are 🏆",
    "You are kind, smart, and beautiful 🌸",
    "Every moment with you is a gift 🎁",
    "You have the most beautiful soul I've ever known 🕊️",
    "My heart beat faster whenever you are near 💓",
    "You are my favorite notification 📱",
    "Coffee is better when I'm drinking it with you ☕",
    "You are the peace in my chaos 🌊",
    "I love the way you laugh 😂",
    "You're the person I never want to stop talking to 🗣️",
    "You are my home 🏠",
    "I'm so lucky to be the one who gets to love you 🍀",
    "You are a master of making me happy 😊",
    "There's nobody else like you in this entire world 🌍",
    "I love you just the way you are 💖"
];

const Compliments = () => {
    const [current, setCurrent] = useState("");

    const generate = () => {
        const random = compliments[Math.floor(Math.random() * compliments.length)];
        setCurrent(random);
    };

    return (
        <section className="py-20 bg-pink-50 flex flex-col items-center px-4">
            <h2 className="text-4xl font-bold text-pink-500 mb-8">Mood Booster</h2>
            <button
                onClick={generate}
                className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full font-bold shadow-md transition-all mb-8"
            >
                Give me a compliment ✨
            </button>

            <div className="h-20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                    {current && (
                        <motion.p
                            key={current}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="text-2xl font-semibold text-center text-pink-700"
                        >
                            {current}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Compliments;

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LoveLetter = () => {
    const [password, setPassword] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [wrong, setWrong] = useState(false);

    const check = (e) => {
        e.preventDefault();
        if (password.toLowerCase().trim() === "forever") {
            setUnlocked(true);
        } else {
            setWrong(true);
            setTimeout(() => setWrong(false), 500);
        }
    };

    return (
        <section className="py-20 bg-pink-50 min-h-[60vh] flex flex-col items-center justify-center px-4">
            <AnimatePresence mode="wait">
                {!unlocked ? (
                    <motion.div
                        key="lock"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="max-w-md w-full glass p-10 rounded-[40px] shadow-2xl text-center"
                    >
                        <div className="text-5xl mb-6">🔐</div>
                        <h2 className="text-2xl font-bold text-pink-600 mb-4">The Final Vault</h2>
                        <p className="text-gray-600 mb-8 font-medium">Enter the secret password to unlock my heartfelt letter</p>
                        <form onSubmit={check} className="space-y-4">
                            <motion.input
                                animate={wrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                                type="password"
                                placeholder="Password (forever)"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 rounded-2xl border-2 border-pink-200 text-center outline-none focus:border-pink-500"
                            />
                            <button className="w-full py-4 bg-pink-500 text-white rounded-2xl font-bold shadow-lg">
                                Unlock Letter ❤️
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.article
                        key="letter"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-2xl w-full bg-white p-12 rounded-[10px] shadow-2xl relative border-l-[12px] border-pink-500"
                    >
                        <div className="absolute top-6 right-8 text-4xl opacity-20 italic font-serif">Feb 14, 2026</div>
                        <h2 className="text-4xl font-bold text-pink-600 romantic-font mb-8">My Dearest,</h2>
                        <div className="space-y-6 text-xl text-gray-700 leading-relaxed font-medium">
                            <p>Writing this for you was the highlights of my day. Ever since you came into my life, every moment has been filled with color and joy.</p>
                            <p>You are my best friend, my soulmate, and my greatest adventure. I love the way you see the world, the way you laugh, and the way you make me feel like the luckiest person in the universe.</p>
                            <p>I promise to stay by your side, to support your dreams, and to love you unconditionally, today, tomorrow, and forever.</p>
                            <p className="pt-8 romantic-font text-3xl text-pink-500">Yours Always, <br /> Your Valentine ❤️</p>
                        </div>
                    </motion.article>
                )}
            </AnimatePresence>
        </section>
    );
};

export default LoveLetter;

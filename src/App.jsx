import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
    "https://images.unsplash.com/photo-1516589174184-c685266e430c?w=600",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=600",
];

const HeartCursor = () => {
    const [trail, setTrail] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (Math.random() > 0.85) {
                const id = Math.random().toString(36).substr(2, 9);
                setTrail(prev => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id }]);
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <>
            {trail.map(heart => (
                <motion.div
                    key={heart.id}
                    initial={{ scale: 0, opacity: 1, y: 0 }}
                    animate={{ scale: 1.5, opacity: 0, y: -50 }}
                    transition={{ duration: 0.8 }}
                    className="fixed pointer-events-none text-red-400 text-xl z-[9999]"
                    style={{ left: heart.x, top: heart.y }}
                >
                    ❤️
                </motion.div>
            ))}
        </>
    );
};

const GiftBox = ({ onOpen }) => {
    const [isOpening, setIsOpening] = useState(false);

    const handleOpen = () => {
        setIsOpening(true);
        setTimeout(onOpen, 1500);
    };

    return (
        <div className="box-container flex flex-col items-center">
            <motion.div
                className={`box ${isOpening ? 'open' : ''}`}
                animate={isOpening ? { rotateY: 360, scale: 2, opacity: 0 } : { rotateY: [0, 10, -10, 0] }}
                transition={isOpening ? { duration: 1.5 } : { repeat: Infinity, duration: 3 }}
                onClick={handleOpen}
            >
                <div className="box-face front">🎁</div>
                <div className="box-face back">❤️</div>
                <div className="box-face right">🎀</div>
                <div className="box-face left">🎀</div>
                <div className="box-face top">💝</div>
                <div className="box-face bottom">📦</div>
            </motion.div>
            <p className="text-white mt-12 text-2xl animate-bounce font-bold">Click to Open Your Surprise!</p>
        </div>
    );
};

export default function App() {
    const [step, setStep] = useState(0); // 0: Home/Box, 1: Adventure
    const [compliment, setCompliment] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const [imageIdx, setImageIdx] = useState(0);
    const [password, setPassword] = useState("");
    const [unlocked, setUnlocked] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);

    const compliments = [
        "You make my world brighter than a summer sky ❤️",
        "Life is an adventure, and I'm glad you're my partner ✨",
        "My favorite place in the universe is right next to you 🥰",
        "You're the melody in my favorite song 💕",
        "Each day with you is a gift I never expected 🎁",
    ];

    return (
        <div className="min-h-screen animate-gradient flex flex-col items-center justify-center p-4 sm:p-8 cursor-default overflow-x-hidden relative">
            <HeartCursor />

            <AnimatePresence mode="wait">
                {step === 0 ? (
                    <motion.div
                        key="box"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.5 }}
                        className="z-10"
                    >
                        <GiftBox onOpen={() => setStep(1)} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="adventure"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-5xl space-y-8 relative z-10"
                    >
                        {/* Header */}
                        <header className="text-center">
                            <h1 className="text-7xl text-white mb-2 shadow-text">Our Love Story</h1>
                            <p className="text-white/80 text-xl font-medium">Unlocked just for you ❤️</p>
                        </header>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Photo Display Card - Polaroid Effect */}
                            <motion.div
                                whileHover={{ y: -10 }}
                                className="glass p-8 rounded-[40px] md:col-span-2 flex flex-col items-center justify-center overflow-hidden"
                            >
                                <div className="relative w-full max-w-md h-[400px] flex items-center justify-center">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={imageIdx}
                                            initial={{ rotate: -20, x: -100, opacity: 0 }}
                                            animate={{ rotate: (Math.random() * 10 - 5), x: 0, opacity: 1 }}
                                            exit={{ rotate: 20, x: 100, opacity: 0 }}
                                            transition={{ type: "spring", stiffness: 100 }}
                                            className="polaroid absolute cursor-pointer"
                                            onClick={() => setImageIdx((imageIdx + 1) % images.length)}
                                        >
                                            <img
                                                src={images[imageIdx]}
                                                alt="Memory"
                                                className="w-[300px] h-[300px] object-cover"
                                            />
                                            <p className="romantic-font text-3xl text-gray-700 mt-4 text-center">
                                                Memory #{imageIdx + 1}
                                            </p>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <p className="text-white/60 mt-4 text-sm animate-pulse">Click the photo to see the next one!</p>
                            </motion.div>

                            {/* Interaction Column */}
                            <div className="space-y-6">
                                {/* Compliment Machine */}
                                <motion.div whileHover={{ scale: 1.02 }} className="glass p-6 rounded-[30px] text-center border-b-4 border-pink-500">
                                    <h2 className="text-2xl font-bold text-white mb-4">Love Generator ✨</h2>
                                    <button
                                        onClick={() => setCompliment(compliments[Math.floor(Math.random() * compliments.length)])}
                                        className="w-full py-3 bg-white text-pink-500 rounded-2xl font-bold shadow-lg hover:shadow-white/20 transition-all active:scale-95"
                                    >
                                        Get a Quote 💘
                                    </button>
                                    {compliment && (
                                        <motion.p
                                            key={compliment}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-white mt-4 font-bold italic"
                                        >
                                            "{compliment}"
                                        </motion.p>
                                    )}
                                </motion.div>

                                {/* Secret Note */}
                                <motion.div whileHover={{ scale: 1.02 }} className="glass p-6 rounded-[30px] text-center">
                                    <h2 className="text-2xl font-bold text-white mb-4">A Secret for You 🤫</h2>
                                    <button
                                        onClick={() => setShowMessage(!showMessage)}
                                        className="w-full py-3 bg-purple-500 text-white rounded-2xl font-bold hover:bg-purple-600 transition-all shadow-md"
                                    >
                                        {showMessage ? "Hide it" : "Reveal it"}
                                    </button>
                                    <AnimatePresence>
                                        {showMessage && (
                                            <motion.p
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                className="text-white mt-4 font-medium"
                                            >
                                                "You're the person I never want to stop talking to." ❤️
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>

                            {/* Password Section - Full Width Bottom */}
                            <motion.div
                                className="md:col-span-3 glass p-10 rounded-[50px] border-2 border-white/20 shadow-2xl overflow-hidden"
                            >
                                {!unlocked ? (
                                    <div className="flex flex-col items-center">
                                        <h2 className="text-4xl font-bold text-white mb-6 shadow-text">The Heart's Vault 🔐</h2>
                                        <p className="text-white/80 mb-6 font-medium text-center">Enter our secret password to see your letter</p>
                                        <motion.form
                                            onSubmit={(e) => {
                                                e.preventDefault();
                                                const val = password.toLowerCase().trim();
                                                if (val === "forever" || val === "1402" || val === "today") {
                                                    setUnlocked(true);
                                                    setWrongPass(false);
                                                } else {
                                                    setWrongPass(true);
                                                    setTimeout(() => setWrongPass(false), 500);
                                                }
                                            }}
                                            animate={wrongPass ? { x: [-10, 10, -10, 10, 0] } : {}}
                                            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
                                        >
                                            <input
                                                type="text"
                                                placeholder="Secret word (forever...)"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="flex-1 bg-white/20 border-2 border-white/40 p-4 rounded-3xl text-white placeholder:text-white/40 outline-none focus:bg-white/40 transition-all text-xl font-bold"
                                                autoFocus
                                            />
                                            <button
                                                type="submit"
                                                className="px-10 py-4 bg-green-500 text-white rounded-3xl font-bold shadow-xl hover:bg-green-600 active:scale-95 transition-all text-xl"
                                            >
                                                Open 🔓
                                            </button>
                                        </motion.form>
                                        {wrongPass && <p className="text-red-300 mt-4 font-bold animate-pulse">Try again, my love! ❤️</p>}
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ type: "spring", duration: 1 }}
                                        className="romantic-font text-center text-4xl md:text-5xl text-white leading-loose max-w-3xl mx-auto"
                                    >
                                        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="mb-6">
                                            💖✨🌹
                                        </motion.div>
                                        My love, you are the missing piece I never knew I was looking for.
                                        Every laugh shared and every moment spent together is a treasure I'll keep forever.
                                        I love you more than words can say. 🥰
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="mt-12 text-white/30 text-xs tracking-widest uppercase py-4">
                Handcrafted with 💖
            </footer>
        </div>
    );
}

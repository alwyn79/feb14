import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const images = [
    "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800",
    "https://images.unsplash.com/photo-1516589174184-c685266e430c?w=800",
    "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800"
];

const Slideshow = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    const next = () => setIndex((prev) => (prev + 1) % images.length);
    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    return (
        <section className="py-20 flex flex-col items-center bg-white px-4">
            <h2 className="text-4xl font-bold text-pink-500 mb-12">Our Beautiful Memories</h2>
            <div className="relative w-full max-w-2xl aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={index}
                        src={images[index]}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>

                <button
                    onClick={prev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                    ⬅️
                </button>
                <button
                    onClick={next}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
                >
                    ➡️
                </button>
            </div>
        </section>
    );
};

export default Slideshow;

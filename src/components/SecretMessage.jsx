import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SecretMessage = () => {
    const [show, setShow] = useState(false);

    return (
        <section className="py-20 flex flex-col items-center bg-white px-4">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShow(!show)}
                className="px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-500 text-white rounded-full font-bold text-xl shadow-lg flex items-center gap-3"
            >
                <span>{show ? "Close Secret" : "Click for a secret message"}</span>
                <span>💌</span>
            </motion.button>

            <AnimatePresence>
                {show && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -20 }}
                        className="mt-12 p-10 glass border-2 border-pink-200 rounded-[40px] max-w-lg text-center shadow-2xl relative"
                    >
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl">🥰</div>
                        <p className="text-2xl font-bold text-pink-600 romantic-font leading-relaxed">
                            "Every single day I wake up, I am grateful for you. You are the best thing that ever happened to me, and I love you more than words can express."
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SecretMessage;

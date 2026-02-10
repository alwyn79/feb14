import { motion } from "framer-motion";

const FloatingElements = () => {
    const elements = [...Array(25)];
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {elements.map((_, i) => (
                <motion.div
                    key={i}
                    initial={{ y: "100vh", opacity: 0 }}
                    animate={{
                        y: "-10vh",
                        opacity: [0, 0.6, 0.6, 0],
                        x: Math.sin(i) * 50,
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        delay: Math.random() * 20,
                        ease: "linear",
                    }}
                    className="absolute text-pink-300"
                    style={{
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 20 + 10}px`,
                    }}
                >
                    {i % 2 === 0 ? "❤️" : "✨"}
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingElements;

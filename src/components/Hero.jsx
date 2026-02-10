import { motion } from "framer-motion";

const Hero = () => {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-pink-100 to-white"
        >
            <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-8xl mb-6"
            >
                ❤️
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-bold text-pink-600 mb-4 romantic-font">
                For My Love
            </h1>
            <p className="text-xl md:text-2xl text-pink-400 max-w-lg italic">
                "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine."
            </p>
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="mt-12 text-pink-300"
            >
                <div className="text-sm uppercase tracking-widest font-bold">Scroll Down</div>
                <div className="text-2xl">↓</div>
            </motion.div>
        </motion.section>
    );
};

export default Hero;

import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] md:h-screen w-full md:w-screen md:shrink-0 flex items-center justify-center overflow-hidden py-32 md:py-0">
      <div className="absolute inset-0 bg-noise z-0"></div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-apple-gray-200/50 backdrop-blur-md text-xs font-medium tracking-wide text-apple-gray-600">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Imran Kočan
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-balance mb-4 text-apple-gray-900"
        >
          QA Engineering
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-balance mb-8 text-apple-gray-500"
        >
          Case Study.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-apple-gray-600 text-balance leading-relaxed"
        >
          A mindset shift from development to Quality Assurance. Documenting 18 critical production bugs found, diagnosed, resolved - All on my own developed production tool.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs font-medium text-apple-gray-400 tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-apple-gray-400/50 to-transparent"></div>
      </motion.div>
    </section>
  );
};

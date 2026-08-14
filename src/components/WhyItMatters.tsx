import { motion } from 'framer-motion';

export const WhyItMatters: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] md:h-screen w-full md:w-screen md:shrink-0 flex items-center justify-center bg-white py-32 md:py-0">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-apple-gray-900 mb-6">
            Why It Matters
          </h2>
          <p className="text-xl md:text-2xl text-apple-gray-500 font-light max-w-3xl mx-auto leading-relaxed text-balance">
            Building features is easy. Making them unbreakable is hard.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-8 rounded-3xl bg-apple-gray-50 border border-apple-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-5 h-5 text-apple-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Reliability</h3>
            <p className="text-apple-gray-500 text-sm leading-relaxed">
              Users expect applications to work flawlessly. A single unexpected crash or frozen UI destroys trust. Anticipating and handling edge cases ensures the app remains resilient under pressure.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-8 rounded-3xl bg-apple-gray-50 border border-apple-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-5 h-5 text-apple-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Data Integrity</h3>
            <p className="text-apple-gray-500 text-sm leading-relaxed">
              When dealing with document automation and offline capabilities, data corruption is catastrophic. Proper state management and serialization prevents catastrophic data loss during long user sessions.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-8 rounded-3xl bg-apple-gray-50 border border-apple-gray-100"
          >
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-6 shadow-sm">
              <svg className="w-5 h-5 text-apple-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-lg font-semibold text-apple-gray-900 mb-3">Cost Prevention</h3>
            <p className="text-apple-gray-500 text-sm leading-relaxed">
              Bugs found in production are exponentially more expensive to fix than those caught in development. A strong QA strategy drastically reduces the overhead of maintaining software.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

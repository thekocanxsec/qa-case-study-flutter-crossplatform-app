import { motion } from 'framer-motion';
import { RefreshCcw } from 'lucide-react';

export const Recognition: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] md:h-screen w-full md:w-screen md:shrink-0 flex items-center justify-center bg-white overflow-hidden py-32 md:py-0">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-24"
        >
          <div className="flex-1">
            <div className="w-16 h-16 rounded-2xl bg-apple-gray-100 flex items-center justify-center mb-8 border border-apple-gray-200">
              <RefreshCcw className="w-8 h-8 text-apple-gray-900" strokeWidth={1.5} />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-apple-gray-900 mb-6 text-balance">
              The Mindset Shift
            </h2>
            
            <div className="space-y-6 text-lg text-apple-gray-600 leading-relaxed">
              <p>
                Writing code is only half the battle. During development, I saw firsthand how seemingly tiny oversights—a forgotten UI constraint, a hardcoded file path, or an untested edge case in a dropdown—could completely break the user experience or corrupt data.
              </p>
              <p>
                A product's true value isn't just in its features, but in its reliability. "Stupid" mistakes in production can be incredibly expensive, and preventing them requires a completely different mindset than just building features.
              </p>
            </div>
          </div>
          
          <div className="flex-1 w-full bg-apple-gray-50 rounded-3xl p-8 md:p-12 border border-apple-gray-200 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity duration-700">
              <RefreshCcw className="w-32 h-32" strokeWidth={1} />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-xl font-medium text-apple-gray-900 mb-2">
                From Developer to QA
              </h3>
              <p className="text-apple-gray-500 mb-8">
                A fundamental change in perspective.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-apple-gray-200 pb-4">
                  <span className="text-sm text-apple-gray-500">Focus Area</span>
                  <span className="text-sm font-medium text-apple-gray-900">Quality Assurance</span>
                </div>
                <div className="flex items-center justify-between border-b border-apple-gray-200 pb-4">
                  <span className="text-sm text-apple-gray-500">Methodology</span>
                  <span className="text-sm font-medium text-apple-gray-900">Break it, Secure it</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-apple-gray-500">Goal</span>
                  <span className="text-sm font-medium text-apple-gray-900">Guarantee Quality</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

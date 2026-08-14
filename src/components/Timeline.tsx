import { motion } from 'framer-motion';
import { FileText, ListChecks, GitMerge } from 'lucide-react';

export const Timeline: React.FC = () => {
  return (
    <section className="relative min-h-[100svh] md:h-screen w-full md:w-screen md:shrink-0 flex items-center justify-center bg-apple-gray-50 overflow-y-auto overflow-x-hidden py-32 md:py-0">
      <div className="container mx-auto px-6 max-w-4xl py-12 md:py-0">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-apple-gray-900 mb-4">
            QA Strategy & Documentation
          </h2>
          <p className="text-lg text-apple-gray-500 max-w-2xl mx-auto">
            A comprehensive approach to ensuring quality and reliability across the entire development lifecycle.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-apple-gray-200 md:-translate-x-1/2"></div>
          
          <div className="space-y-16">
            {/* Step 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div className="md:w-[calc(50%-3rem)] md:text-right mb-4 md:mb-0 pl-12 md:pl-0">
                <h3 className="text-xl font-medium text-apple-gray-900 mb-2">Test Plan</h3>
                <p className="text-apple-gray-500 text-sm">Strategic approach to testing a massive PDF-generating client with offline capabilities.</p>
              </div>
              
              <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-white border border-apple-gray-200 flex items-center justify-center md:-translate-x-1/2 z-10 shadow-sm">
                <FileText className="w-4 h-4 text-apple-gray-900" />
              </div>
              
              <div className="md:w-[calc(50%-3rem)] pl-12 md:pl-0">
                <div className="text-sm font-semibold tracking-wider text-apple-gray-400 uppercase">Phase 01</div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative flex flex-col md:flex-row-reverse items-start md:items-center justify-between"
            >
              <div className="md:w-[calc(50%-3rem)] md:text-left mb-4 md:mb-0 pl-12 md:pl-0">
                <h3 className="text-xl font-medium text-apple-gray-900 mb-2">Test Cases</h3>
                <p className="text-apple-gray-500 text-sm">A curated suite of manual functional, negative, and edge test cases.</p>
              </div>
              
              <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-apple-gray-900 flex items-center justify-center md:-translate-x-1/2 z-10 shadow-sm">
                <ListChecks className="w-4 h-4 text-white" />
              </div>
              
              <div className="md:w-[calc(50%-3rem)] md:text-right pl-12 md:pl-0">
                <div className="text-sm font-semibold tracking-wider text-apple-gray-400 uppercase">Phase 02</div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative flex flex-col md:flex-row items-start md:items-center justify-between"
            >
              <div className="md:w-[calc(50%-3rem)] md:text-right mb-4 md:mb-0 pl-12 md:pl-0">
                <h3 className="text-xl font-medium text-apple-gray-900 mb-2">CI/CD Analysis</h3>
                <p className="text-apple-gray-500 text-sm">A QA review of the GitHub Actions pipeline, proposing automated quality gates like security scans and linting.</p>
              </div>
              
              <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-white border border-apple-gray-200 flex items-center justify-center md:-translate-x-1/2 z-10 shadow-sm">
                <GitMerge className="w-4 h-4 text-apple-gray-900" />
              </div>
              
              <div className="md:w-[calc(50%-3rem)] pl-12 md:pl-0">
                <div className="text-sm font-semibold tracking-wider text-apple-gray-400 uppercase">Phase 03</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

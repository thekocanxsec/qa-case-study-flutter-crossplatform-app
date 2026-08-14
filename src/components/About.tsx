import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';

export const About: React.FC = () => {
  const [showEmailPanel, setShowEmailPanel] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = "imran.kocan@gmail.com";

  const handleRequestAccess = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailPanel(true);
    // Trigger the default mail client
    window.location.href = `mailto:${email}?subject=Repository%20Access%20Request`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[100svh] md:h-screen w-full md:w-screen md:shrink-0 flex flex-col items-center justify-center bg-white border-t md:border-t-0 md:border-l border-apple-gray-200 py-32 md:py-0">
      <div className="container mx-auto px-6 max-w-3xl text-center flex-1 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-apple-gray-900 mb-8">
            Source Code Access
          </h2>

          <div className="space-y-6 text-lg text-apple-gray-600 leading-relaxed mb-12 bg-apple-gray-50 p-8 rounded-3xl border border-apple-gray-200">
            <p className="font-medium text-apple-gray-900">
              Note: The full source code for this application is kept private due to licensing and proprietary reasons.
            </p>
            <p className="text-base">
              However, if you are a recruiter or hiring manager reviewing this portfolio and would like to see the complete codebase to verify the implementations and case studies, please send me an inquiry and I will be happy to grant you temporary access to the full repository!
            </p>
          </div>

          <div className="relative inline-flex flex-col items-center">
            <button
              onClick={handleRequestAccess}
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium text-white bg-apple-gray-900 rounded-full hover:scale-105 transition-transform duration-300 shadow-md gap-2"
            >
              <Mail className="w-4 h-4" />
              Request Repository Access
            </button>

            <AnimatePresence>
              {showEmailPanel && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute top-full mt-6 w-72 bg-white border border-apple-gray-200 shadow-2xl rounded-2xl p-4 z-50 before:content-[''] before:absolute before:-top-2 before:left-1/2 before:-translate-x-1/2 before:w-4 before:h-4 before:bg-white before:border-l before:border-t before:border-apple-gray-200 before:rotate-45"
                >
                  <div className="relative z-10">
                    <p className="text-xs font-semibold text-apple-gray-500 uppercase tracking-wider mb-3">Direct Email</p>
                    <div className="flex items-center justify-between bg-apple-gray-50 rounded-xl p-3 border border-apple-gray-100">
                      <span className="text-sm font-medium text-apple-gray-900 select-all">{email}</span>
                      <button
                        onClick={handleCopy}
                        title="Copy to clipboard"
                        className="p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-apple-gray-200 hover:shadow-sm"
                      >
                        {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4 text-apple-gray-500" />}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <div className="w-full mt-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-apple-gray-500">
          © {new Date().getFullYear()} QA Case Study. Imran Kočan.
        </div>

        <div className="text-xs text-apple-gray-400 max-w-md text-center md:text-right text-balance">
          This site is a personal portfolio showcasing Quality Assurance methodologies and case studies.
        </div>
      </div>
    </section>
  );
};

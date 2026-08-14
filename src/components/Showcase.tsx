import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BugPlay, X } from 'lucide-react';
import { caseStudies } from '../data/caseStudies';
import type { CaseStudy } from '../data/caseStudies';

export const Showcase: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);

  // Helper to determine badge color based on severity
  const getSeverityBadge = (severity: string) => {
    if (severity.includes('Critical')) return 'bg-red-100 text-red-700 border-red-200';
    if (severity.includes('High')) return 'bg-orange-100 text-orange-700 border-orange-200';
    if (severity.includes('Medium')) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-apple-gray-100 text-apple-gray-700 border-apple-gray-200';
  };

  return (
    <section className="relative min-h-[100svh] md:h-screen w-full md:w-screen md:shrink-0 flex items-center justify-center bg-apple-gray-50 overflow-hidden py-32 md:py-0">
      
      {/* Page Navigation Indicator (Far Right) */}
      <div className="hidden xl:flex absolute right-6 md:right-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 text-apple-gray-400 opacity-40 hover:opacity-100 transition-opacity">
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
        </svg>
        <span className="text-[9px] font-mono font-medium uppercase tracking-[0.3em] rotate-90 whitespace-nowrap my-20">
          Scroll for pages
        </span>
        <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      <div className="container mx-auto px-6 max-w-7xl h-full flex flex-col justify-center">
        <div className="text-center mb-10 mt-10 md:mt-0">
          <h2 className="text-sm font-medium tracking-widest text-apple-gray-500 uppercase mb-4">
            The Evidence
          </h2>
          <p className="text-3xl md:text-5xl font-semibold tracking-tight text-apple-gray-900">
            18 Production Case Studies
          </p>
        </div>

        <div className="relative w-full">
          {/* Vertical Scroll Indicator */}
          <div className="hidden lg:flex absolute top-1/2 -right-10 -translate-y-1/2 flex-col items-center gap-2 text-apple-gray-400 opacity-60">
            <div className="w-[1px] h-8 bg-apple-gray-300"></div>
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] rotate-90 whitespace-nowrap my-10">
              Scroll Cases
            </span>
            <div className="w-[1px] h-8 bg-apple-gray-300"></div>
            <svg className="w-4 h-4 mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>

          {/* Scrollable Grid */}
          <div className="stop-horizontal-scroll w-full h-[65vh] overflow-y-auto rounded-3xl p-2 pb-16 scrollbar-hide md:scrollbar-default pr-0 lg:pr-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {caseStudies.map((study) => (
              <motion.div
                key={study.id}
                whileHover={{ y: -4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCase(study)}
                className="bg-white border border-apple-gray-200 rounded-2xl p-6 cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-xs font-mono font-bold text-apple-gray-400">
                      CASE {study.id}
                    </span>
                    <span className={`text-[10px] uppercase font-bold px-2 py-1 rounded-full border ${getSeverityBadge(study.severity)}`}>
                      {study.severity.split(' ')[1] || 'Medium'}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-apple-gray-900 mb-2 leading-snug group-hover:text-blue-600 transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-apple-gray-500 line-clamp-3">
                    {study.problem}
                  </p>
                </div>
                
                <div className="mt-6 flex items-center gap-2 text-xs font-medium text-apple-gray-400">
                  <BugPlay className="w-4 h-4" />
                  <span>View Details</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>

      {/* Modal Overlay */}
      {typeof window !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedCase && (
            <div className="stop-horizontal-scroll">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCase(null)}
                className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 100, scale: 0.95 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[90vw] md:max-w-4xl md:h-[85vh] bg-white rounded-[2rem] shadow-2xl z-[101] overflow-hidden flex flex-col"
              >
                {/* Modal Header */}
                <div className="flex items-start justify-between p-6 md:p-8 border-b border-apple-gray-100 bg-apple-gray-50/50 shrink-0">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-mono font-bold text-apple-gray-400">CASE {selectedCase.id}</span>
                      <span className={`text-xs uppercase font-bold px-3 py-1 rounded-full border ${getSeverityBadge(selectedCase.severity)}`}>
                        {selectedCase.severity}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-apple-gray-900">{selectedCase.title}</h2>
                    <p className="text-sm text-apple-gray-500 mt-2 font-medium">{selectedCase.category}</p>
                  </div>
                  
                  <button 
                    onClick={() => setSelectedCase(null)}
                    className="p-2 rounded-full bg-apple-gray-100 hover:bg-apple-gray-200 text-apple-gray-600 transition-colors shrink-0"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
                  
                  <div>
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🐛</span> The Problem
                    </h3>
                    <p className="text-apple-gray-600 leading-relaxed text-balance">
                      {selectedCase.problem}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🔬</span> Root Cause Analysis (RCA)
                    </h3>
                    <div className="bg-apple-gray-50 p-6 rounded-2xl border border-apple-gray-100">
                      <p className="text-apple-gray-600 leading-relaxed whitespace-pre-wrap">
                        {selectedCase.rca}
                      </p>
                    </div>
                  </div>

                  {selectedCase.codeProof && (
                    <div>
                      <h3 className="text-lg font-semibold text-apple-gray-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">💻</span> Code Proof (The Fix)
                      </h3>
                      <div className="bg-[#1e1e1e] text-apple-gray-100 p-6 rounded-2xl overflow-x-auto text-sm font-mono leading-relaxed border border-apple-gray-800 shadow-inner">
                        <pre>
                          <code>
                            {selectedCase.codeProof.split('\n').map((line, i) => {
                              let color = 'text-gray-300';
                              if (line.startsWith('+')) color = 'text-green-400 bg-green-900/20 block';
                              if (line.startsWith('-')) color = 'text-red-400 bg-red-900/20 block';
                              if (line.startsWith('@@')) color = 'text-blue-400';
                              
                              return (
                                <span key={i} className={color}>
                                  {line}
                                  {'\n'}
                                </span>
                              );
                            })}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-apple-gray-900 mb-3 flex items-center gap-2">
                      <span className="text-xl">🎯</span> QA Takeaway
                    </h3>
                    <div className="bg-blue-50/50 border border-blue-100 p-6 rounded-2xl">
                      <p className="text-blue-900 leading-relaxed">
                        {/* Regex to render bold markdown as actual bold tags */}
                        <span dangerouslySetInnerHTML={{ __html: selectedCase.takeaway.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                      </p>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

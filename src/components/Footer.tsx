
export const Footer: React.FC = () => { return ( <footer className="py-12 bg-apple-gray-50 border-t border-apple-gray-200 "> <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6"> <div className="text-sm text-apple-gray-500 "> © {new Date().getFullYear()} Security Portfolio. All rights reserved. </div> <div className="text-xs text-apple-gray-400 max-w-md text-center md:text-right text-balance"> This site is a personal portfolio and is not affiliated with, maintained, authorized, endorsed, or sponsored by Apple Inc. </div> </div> </footer> );
};

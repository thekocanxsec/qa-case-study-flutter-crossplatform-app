import { HorizontalScroll } from './components/HorizontalScroll';
import { Hero } from './components/Hero';
import { Recognition } from './components/Recognition';
import { Timeline } from './components/Timeline';
import { WhyItMatters } from './components/WhyItMatters';
import { Showcase } from './components/Showcase';
import { About } from './components/About'; function App() {
  return (
    <div className="bg-apple-gray-50 font-sans text-apple-gray-900 selection:bg-apple-gray-900 selection:text-white">
      <HorizontalScroll>
        <Hero />
        <Recognition />
        <Showcase />
        <Timeline />
        <WhyItMatters />
        <About />
      </HorizontalScroll>
    </div>
  );
}

export default App;

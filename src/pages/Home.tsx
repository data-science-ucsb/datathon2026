import React from 'react';
import Hero from '../components/Hero';
import FAQ from '../components/FAQ';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatItem = ({ end, suffix = "", prefix = "", label, colorClass }: { end: number, suffix?: string, prefix?: string, label: string, colorClass: string }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div ref={ref}>
      <div className={`text-4xl font-extrabold ${colorClass} mb-2`}>
        {inView ? <CountUp end={end} duration={2.5} prefix={prefix} suffix={suffix} /> : (prefix + "0" + suffix)}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <main>
      <Hero />
      
      {/* Statistics Section */}
      <section className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem end={5} prefix="$" suffix="k+" label="Prizes" colorClass="text-blue-500" />
          <StatItem end={200} suffix="+" label="Hackers" colorClass="text-purple-500" />
          <StatItem end={36} suffix="h" label="Building" colorClass="text-pink-500" />
          <StatItem end={10} suffix="+" label="Sponsors" colorClass="text-blue-400" />
        </div>
      </section>

      <FAQ />
    </main>
  );
};

export default Home;
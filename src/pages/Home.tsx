import React from 'react';
import Main from '../components/Main';
import FAQ from '../components/FAQ';
import Gallery from '../components/Gallery';
import Sponsors from '../components/Sponsors';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const StatItem = ({ end, suffix = "", prefix = "", label, colorClass, delay }: { end: number, suffix?: string, prefix?: string, label: string, colorClass: string, delay: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      <div className={`text-4xl font-extrabold ${colorClass} mb-2`}>
        {inView ? <CountUp end={end} duration={7.5} prefix={prefix} suffix={suffix} /> : (prefix + "0" + suffix)}
      </div>
      <div className="text-gray-400 text-sm uppercase tracking-wider">{label}</div>
    </motion.div>
  );
};

const Home: React.FC = () => {
  return (
    <main>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Main />
      </motion.div>

      {/* Statistics Section */}
      <section className="relative py-20 bg-white/5 backdrop-blur-sm overflow-hidden">
        {/* Top Glowing Boundary */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-purple-600/0 origin-center"
        ></motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 blur-sm origin-center"
        ></motion.div>

        {/* Bottom Glowing Boundary */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-purple-600/0 origin-center"
        ></motion.div>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 blur-sm origin-center"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatItem end={5} prefix="$" suffix="k+" label="Prizes" colorClass="text-blue-500" delay={0.2} />
          <StatItem end={200} suffix="+" label="Hackers" colorClass="text-purple-500" delay={0.3} />
          <StatItem end={36} suffix="h" label="Building" colorClass="text-pink-500" delay={0.4} />
          <StatItem end={10} suffix="+" label="Sponsors" colorClass="text-blue-400" delay={0.5} />
        </div>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
      >
        <Gallery />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
      >
        <Sponsors />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.4 }}
      >
        <FAQ />
      </motion.div>
    </main>
  );
};

export default Home;
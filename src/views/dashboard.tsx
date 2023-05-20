import { Graph } from '@/components/graph';
import { Navbar } from '@/components/navbar';
import { SessionContext } from '@/contexts';
import { useContext } from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const DashboardView = (): JSX.Element => {
  const { session } = useContext(SessionContext);

  return (
    <>
      <div className="h-screen gap-4 bg-[url(./mesh-548.avif)] bg-cover flex items-center justify-center rounded-none">
        <Navbar />
        <motion.ul
          className="w-[1200px] mt-8 bg-white/20 grid grid-cols-3 gap-4 p-4 rounded-3xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {session?.stats.map((stat, index) => {
            if (index === 0) {
              return (
                <motion.li
                  key={index}
                  className="bg-white/80 rounded-3xl col-span-2"
                  variants={item}
                >
                  <Graph key={stat._id} stat={stat} isDouble></Graph>
                </motion.li>
              );
            }

            return (
              <motion.li
                key={index}
                className="bg-white/80 rounded-3xl"
                variants={item}
              >
                <Graph key={stat._id} stat={stat}></Graph>
              </motion.li>
            );
          })}
          {session?.stats.map((stat, index) => {
            if (index === 1) {
              return (
                <motion.li
                  key={index}
                  className="bg-white/80 rounded-3xl col-span-2"
                  variants={item}
                >
                  <Graph key={stat._id} stat={stat} isDouble></Graph>
                </motion.li>
              );
            }

            return (
              <motion.li
                key={index}
                className="bg-white/80 rounded-3xl"
                variants={item}
              >
                <Graph key={stat._id} stat={stat}></Graph>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </>
  );
};

export default DashboardView;

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FireIcon, GlobeAltIcon, MusicalNoteIcon } from "@heroicons/react/24/outline";

const cards = [
  {
    name: (
      <div className="flex items-center">
         <GlobeAltIcon className="mr-1 h-5 w-5" />
        Community Driven
        <GlobeAltIcon className="ml-1 h-5 w-5" />
       
      </div>
    ),
    description:
      "Etherwav is a community driven music platform. Artists can upload their music and anyone can listen to it. Fans can also tip the artists with a built-in system.",
  },
  {
    name: (
      <div className="flex items-center">
         <FireIcon className="mr-1 h-5 w-5" />
        Heat Leaderboard
        <FireIcon className="ml-1 h-5 w-5" />
       
      </div>
    ),
    description:
      "The heat leaderboard is a way to show the most popular artists on Etherwav. Songs with more heat get pushed to the top of the queue, meaning users will see these songs first. The leaderboard is updated every second, just refresh!",
  },
  {
    name: (
      <div className="flex items-center">
        <MusicalNoteIcon className="mr-1 h-5 w-5" />
        Find New Music
        <MusicalNoteIcon className="ml-1 h-5 w-5" />
      </div>
    ),
    description:
      "Etherwav is a great place to find new music. You can search for artists, songs, or genres. If you're looking for something specific, you can also filter by genre.",
  },
];
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.5 } },
};

export default function HeaderSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div className="relative isolate overflow-hidden bg-[#eaeaea] dark:bg-[#111] border-t border-black dark:border-[#333] bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md dark:backdrop-blur-md py-24 sm:py-32 z-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
          {cards.map((card, index) => (
            <div
              key={card.name}
              className="flex gap-x-4 rounded-xl  bg-[#fafafa] dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-6 ring-1 ring-inset ring-white/10 dark:ring-black/10"
              ref={ref}
            >
              <AnimatePresence>
                <motion.div
                  className="text-base leading-7"
                  variants={fadeIn}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  {inView ? (
                    <>
                      <h3 className="font-semibold text-black dark:text-white">
                        {card.name}
                      </h3>
                      <p className="mt-2 text-black dark:text-white">
                        {card.description}
                      </p>
                    </>
                  ) : (
                    <div className="animate-pulse">
                      <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-400 rounded w-5/6 mt-2"></div>
                      <div className="h-4 bg-gray-400 rounded w-3/4 mt-2"></div>
                      <div className="h-4 bg-gray-400 rounded w-5/6 mt-2"></div>
                      <div className="h-4 bg-gray-400 rounded w-3/4 mt-2"></div>
                      <div className="h-4 bg-gray-400 rounded w-5/6 mt-2"></div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

import { Fragment, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Web3 from "web3";
import Radio from "@/contracts/Radio.json";
import NFT from "@/contracts/NFT.json";
import axios from "axios";
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import ParallaxText from "@/components/parallax-text";
import Notification from "@/components/ui/notification";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  PlayIcon,
  ForwardIcon,
  BackwardIcon,
  PauseIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { FireIcon } from "@heroicons/react/20/solid";
import InfoModal from "@/components/ui/info-modal";
import HeatSlideover from "@/components/ui/heat-slideover";
import ProgressBar from "@/components/ui/song-progress";
import QueueSkeleton from "@/components/ui/queue-skeleton";
import LeaderboardSkeleton from "@/components/ui/leaderboard-skeleton";
import AudioPlayerSkeleton from "@/components/ui/audio-player-skeleton";
import RecentSkeleton from "@/components/ui/recent-skeleton";
import CommandPalette from "@/components/ui/command-palette";

const people = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Floyd Miles",
    handle: "floydmiles",
    imageUrl:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Emily Selman",
    handle: "emilyselman",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Kristin Watson",
    handle: "kristinwatson",
    imageUrl:
      "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];
const navigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: true },
  { name: "Team", href: "#", icon: UsersIcon, current: false },
  { name: "Projects", href: "#", icon: FolderIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Documents", href: "#", icon: DocumentDuplicateIcon, current: false },
  { name: "Reports", href: "#", icon: ChartPieIcon, current: false },
];
const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] };

export default function Listen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);
  const [heatOpen, setHeatOpen] = useState(false);

  const [nfts, setNfts] = useState([]);
  const [genreFilteredNfts, setGenreFilteredNfts] = useState([]);

  const [genreActive, setGenreActive] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [heatCount, setHeatCount] = useState(0);
  const [topThreeNfts, setTopThreeNfts] = useState([]);
  const [mostRecentNfts, setMostRecentNfts] = useState([]);
  const [direction, setDirection] = useState("right");

  const [songsLoaded, setSongsLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const [show, setShow] = useState(false);
  const [notificationText, setNotificationText] = useState("");
  const [notificationDescription, setNotificationDescription] = useState("");

  const audioRef = useRef(null);

  useEffect(() => {
    loadSongs();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      // Set initial progress to 0
      setProgress(0);

      // Update duration when the song changes
      const updateDuration = () => {
        if (audioRef.current) {
          setDuration(audioRef.current.duration);
        }
      };

      // Set the duration once the song is loaded
      audioRef.current.addEventListener("loadedmetadata", updateDuration);

      // Clean up the listener when the component unmounts
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener(
            "loadedmetadata",
            updateDuration
          );
        }
      };
    }
  }, [currentIndex]);

  // use effect for meta key and k to open command palette
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && event.key === "k") {
        setCommandOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  async function loadSongs() {
    console.log("Loading songs...");
    const web3 = new Web3(window.ethereum);

    const networkId = await web3.eth.net.getId();

    // Get all listed NFTs
    const radioContract = new web3.eth.Contract(
      Radio.abi,
      Radio.networks[networkId].address
    );
    const listings = await radioContract.methods.getListedNfts().call();
    // Iterate over the listed NFTs and retrieve their metadata
    const nfts = await Promise.all(
      listings.map(async (i) => {
        try {
          const NFTContract = new web3.eth.Contract(
            NFT.abi,
            NFT.networks[networkId].address
          );
          const tokenURI = await NFTContract.methods.tokenURI(i.tokenId).call();
          const meta = await axios.get(tokenURI);
          const nft = {
            tokenId: i.tokenId,
            seller: i.seller,
            owner: i.buyer,
            image: meta.data.image,
            title: meta.data.title,
            coverImage: meta.data.coverImage,
            heatCount: i.heatCount,
            genre: meta.data.genre,
          };
          return nft;
        } catch (err) {
          console.log(err);
          return null;
        }
      })
    );

    // set nfts in order of heatCount
    const sortedNfts = nfts
      .filter((nft) => nft !== null)
      .sort((a, b) => b.heatCount - a.heatCount);
    const topThreeNfts = sortedNfts.slice(0, 3);

    const mostRecentNfts = nfts
      .filter((nft) => nft !== null)
      .sort((a, b) => {
        return b.tokenId - a.tokenId;
      })
      .slice(0, 5);

    setMostRecentNfts(mostRecentNfts);

    setTopThreeNfts(topThreeNfts);

    setNfts(sortedNfts);

    setSongsLoaded(true);
  }

  function filterSongsByGenre(genre) {
    const filteredNfts = nfts.filter((nft) => nft.genre === genre);
    setGenreFilteredNfts(filteredNfts);
    setNfts(filteredNfts);
    setCurrentIndex(0);

    // setGenreActive(genre);
    // set genre active to true and the genre name
    setGenreActive({ active: true, name: genre });

    // notifcation
    setShow(true);
    setNotificationText("Genre changed!");
    setNotificationDescription("You are now listening to " + genre + " music.");
  }

  async function handleGiveHeat() {
    // Get an instance of the Radio contract
    try {
      const web3 = new Web3(window.ethereum);
      const networkId = await web3.eth.net.getId();
      const radioContract = new web3.eth.Contract(
        Radio.abi,
        Radio.networks[networkId].address
      );

      // Give heat to the current NFT
      setLoading(true);
      radioContract.methods
        .giveHeat(nfts[currentIndex].tokenId, heatCount)
        .send({
          from: window.ethereum.selectedAddress,

          value: web3.utils.toWei(heatCount.toString(), "ether"),
        })
        .on("receipt", function () {
          console.log("listed");

          setLoading(false);
          setShow(true);
          setNotificationText("Heat given!");
          setNotificationDescription(
            "You have given " +
              heatCount +
              " heat to " +
              nfts[currentIndex].title
          );
        });
    } catch (err) {
      console.log(err);
    }
  }

  function handleNext() {
    setDirection("right");
    setCurrentIndex((currentIndex + 1) % nfts.length);
    setIsPlaying(true);
  }
  function handlePrevious() {
    setDirection("left");
    setCurrentIndex(currentIndex === 0 ? nfts.length - 1 : currentIndex - 1);
    setIsPlaying(true);
  }

  return (
    <div className="h-screen  bg-white dark:bg-black">
      <Notification
        show={show}
        setShow={setShow}
        notificationText={notificationText}
        notificationDescription={notificationDescription}
        className="z-50"
      />
      <CommandPalette
        commandOpen={commandOpen}
        setCommandOpen={setCommandOpen}
        nfts={nfts}
      />
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className={classNames(
                                      item.current
                                        ? "text-indigo-600"
                                        : "text-gray-400 group-hover:text-indigo-600",
                                      "h-6 w-6 shrink-0"
                                    )}
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">
                            Your teams
                          </div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? "bg-gray-50 text-indigo-600"
                                      : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <span
                                    className={classNames(
                                      team.current
                                        ? "text-indigo-600 border-indigo-600"
                                        : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                                    )}
                                  >
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0  lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 dark:border-[#333] bg-white dark:bg-black px-6">
            <div className="flex h-16 shrink-0 items-center z-50">
              <Link href="/">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <div>
                <div className="relative mt-4 flex items-center">
                  <button
                    type="button"
                    name="search"
                    id="search"
                    onClick={() => setCommandOpen(true)}
                    className="block w-full text-left rounded-md border-0 py-1.5 pr-14 bg-white dark:bg-black hover:bg-gray-200 dark:hover:bg-[#111] transition duration-150 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#333] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <span className="flex items-center pl-3 pointer-events-none">
                      Search songs
                    </span>
                  </button>

                  <div
                    onClick={() => setCommandOpen(true)}
                    className="absolute cursor-pointer inset-y-0 right-0 flex py-1.5 pr-1.5"
                  >
                    <kbd className="inline-flex items-center rounded border border-gray-200 dark:border-[#333] px-1 font-sans text-xs text-gray-400">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>
              <h2 className="mt-2 text-xl font-semibold text-gray-500 dark:text-gray-400">
                Queue
              </h2>
              <div>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-[#333]"
                >
                  {nfts.length > 0 ? (
                    nfts.map((nft, i) => (
                      <li
                        key={i}
                        onClick={() => {
                          setCurrentIndex(i);
                          setIsPlaying(true);
                        }}
                        className={`py-4 hover:bg-gray-200 dark:hover:bg-[#111] transition duration-150 rounded-md p-6 cursor-pointer ${
                          currentIndex === i ? "bg-gray-200 dark:bg-[#111]" : ""
                        }`}
                      >
                        <div className="flex space-x-3">
                          <Image
                            className="h-10 w-10 rounded-md"
                            src={nft.coverImage}
                            alt=""
                            width={40}
                            height={40}
                          />
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <h3 className="text-sm font-medium">
                                {nft.title}
                              </h3>
                              <div className="flex items-center text-sm text-gray-500">
                                {/* duration */}
                                {nft.heatCount}
                                <FireIcon className="h-4" />
                              </div>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-[#999]">
                              {nft.seller.slice(0, 5)}...{nft.seller.slice(-4)}
                            </p>
                          </div>
                        </div>
                      </li>
                    ))
                  ) : (
                    <QueueSkeleton />
                  )}
                </ul>
              </div>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white dark:bg-[#111] px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5  lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 ">
            Dashboard
          </div>
          <a href="#">
            <span className="sr-only">Your profile</span>
            <img
              className="h-8 w-8 rounded-full bg-gray-50"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </a>
        </div>

        <main className="lg:pl-72">
          <div className="xl:pr-96">
            {songsLoaded ? (
              <div
                key={currentIndex}
                className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6"
              >
                <div className="flex flex-col">
                  <div className="flex justify-center">
                    {/* <img
                    className="h-64 w-64 max-w-full"
                    src="https://tailwindui.com/img/ecommerce-images/home-page-03-favorite-01.jpg"
                  /> */}
                    <motion.div
                      key={nfts[currentIndex].tokenId}
                      initial={direction === "right" ? { x: -100 } : { x: 100 }}
                      animate={{ x: 0 }}
                      exit={direction === "right" ? { x: 100 } : { x: -100 }}
                      transition={transition}
                    >
                      <Image
                        src={nfts[currentIndex].coverImage}
                        width={400}
                        height={400}
                        alt="cover"
                        className="rounded-none min-w-96 min-h-96 max-w-96 max-h-96"
                        priority
                      />
                    </motion.div>
                  </div>

                  <div className="mt-12">
                    <div className="max-w-sm mx-auto flex justify-between items-center">
                      <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-[#111]  transition duration-150 border border-gray-200 dark:border-[#333] px-2.5 py-0.5 text-sm font-medium">
                        {nfts[currentIndex].heatCount}{" "}
                        <FireIcon className="h-4" />
                      </span>

                      {genreActive ? (
                        <span className="inline-flex items-center rounded-md bg-gray-100 dark:bg-[#111]  transition duration-150 border border-gray-200 dark:border-[#333] py-0.5 pl-2.5 pr-1 text-sm font-medium ">
                          {nfts[currentIndex].genre}
                          <button
                            type="button"
                            onClick={() => {
                              setGenreActive(false);
                              setGenreFilteredNfts([]);
                            }}
                            className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-[#333] hover:text-black/80 dark:hover:text-white/80 focus:bg-indigo-500 focus:text-white focus:outline-none"
                          >
                            <span className="sr-only">Remove large option</span>
                            <svg
                              className="h-2 w-2"
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 8 8"
                            >
                              <path
                                strokeLinecap="round"
                                strokeWidth="1.5"
                                d="M1 1l6 6m0-6L1 7"
                              />
                            </svg>
                          </button>
                        </span>
                      ) : (
                        <span
                          onClick={() =>
                            filterSongsByGenre(nfts[currentIndex].genre)
                          }
                          className="inline-flex items-center rounded-md bg-gray-100 dark:bg-[#111] hover:bg-gray-200 dark:hover:bg-[#333] transition duration-150 border border-gray-200 dark:border-[#333] px-2.5 py-0.5 text-sm font-medium cursor-pointer"
                        >
                          {nfts[currentIndex].genre}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-center mt-12">
                    <div className="flex justify-between space-x-2">
                      <h1 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                        {!isNaN(audioRef.current?.currentTime)
                          ? `${Math.floor(audioRef.current.currentTime / 60)}:${
                              Math.floor(audioRef.current.currentTime % 60) < 10
                                ? `0${Math.floor(
                                    audioRef.current.currentTime % 60
                                  )}`
                                : Math.floor(audioRef.current.currentTime % 60)
                            }`
                          : "0:00"}
                      </h1>

                      <ProgressBar
                        progress={progress}
                        setProgress={setProgress}
                      />

                      <h1 className="text-md font-semibold text-gray-900 dark:text-gray-100">
                        {!isNaN(duration) && audioRef.current?.currentTime
                          ? `${Math.floor(
                              (duration - audioRef.current.currentTime) / 60
                            )}:${
                              Math.floor(
                                (duration - audioRef.current.currentTime) % 60
                              ) < 10
                                ? `0${Math.floor(
                                    (duration - audioRef.current.currentTime) %
                                      60
                                  )}`
                                : Math.floor(
                                    (duration - audioRef.current.currentTime) %
                                      60
                                  )
                            }`
                          : "0:00"}
                      </h1>
                    </div>
                  </div>

                  <div className="mt-12">
                    <div className="max-w-sm mx-auto flex justify-between items-center">
                      <button
                        className="bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333] px-3.5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#111]/80"
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                      >
                        <BackwardIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <button
                        className="bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333]  px-3.5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#111]/80"
                        onClick={() => {
                          if (isPlaying) {
                            audioRef.current.pause();
                            setIsPlaying(false);
                          } else {
                            audioRef.current.play();
                            audioRef.current.pause();
                            audioRef.current.play();
                            setIsPlaying(true);
                          }
                        }}
                      >
                        {isPlaying ? (
                          <PauseIcon className="h-6 w-6" aria-hidden="true" />
                        ) : (
                          <PlayIcon className="h-6 w-6" aria-hidden="true" />
                        )}
                      </button>

                      <audio
                        src={nfts[currentIndex].image}
                        ref={audioRef}
                        onEnded={(e) => {
                          if (currentIndex < nfts.length - 1) {
                            setCurrentIndex(currentIndex + 1);

                            setProgress(0);

                            setDuration(e.target.duration);
                          }
                        }}
                        onPlay={() => {
                          // Set the initial duration when the song starts playing
                          setDuration(audioRef.current.duration);

                          // Calculate the progress every second considering the duration
                          const interval = setInterval(() => {
                            // Check if the song is still playing
                            if (!audioRef.current.paused) {
                              // Round the progress value to 2 decimal places
                              const calculatedProgress = parseFloat(
                                (
                                  (audioRef.current.currentTime / duration) *
                                  100
                                ).toFixed(2)
                              );
                              setProgress(calculatedProgress);
                            }
                          }, 500);

                          return () => clearInterval(interval);
                        }}
                        className="h-12 w-full hidden"
                        controls
                        // autoplay after the first song
                        autoPlay={currentIndex !== 0}
                      />

                      <button
                        className="bg-gray-100 dark:bg-[#111] border border-gray-200 dark:border-[#333]  px-3.5 py-2.5 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-[#111]/80"
                        onClick={handleNext}
                        disabled={currentIndex === nfts.length - 1}
                      >
                        <ForwardIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-12">
                    <div className="max-w-sm mx-auto flex justify-between items-center">
                      <button
                        type="button"
                        className="rounded-md bg-transparent px-3.5 py-2.5 text-sm font-semibold text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#333] hover:bg-gray-200 dark:hover:bg-[#333] transition duration-200"
                        onClick={() => setOpen(true)}
                      >
                        More Info
                      </button>
                      <InfoModal
                        open={open}
                        setOpen={setOpen}
                        infoArtist={nfts[currentIndex].seller}
                        nft={nfts[currentIndex]}
                      />

                      <button
                        type="button"
                        className="inline-flex items-center gap-x-2 rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => setHeatOpen(true)}
                      >
                        Give Heat
                        <FireIcon
                          className="-mr-0.5 h-5 w-5"
                          aria-hidden="true"
                        />
                      </button>
                      <HeatSlideover
                        heatOpen={heatOpen}
                        setHeatOpen={setHeatOpen}
                        nft={nfts[currentIndex]}
                        handleGiveHeat={handleGiveHeat}
                        heatCount={heatCount}
                        setHeatCount={setHeatCount}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <ParallaxText baseVelocity={-0.5}>
                    <Link
                      href="/[slug]"
                      as={`/${nfts[currentIndex].seller}`}
                      className="text-center link link-hover"
                    >
                      {`${nfts[currentIndex].title} ${nfts[currentIndex].title} ${nfts[currentIndex].title}`}
                    </Link>
                  </ParallaxText>

                  <ParallaxText baseVelocity={0.5}>
                    <Link
                      href="/[slug]"
                      as={`/${nfts[currentIndex].seller}`}
                      className="text-center link link-hover"
                    >
                      {`${nfts[currentIndex].seller.slice(0, 5)}...${nfts[
                        currentIndex
                      ].seller.slice(-4)} 
                    
                    ${nfts[currentIndex].seller.slice(0, 5)}...${nfts[
                        currentIndex
                      ].seller.slice(-4)}`}
                    </Link>
                  </ParallaxText>
                </div>
              </div>
            ) : (
              <AudioPlayerSkeleton />
            )}
          </div>
        </main>

        <aside className="fixed inset-y-0 right-0 hidden w-96 border-l border-gray-200 dark:border-[#333] px-4 py-6 sm:px-6 lg:px-8 xl:block">
          {/* Secondary column (hidden on smaller screens) */}
          <div>
            <div className="mt-6 flow-root">
              <h2 className="mt-12 text-xl font-semibold text-gray-500 dark:text-gray-400">
                Heat Leaderboard
              </h2>
              <ul
                role="list"
                className=" divide-y divide-gray-200 dark:divide-[#333]"
              >
                {topThreeNfts.length > 0 ? (
                  topThreeNfts.map((nft, index) => (
                    <li
                      key={index}
                      className="py-4 rounded-md hover:bg-gray-200 dark:hover:bg-[#333] transition duration-150 p-6 cursor-pointer"
                      onClick={() => setCurrentIndex(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-md"
                            src={nft.coverImage}
                            alt=""
                          />
                        </div>
                        <div className="flex-shrink-0">
                          {index === 0 ? (
                            <h1 className="flex text-lg font-semibold text-gray-900 dark:text-gray-100">
                              🥇
                            </h1>
                          ) : index === 1 ? (
                            <h1 className="flex text-lg font-semibold text-gray-900 dark:text-gray-100">
                              🥈
                            </h1>
                          ) : (
                            <h1 className="flex text-lg font-semibold text-gray-900 dark:text-gray-100">
                              🥉
                            </h1>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium ">
                            {nft.title}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-[#999]">
                            {nft.seller.slice(0, 5)}...{nft.seller.slice(-4)}
                          </p>
                        </div>
                        <div>
                          <h1 className="flex text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {nft.heatCount} <FireIcon className="h-5 w-5" />
                          </h1>
                          {/* if 1st, gold medal. if 2nd, silver meda */}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <LeaderboardSkeleton />
                )}
              </ul>
            </div>

            <div className="mt-6 flow-root">
              <h2 className="mt-12 text-xl font-semibold text-gray-500 dark:text-gray-400">
                Most Recent Songs
              </h2>
              <ul
                role="list"
                className=" divide-y divide-gray-200 dark:divide-[#333]"
              >
                {mostRecentNfts.length > 0 ? (
                  mostRecentNfts.map((nft, index) => (
                    <li
                      key={index}
                      className="py-4 rounded-md hover:bg-gray-200 dark:hover:bg-[#333] transition duration-150 p-6 cursor-pointer"
                      onClick={() => setCurrentIndex(index)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            className="h-8 w-8 rounded-md"
                            src={nft.coverImage}
                            alt=""
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium ">
                            {nft.title}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-[#999]">
                            {nft.seller.slice(0, 5)}...{nft.seller.slice(-4)}
                          </p>
                        </div>
                        <div>
                          <h1 className="flex text-sm font-semibold text-gray-900 dark:text-gray-100">
                            {nft.heatCount} <FireIcon className="h-5 w-5" />
                          </h1>
                          {/* if 1st, gold medal. if 2nd, silver meda */}
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <RecentSkeleton />
                )}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

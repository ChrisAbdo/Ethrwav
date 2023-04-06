import { useTheme } from 'next-themes'
import {
  GlobeAltIcon,
  HeartIcon,
  MusicalNoteIcon,
} from "@heroicons/react/24/outline";

export default function ContentSection() {
  const { theme, setTheme } = useTheme()
  return (
    <div className="relative isolate overflow-hidden bg-[#eaeaea] dark:bg-[#111]  px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-orange-600">
                Etherwav
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
                The best community driven music platform
              </h1>
              <p className="mt-6 text-xl leading-8 ">
                For creators, by creators. Etherwav is a great place to find new
                music and earn if you are an artist. You can search for artists,
                songs, or genres.
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          {/* if theme is light mode show this */}
          {theme === 'light' ? (
          <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            // src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            src="/lightmode.jpeg"
            alt=""
          />
          ) : (
            <img
            className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
            // src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
            src="/darkmode.jpeg"
            alt=""
          />
          )}
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7  lg:max-w-lg">
              <p>
                Welcome to Etherwav, the revolutionary community-driven music
                platform built on blockchain technology. Our mission is to
                empower artists by offering them a transparent and secure
                environment to showcase their talent, earn fairly from their
                work, and connect with their fans. For music enthusiasts,
                Etherwav is the ultimate destination to discover fresh,
                innovative sounds from a diverse array of talented artists
                across the globe. Experience the future of music with Etherwav -
                where creativity, collaboration, and blockchain converge to
                redefine the musical landscape.
              </p>
              <ul role="list" className="mt-8 space-y-8 ">
                <li className="flex gap-x-3">
                  <MusicalNoteIcon
                    className="mt-1 h-5 w-5 flex-none text-orange-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold ">For creators:</strong>{" "}
                    Upload your song and let the listeners help push your song
                    to the top of the queue!
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <HeartIcon
                    className="mt-1 h-5 w-5 flex-none text-orange-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold ">For listeners:</strong>{" "}
                    Discover new music and give heat to your favorite songs to
                    help them rise to the top!
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <GlobeAltIcon
                    className="mt-1 h-5 w-5 flex-none text-orange-600"
                    aria-hidden="true"
                  />
                  <span>
                    <strong className="font-semibold ">
                      Join the community.
                    </strong>{" "}
                    With so many artists and listeners, you will never be alone.
                    Join the community and start earning today!
                  </span>
                </li>
              </ul>
              <p className="mt-8">
                Try out Etherwav and find out why we are the best music platform
                on the blockchain!
              </p>
              <h2 className="mt-16 text-2xl font-bold tracking-tight ">
                Not an artist? No problem!
              </h2>
              <p className="mt-6">
                Etherwav is not just for artists. You can listen to music and
                give heat to your favorite tracks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

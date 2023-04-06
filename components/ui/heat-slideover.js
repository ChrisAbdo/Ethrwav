import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { HeartIcon, XMarkIcon } from "@heroicons/react/24/outline";

import Image from "next/image";

export default function HeatSlideover({
  heatOpen,
  setHeatOpen,
  nft,
  handleGiveHeat,
  heatCount,
  setHeatCount,
}) {
  return (
    <>
      <Transition.Root show={heatOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setHeatOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 dark:bg-[#111] bg-opacity-75 dark:bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto relative w-96">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-in-out duration-500"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in-out duration-500"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                        <button
                          type="button"
                          className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                          onClick={() => setHeatOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="h-full overflow-y-auto border-l border-gray-200 dark:border-[#333] bg-white dark:bg-black p-8 mt-20">
                      <div className="space-y-6 pb-16">
                        <div>
                          <div className="aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
                            <Image
                              src={nft.coverImage}
                              alt=""
                              width={200}
                              height={200}
                              className="object-cover"
                            />
                          </div>
                          <div className="mt-4 flex items-start justify-between">
                            <div>
                              <h2 className="text-base font-semibold leading-6">
                                <span className="sr-only">Details for </span>
                                {nft.title}
                              </h2>
                              <p className="text-sm font-medium text-gray-500 dark:text-[#999]">
                                {nft.seller.slice(0, 5)}...
                                {nft.seller.slice(-4)}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                              <HeartIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                              <span className="sr-only">Favorite</span>
                            </button>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium">Information</h3>
                          <dl className="mt-2 divide-y divide-gray-200 dark:divide-[#333] border-b border-t border-gray-200 dark:border-[#333]">
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt>Uploaded by</dt>
                              <dd>
                                {nft.seller.slice(0, 5)}...
                                {nft.seller.slice(-4)}
                              </dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt>Song Title</dt>
                              <dd>{nft.title}</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt>Genre</dt>
                              <dd>{nft.genre}</dd>
                            </div>
                            <div className="flex justify-between py-3 text-sm font-medium">
                              <dt>Heat Count</dt>
                              <dd>{nft.heatCount}</dd>
                            </div>
                          </dl>
                        </div>

                        <div>
                          <h1 className="font-medium">How It Works</h1>
                          <div>
                            <dl className="mt-5">
                              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-[#333] px-4 py-5 shadow sm:p-6">
                                <dt className="justify-center items-center flex truncate text-lg font-medium">
                                  1 Heat = 1 MATIC
                                </dt>
                                <dd className="mt-2 text-sm text-gray-500 dark:text-[#999]">
                                  <p>
                                    Heat acts as a ranking system and payout
                                    method for the platform. Each song starts
                                    with 0 heat. The more heat a song has, the
                                    higher on the queue it will be. Heat is
                                    completely community driven. Anyone can give
                                    a song heat.
                                  </p>
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-medium">Give Heat</h3>
                          <div>
                            <div className="mt-2 flex rounded-md shadow-sm">
                              <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 dark:border-[#333] px-3 text-gray-500 sm:text-sm">
                                MATIC
                              </span>
                              <input
                                type="number"
                                name="company-website"
                                id="company-website"
                                className="block w-full min-w-0 flex-1 bg-white dark:bg-black rounded-none rounded-r-md border-0 py-1.5 ring-1 ring-inset ring-gray-300 dark:ring-[#333] placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="0"
                                onChange={(event) =>
                                  setHeatCount(event.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <button
                            type="button"
                            className="w-full rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleGiveHeat}
                          >
                            Give Heat
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}

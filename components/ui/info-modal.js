import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { MusicalNoteIcon, PhotoIcon } from "@heroicons/react/24/outline";
import InfoDropdown from "./info-dropdown";

export default function InfoModal({ open, setOpen, nft }) {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 dark:bg-[#111]  dark:bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6">
                <div>
                  <div className="text-center sm:mt-5">
                    <div className="overflow-hidden  shadow sm:rounded-lg">
                      <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-base font-semibold leading-6 ">
                          More Information
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-[#999]">
                          Find out more about this song and artist.
                        </p>
                      </div>
                      <div className="border-t border-gray-200 dark:border-[#333] px-4 py-5 sm:p-0">
                        <dl className="sm:divide-y sm:divide-gray-200 dark:sm:divide-[#333]">
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium ">Title</dt>
                            <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                              {nft.title}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium ">Artist</dt>
                            <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                              {nft.seller}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium ">Genre</dt>
                            <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                              {nft.genre}
                            </dd>
                          </div>
                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium ">Heat Count</dt>
                            <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                              {nft.heatCount}
                            </dd>
                          </div>

                          <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5">
                            <dt className="text-sm font-medium ">Sources</dt>
                            <dd className="mt-1 text-sm  sm:col-span-2 sm:mt-0">
                              <ul
                                role="list"
                                className="divide-y divide-gray-200 dark:divide-[#333] rounded-md border border-gray-200 dark:border-[#333]"
                              >
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                  <div className="flex w-0 flex-1 items-center">
                                    <MusicalNoteIcon
                                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="ml-2 w-0 flex-1 truncate">
                                      {nft.image}
                                    </span>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <InfoDropdown nft={nft} media={nft.image} />
                                  </div>
                                </li>
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                  <div className="flex w-0 flex-1 items-center">
                                    <PhotoIcon
                                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                                      aria-hidden="true"
                                    />
                                    <span className="ml-2 w-0 flex-1 truncate">
                                      {nft.coverImage}
                                    </span>
                                  </div>
                                  <div className="ml-4 flex-shrink-0">
                                    <InfoDropdown
                                      nft={nft}
                                      media={nft.coverImage}
                                    />
                                  </div>
                                </li>
                              </ul>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

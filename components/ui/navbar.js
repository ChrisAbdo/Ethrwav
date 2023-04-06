import { Fragment, useState, useEffect } from "react";
import DarkModeToggle from "./dark-mode-toggle";
import WalletModal from "./wallet-modal";
import Web3 from "web3";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  FireIcon,
  SquaresPlusIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";

const products = [
  {
    name: "Listen",
    description: "Find the best songs on Polygon",
    href: "/listen",
    icon: ChartPieIcon,
  },
  {
    name: "Earn and Give Heat",
    description: "Support other artists by giving them heat",
    href: "/listen",
    icon: CursorArrowRaysIcon,
  },
];
const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Star on GitHub", href: "https://github.com/ChrisAbdo/Ethrwav", icon: StarIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const web3 = new Web3(Web3.givenProvider);

  const [connectedAccount, setConnectedAccount] = useState("");

  useEffect(() => {
    const loadConnectedAccount = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setConnectedAccount(accounts[0]);
      }
    };

    // event listener for MetaMask account change
    window.ethereum.on("accountsChanged", function (accounts) {
      setConnectedAccount(accounts[0]);
    });

    // event listener for MetaMask disconnect
    window.ethereum.on("disconnect", function (error) {
      setConnectedAccount(null);
    });

    loadConnectedAccount();
  }, []);

  const connectWallet = async () => {
    try {
      const accounts = await web3.eth.requestAccounts();
      setConnectedAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className="sticky top-0 bg-white dark:bg-black border-b border-gray-200 dark:border-[#333] z-50">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <h1 className="flex items-center text-xl font-bold leading-7 text-black dark:text-white">
              <FireIcon className="h-6 w-6 mr-1" aria-hidden="true" />
               Etherwav
            </h1>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-black dark:text-white">
              Listen
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white dark:bg-black border dark:border-[#333] shadow-lg ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50 dark:hover:bg-[#111] transition duration-150"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 dark:bg-[#111] group-hover:bg-white dark:group-hover:bg-[#333]">
                        <item.icon
                          className="h-6 w-6 text-gray-600 dark:text-[#999] group-hover:text-orange-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link href={item.href} className="block font-semibold">
                          {item.name}
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600 dark:text-[#999]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 dark:divide-[#333] bg-gray-50 dark:bg-[#111] dark:border-t dark:border-[#333]">
                  {callsToAction.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-black dark:text-white hover:bg-gray-100 dark:hover:bg-[#333]"
                    >
                      <item.icon
                        className="h-5 w-5 flex-none text-gray-400"
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>

          <Link
            href="/upload"
            className="text-sm font-semibold leading-6 text-black dark:text-white"
          >
            Upload
          </Link>

          <Link
            href="/profile"
            className="text-sm font-semibold leading-6 text-black dark:text-white"
          >
            Profile
          </Link>
        </Popover.Group>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-black dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-[#333] hover:bg-gray-200 dark:hover:bg-[#333] transition duration-200"
          >
            {connectedAccount ? (
              <span>
                {connectedAccount.slice(0, 5)}...{connectedAccount.slice(-4)}
              </span>
            ) : (
              <span>Connect Wallet</span>
            )}
          </button>
          <WalletModal
            open={open}
            setOpen={setOpen}
            connectWallet={connectWallet}
            connectedAccount={connectedAccount}
            setConnectedAccount={setConnectedAccount}
          />
        </div>

        <div className="mr-4" />
        <DarkModeToggle />
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 hover:bg-gray-50">
                        Product
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-white hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-white hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-black dark:text-white hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>

                <DarkModeToggle />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}

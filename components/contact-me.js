export default function ContactMe() {
  return (
    <div className="bg-[#eaeaea] dark:bg-[#111] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2 className="text-3xl font-bold tracking-tight ">
                Want updates about Etherwav?
              </h2>
              <p className="mt-4 leading-7 text-gray-600 dark:text-[#999]">
                Follow my journey on my social media!
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-2 lg:gap-8">
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-10">
                <h3 className="text-base font-semibold leading-7 ">Email</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-orange-600"
                        href="mailto:chris.j.abdo@gmail.com"
                      >
                        chris.j.abdo@gmail.com
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-10">
                <h3 className="text-base font-semibold leading-7 ">Twitter</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-orange-600"
                        href="https://www.twitter.com/abdo_eth"
                        target="_blank"
                        rel="noreferrer"
                      >
                        @abdo_eth
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-10">
                <h3 className="text-base font-semibold leading-7 ">GitHub</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a
                        className="font-semibold text-orange-600"
                        href="https://www.github.com/chrisabdo"
                        target="_blank"
                        rel="noreferrer"
                      >
                        ChrisAbdo
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
              <div className="rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-10">
                <h3 className="text-base font-semibold leading-7 ">Lens</h3>
                <dl className="mt-3 space-y-1 text-sm leading-6 text-gray-600">
                  <div>
                    <dt className="sr-only">Email</dt>
                    <dd>
                      <a className="font-semibold text-orange-600">
                        chrisabdo.lens
                      </a>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

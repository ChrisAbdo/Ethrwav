const stats = [
  { id: 1, name: "Songs on the platform", value: "500+" },
  { id: 2, name: "Platform fee", value: "0%" },
  { id: 3, name: "Uptime guarantee", value: "99.9%" },
  { id: 4, name: "Paid out to creators", value: "$100,000+" },
];

export default function Stats() {
  return (
    <div className="bg-[#eaeaea] dark:bg-[#111] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Loved by artists worldwide
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-[#999]">
              We are proud to be the platform of choice for creators around the
              world.
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex flex-col bg-gray-50 dark:bg-white/5 hover:bg-[#fafafa]/50 dark:hover:bg-[#333]/80 transition duration-200 p-8"
              >
                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-[#999]">
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

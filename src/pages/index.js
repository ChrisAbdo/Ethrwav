import React from "react";

import AsciiFireAnimation from "@/components/ascii-fire";
import HeaderSection from "@/components/header-section";
import ParallaxText from "@/components/parallax-text";
import ContentSection from "@/components/content-section";
import Link from "next/link";
import Stats from "@/components/stats";
import ContactMe from "@/components/contact-me";
import Footer from "@/components/footer";

export default function Index() {
  return (
    <div className="items-center">
      <div className="fixed inset-x-0 bottom-0 z-10">
        <div className="items-center">
          <AsciiFireAnimation />
        </div>
      </div>
      <div className="relative h-screen ">
        <div className="h-screen" />
        <div className="sticky z-20">
          <HeaderSection />
        </div>

        <div className="sticky z-20 bg-[#eaeaea] dark:bg-[#111] ">
          <ParallaxText baseVelocity={-1}>
            Etherwav Etherwav Etherwav
          </ParallaxText>
          <ParallaxText baseVelocity={1}>
            Create. Listen. Earn. Create. Listen. Earn.
          </ParallaxText>
        </div>

        <div className="sticky z-20">
          <ContentSection />
        </div>

        <div className="sticky z-20 bg-[#eaeaea] dark:bg-[#111] ">
          <ParallaxText baseVelocity={1}>
            Etherwav Etherwav Etherwav
          </ParallaxText>
          <ParallaxText baseVelocity={-1}>
            Create. Listen. Earn. Create. Listen. Earn.
          </ParallaxText>
        </div>

        <div className="sticky z-20">
          <Stats />
        </div>

        <div className="sticky z-20">
          <ContactMe />
        </div>

        <div className="sticky z-20">
          <Footer />
        </div>

        <div className="fixed inset-0 flex items-center justify-center flex-col z-10">
          <div>
            <h1 className="text-5xl">Welcome to Etherwav</h1>
          </div>
          <div className="flex mt-4 space-x-2">
            <Link
              href="/listen"
              className="rounded-md bg-orange-600 hover:bg-orange-600/80 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Listening
            </Link>
            <Link
              href="/upload"
              className="rounded-md bg-[#fafafa] dark:bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-black dark:text-white shadow-sm hover:bg-white/80 dark:hover:bg-white/20"
            >
              Upload to Etherwav
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Head from "next/head";
import { useRouter } from "next/router";

import { Button, Nav, Slides, ThemeChanger } from "../src/components";

export default function Home() {
  const router = useRouter();


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <main className="min-h-screen mx-auto">
        <header className="bg-white dark:bg-gray-900">
          <Nav />

          <div className="container px-6 py-16 w-md mx-auto ">
            <div className="items-center flex justify-between flex-col-reverse lg:flex-row">
              <div className="w-full lg:w-2/5">
                <div className="lg:max-w-lg">
                  <h1 className="text-2xl font-semibold text-gray-800 uppercase dark:text-white lg:text-3xl">
                    Official website of the <br />
                    <span className="text-green-700 dark:text-green-600 font-bold">
                      GFGSC-GCET
                    </span>{" "}
                  </h1>

                  <p className="mt-2 text-gray-600 dark:text-gray-400">
                    GeeksforGeeks Student Chapters are university-based
                    community chapters for students interested in Computer
                    Science and want to make their career in this field. By
                    joining a GeeksforGeeks student Chapter, students grow their
                    knowledge in a peer-to-peer learning environment and build
                    effective and optimised solutions for local businesses and
                    their community. GeeksforGeeks Student Chapters will provide
                    students with various events and webinars on coding or
                    placements. Students may get internship opportunities at
                    GeeksforGeeks. Along with all this student can get exclusive
                    discounts on GFG courses. You will get an opportunity to
                    organize your competition on a PAN India level. It will help
                    students to grow a network among 145+ colleges.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center w-full my-6 lg:mt-0 lg:w-1/2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-full h-full lg:max-w-2xl"
                  src="http://unsplash.it/1080/780"
                  alt="Catalogue-pana.svg"
                />
              </div>
            </div>
          </div>
        </header>

        <section className="bg-gray-900 dark:bg-white">
          <div className="container flex flex-col items-center px-4 py-12 mx-auto text-center">
            <h2 className="text-3xl font-semibold tracking-tight dark:text-gray-700 sm:text-4xl text-white">
              Become the part of Geeks for Geeks Community <br />
              <span className="text-green-700 dark:text-green-600 font-bold uppercase">
                GFG&nbsp;Student&nbsp;Chapter&nbsp;of&nbsp;GCET
              </span>{" "}
            </h2>

            <div className="mt-6 sm:-mx-2">
              <Button>JOIN NOW</Button>
            </div>
          </div>
        </section>

        <Slides />
        <ThemeChanger />
      </main>
    </>
  );
}

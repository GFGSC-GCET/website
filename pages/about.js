import React from "react";
import {Breadcrumbs, Footer, Nav, ThemeChanger} from "../src/components";

//icons
import {RiBookFill, RiGlobalFill, RiMoneyEuroBoxFill, RiUser3Fill} from "react-icons/ri";

import {withPublic} from "../src/routes";
import InfoCard from "../src/components/infoCard";

const About = () => {
    const aboutData = [{}];
    return (
        <>
            <Nav/>
            <Breadcrumbs/>
            <ThemeChanger/>
            <section className="bg-white dark:bg-gray-900">
                <div className="container px-6 py-10 mx-auto">
                    <div class="prose dark:prose-invert">
                        <h1 className="">
                            Know more <br/> about{" "}
                            <span
                                className="text-green-500"
                            >GFGSC-GCET
                            </span>
                        </h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Provident ab nulla quod dignissimos vel non corrupti
                            doloribus voluptatum eveniet</p>
                    </div>
                    <iframe
                        title="intro video"
                        className="min-w-full mt-12 h-64 md:h-[450px] rounded-xl overflow-hidden"
                        src="https://www.youtube.com/embed/yrEIbh-VKwo"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        allowfullscreen=""
                    ></iframe>

                    <div className="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2">
                        <InfoCard title="Hello World!" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Provident ab nulla quod dignissimos vel non corrupti
                                        doloribus voluptatum eveniet" icon={RiGlobalFill}/>
                        <InfoCard title="Hello World!" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Provident ab nulla quod dignissimos vel non corrupti
                                        doloribus voluptatum eveniet" icon={RiBookFill}/>
                        <InfoCard title="Hello World!" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Provident ab nulla quod dignissimos vel non corrupti
                                        doloribus voluptatum eveniet" icon={RiUser3Fill}/>
                        <InfoCard title="Hello World!" description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Provident ab nulla quod dignissimos vel non corrupti"
                                  icon={RiMoneyEuroBoxFill}/>

                    </div>
                </div>
            </section>

            <Footer/>
        </>
    );
};

export default withPublic(About);

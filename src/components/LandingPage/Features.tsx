import { features } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Features(){

    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
          opacity: 0,
          yPercent: 30,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
          },
        });
    }, { scope: ref });

    return(
        <section ref={ref} id="features">
            <div  className="w-[90%] mx-auto mt-24">
                {/* heading */}
                <span className="lg:flex  lg:justify-between">
                    <h1 className="title text-dark font-cabinet lg:w-[30%] ">Everything you need. Nothing you don't.</h1>
                    <p className="lg:w-[25%] font-satoshi text-gray-500 pt-3 md:pt-0 text-[0.9rem] font-semibold flex items-end ">Four powerful features that make understanding any document actually posssible.</p>
                </span>

                <div className="hidden lg:grid grid-cols-4 border-[3px] my-14  border-black rounded-3xl">
                    { features.slice(0,3).map( (f) => (
                        <div key={f.id} className="border-r-[3px] border-black">
                            <div className="flex flex-col gap-y-2 w-[80%] mx-auto py-6">
                                <h1 className="text-[2.5rem] font-satoshi font-semibold tracking-wide text-gray-500 ">{f.id}</h1>
                                <img src={f.icon} alt="icon" className="w-[50px]"/>
                                <h2 className="text-[1.2rem] font-cabinet font-semibold ">{f.title} </h2>
                                <p className="text-small font-satoshi">{f.subtitle} </p>
                            </div>
                        </div>
                    )) }

                    { features.slice(3).map( (f) => (
                        <div key={f.id} >
                            <div className="flex flex-col gap-y-2 w-[80%] mx-auto py-6">
                                <h1 className="text-[2.5rem] font-satoshi font-semibold tracking-wide text-gray-500 ">{f.id}</h1>
                                <img src={f.icon} alt="icon" className="w-[50px]"/>
                                <h2 className="text-[1.2rem] font-cabinet font-semibold ">{f.title} </h2>
                                <p className="text-small font-satoshi">{f.subtitle} </p>
                            </div>
                        </div>
                    )) }

                </div>

                <div className=" grid  gap-7 md:grid-cols-2 lg:hidden  my-10  ">
                    { features.map( (f) => (
                        <div key={f.id} className="border-[2px] border-black rounded-xl">
                            <div className="flex flex-col gap-y-1 w-[80%] mx-auto py-4">
                                <h1 className="text-[2.2rem] font-satoshi font-semibold tracking-wide text-gray-500 ">{f.id}</h1>
                                <img src={f.icon} alt="icon" className="hidden md:flex w-[40px]"/>
                                <h2 className="text-[1.2rem] font-cabinet font-semibold ">{f.title} </h2>
                                <p className="text-small font-satoshi">{f.subtitle} </p>
                            </div>
                        </div>
                    )) }

                </div>
            </div>

        </section>
    )
}
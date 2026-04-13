import { Star } from "lucide-react";
import { reviews } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Review (){
    const ref = useRef<HTMLElement>(null);

    useGSAP(() => {
        gsap.from(ref.current, {
          opacity: 0,
          yPercent: 30,
          duration: 1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
          },
        });
    }, { scope: ref });

    return(
        <section className="bg-[#f7f7f7]">
            <main ref={ref} className="py-16 page-width">
                <h1 className="title flex text-center font-cabinet ">People actually love it.</h1>

                <div className="grid  lg:grid-cols-3 mt-10 gap-5 lg:gap-8">
                    { reviews.map( (r) => (
                        <div key={r.id} className="flex flex-col gap-3 md:gap-y-5 border-[3px] border-black rounded-2xl py-6 px-4 lg:px-8">
                            <span className="flex gap-1">
                                <Star className="text-[#ff4d4d] fill-[#ff4d4d] size-4 " />
                                <Star className="text-[#ff4d4d] fill-[#ff4d4d] size-4 " />
                                <Star className="text-[#ff4d4d] fill-[#ff4d4d] size-4 " />
                                <Star className="text-[#ff4d4d] fill-[#ff4d4d] size-4 " />
                                <Star className="text-[#ff4d4d] fill-[#ff4d4d] size-4 " />
                            </span>

                            <p className="text-[0.95rem] text-gray-800 font-satoshi font-semibold">"{r.review}"</p>

                            <span className="flex gap-4 font-satoshi">
                                <p className={`p-3 border-2 text-[0.9rem] font-bold border-black rounded-md ${r.color}`} >{r.initial}</p>
                                <div>
                                    <p className="font-semibold text-gray-900">{r.name}</p>
                                    <p className="text-small pt-1">{r.status}</p>
                                </div>

                            </span>
                        </div>
                    )) }
                </div>
            </main>
        </section>
    )
}
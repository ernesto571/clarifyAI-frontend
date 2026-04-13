import { faqs } from "../../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function FAQ (){
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
        <section id="faq">
            <main ref={ref} className="grid  lg:grid-cols-2 page-width gap-6 py-20">
                <div className="font-cabinet font-bold">
                    <h1 className="title  ">Got questions?</h1>
                    <h1 className="title pt-1" >We got answers.</h1>
                    <p className="pt-2 font-satoshi text-gray-600 font-medium">Everything you need to know about ClarifyAI — and why it's free.</p>
                </div>

                <div className="flex flex-col gap-5">
                    { faqs.map( (f) => (
                        <div key={f.id} className="w-full border-2 font-satoshi border-black rounded-xl px-7 py-4">
                            <h4 className="text-gray-800 font-semibold">{f.question}</h4>
                            <p className="text-small pt-2">{f.answer}</p>
                        </div>
                    )) }
                </div>
                
            </main>
        </section>
    )
}
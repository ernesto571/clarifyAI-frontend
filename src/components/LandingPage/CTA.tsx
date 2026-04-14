import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

export default function CTA (){
    const navigate = useNavigate()

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
        <section className="border-t-2 border-black py-16 bg-[#2d6bff]">
            <main ref={ref} className="flex flex-col gap-5 justify-center items-center text-center">
                <div className="flex flex-col text-[3.2rem] lg:text-[4.2rem] leading-[4.2rem] font-cabinet font-bold text-white text-center">
                    <h1 >Stop guessing.</h1>
                    <h1>Start knowing.</h1>
                </div>

                <p className="font-satoshi text-gray-300 ">No sign-up needed. Paste your docs and get answers in seconds.</p>

                <button onClick={() => (navigate("/dashboard"))} className="flex bg-primary tracking-wide rounded-lg transition  text-dark font-bold font-satoshi py-4 border-[3px] border-black hover:-translate-y-[1px] px-7 ">Analyze a Document for free<ArrowRight className="flex items-center size-6 pl-2 "/></button>
            </main>
        </section>
    )
}
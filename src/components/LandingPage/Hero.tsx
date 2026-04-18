import { ArrowDown, ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

gsap.registerPlugin(SplitText);

export default function Hero(){

    const navigate = useNavigate()

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.3 });
        const heroSplit = new SplitText("#hero-title", { type: "chars, words" });
        const heroSplit2 = new SplitText("#hero-title-2", { type: "chars, words" });
        const subtitleSplit = new SplitText("#hero-subtitle", { type: "lines" });


        tl.from(heroSplit.chars, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "back.out",
            stagger: 0.05, // Faster stagger so buttons show sooner
        })
        tl.from("#text-1", {
            opacity: 0,
            y: 10,
            duration : 0.3,
            stagger: 0.05
        })
        tl.from(heroSplit2.chars, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: "back.out",
            stagger: 0.05, // Faster stagger so buttons show sooner
        })
        tl.from("#text-2", {
            opacity: 0,
            y: 10,
            duration : 0.3,
            stagger: 0.05
        })
        .from(subtitleSplit.lines, {
            opacity: 0,
            y: 10,
            duration: 0.5,
            stagger: 0.1,
        });
        tl.from("#hero-btn", {
            opacity: 0,
            y: 15,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
        })

    }, [])

    return(
        <section className="bg-primary lg:h-screen">
            <div className="grid  lg:grid-cols-2">
                <section className="mt-[4rem] md:mt-[5rem] mb-[4rem] lg:mb-0  w-[90%] md:w-[70%] lg:w-[80%]  mx-auto font-cabinet font-bold">
                    <div className="inline-flex gap-2 bg-black text-primary py-2 justify-center text-[0.8rem] tracking-wide px-3 md:px-5  rounded-md"> 
                        <img className="w-[15px] flex items-center " src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775552386/diamond-mark-3-svgrepo-com_dgvrj1.svg" alt="icon" />
                        <p>100% FREE • AI-POWERED</p>
                    </div>
                    <div className="mt-3 font-bold primary-text">
                        <span className="md:flex lg:block gap-4">
                            <h1 id="hero-title" className="h-[55px] md:h-full lg:h-[80px]">Read</h1>
                            <span id="text-1" className="bg-sec -rotate-2 rounded-md  inline-flex px-3 h-[60px] md:h-[80px] items-center  text-white bg-[#2d6bff]">
                                <h1  >smarter.</h1>
                            </span>
                        </span>
                        

                        <span className="flex gap-4 md:-mt-2">
                            <h1 id="hero-title-2" className="-mt-[5px] md:-mt-[10px]" >Sign</h1>
                            <span id="text-2" className="rotate-3 px-3 mt-[4px] rounded-md md:h-[80px] items-center inline-flex justify-center text-white bg-[#2d6bff]">
                                <h1 >safer.</h1>
                            </span>
                        </span>
                    </div>

                    <p id="hero-subtitle" className="font-satoshi text-[#8a7220] font-semibold md:text-[1.1rem] lg:w-[80%] mt-3">Paste or upload any contract, legal doc or terms of service — get a plain English breakdown in seconds. </p>

                    {/* buttons */}
                    <div id="hero-btn" className="mt-6 flex gap-6 ">
                        <button onClick={() => (navigate("/dashboard"))} className="bg-[#0d0d0d] tracking-wide rounded-lg hover:bg-[#0d0d0d]/95 transition  text-primary flex py-4 hover:-translate-y-[1px] px-6">Try it Free <ArrowRight className="flex items-center size-6 pl-2 "/></button>

                        <a href="#how-it-works" className="border-2 border-[#0d0d0d] tracking-wide rounded-lg transition hover:cursor-pointer  text-[#0d0d0d] flex py-4 hover:-translate-y-[1px] px-6">See How <ArrowDown className="flex items-center size-6 pl-2 "/></a>
                    </div>
                </section>

                <section className="hidden lg:flex border-l-2 border-black">
                    <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775521808/hero-pic_pfkamt.png" alt="bg-hero" className="  h-screen w-full object-cover" />
                </section>
            </div>
        </section>
    )
}
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { info } from "../constants";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpPage/SignUpForm";

export default function SignUpPage (){

    return (
        <main>
            <div className="grid grid-cols-1 lg:grid-cols-2">

                <section className=" hidden lg:flex bg-primary h-screen sticky top-0 z-10">
                    <section className="pt-[2rem] w-[90%] md:w-[80%] mx-auto font-cabinet ">
                        <div className="flex gap-2 font-bold bg-black text-primary py-1 justify-center text-[0.8rem] tracking-wide max-w-[65%]  md:max-w-[38%] rounded-md"> 
                            <img className="w-[15px] flex items-center " src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775552386/diamond-mark-3-svgrepo-com_dgvrj1.svg" alt="icon" />
                            <p>100% FREE • AI-POWERED</p>
                        </div>
                        <div className="mt-2 font-bold signup-hero">
                            <h1 id="hero-title">Read</h1>
                            <span id="text-1" className="bg-sec -rotate-2 -mt-[16px]   h-[60px]  rounded-md items-center  transform  max-w-[50%]  flex justify-center text-white bg-[#2d6bff]">
                                <h1  >smarter.</h1>
                            </span>

                            <span className="flex gap-4">
                                <h1 id="hero-title-2" className="-mt-[5px] md:-mt-[10px]" >Sign</h1>
                                <span id="text-2" className="rotate-2 h-[60px]  mt-[4px] rounded-md items-center px-4  transform max-w-[60%] flex justify-center text-white bg-[#2d6bff]">
                                    <h1 >safer.</h1>
                                </span>
                            </span>
                        </div>

                        <p id="hero-subtitle" className="font-satoshi text-[#8a7220] font-medium  md:w-[80%] mt-2">Paste or upload any contract, legal doc or terms of service — get a plain English breakdown in seconds. </p>

                        { info.map( (i) => (
                            <div className="my-4 flex-flex-col gap-1" key={i.text}>

                                <span className="flex gap-2">
                                    <CheckCircle2 className="text-primary fill-black"/>
                                    <p className="text-sm text-gray-800 font-satoshi font-medium">{i.text} </p>
                                </span>
                            </div>
                        )) }

                        <span className="flex gap-1 items-center">
                            <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775672704/Screenshot_2026-04-08_at_19-21-09_ClarifyAI___Sign_Up-removebg-preview_dcsh6c.png" alt="img" />
                            <span className="flex gap-1 text-gray-800 text-[0.9rem]">
                                <strong>12,000+ </strong>
                                <p>stopped signing blind this month. </p>
                            </span>
                        </span>
                    </section>
                </section>
                
                <section className="w-[85%] md:w-[50%] lg:w-[65%] mx-auto py-6 flex-1 overflow-y-auto">
                    <h1 className="font-cabinet font-semibold tracking-tight text-[2rem] ">Create your account</h1>
                    <span className="flex gap-2  text-[0.9rem] font-satoshi font-medium">
                        <p className="text-gray-700">Already have an account?</p>
                        <Link to="/login" className="text-[#2d6bff] flex gap-1 items-center font-bold hover:underline transform">Log in <ArrowRight className="size-4"/></Link>
                    </span>

                    <div className="mt-8  mx-auto">
                        <SignUpForm />
                    </div>
                </section>
            </div>
        </main>
    )
}
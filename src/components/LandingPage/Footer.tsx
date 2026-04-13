import { footerLinks } from "../../constants";

export default function Footer (){

    return(
        <footer className="bg-tet py-6">
            <div className="flex justify-between page-width items-center">
                <h1 className="font-cabinet text-primary font-bold  text-[1.3rem]">ClarifyAI</h1>

                <span className="hidden md:flex gap-5">
                    { footerLinks.map( (f) => (
                        <a href="#" key={f.name} className="text-gray-500 text-[0.8rem] text-bold font-satoshi hover:text-white">{f.name}</a>
                    )) }
                </span>

                <p className="text-gray-200 text-[0.8rem] text-bold font-satoshi hover:text-white">&copy;  2026  ClarifyAI</p>
            </div>
        </footer>
    )
}
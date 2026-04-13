import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { navLinks } from "../../constants";

export default function Navbar(){

    const location = useLocation();
    const navigate = useNavigate()

    return(
        <nav className=" top-0 left-0  w-full z-30 transition-all duration-300
        bg-primary border-b-[3px] border-gray-900 py-2 md:py-4
        ">
            <main  className="flex justify-between w-[98%] md:w-[90%] mx-auto items-center">
                <Link to="/" >
                    <img src="https://res.cloudinary.com/dsljbxkfy/image/upload/v1775521808/clarifyai_logo_drekht.png" alt="logo" className="w-[7rem] md:w-[9rem] font-thin " />
                </Link>

                <div className="flex gap-8 text-gray-800 font-cabinent font-bold text-[0.9rem] tracking-wide items-center">
                    {/* links */}
                    <span className="hidden md:flex gap-8">
                        {navLinks.map((link) => {
                            const isActive = location.hash === link.id;
                            return (
                            <div key={link.id}>
                                <a href={link.id} className={`nav-link ${isActive ? "active" : ""}`}>
                                {link.title}
                                </a>
                            </div>
                            );
                        })}
                    </span>

                    {/* login button */}
                    <button onClick={() => (navigate("/login"))} className="md:px-6 text-sm px-4 py-2  transition-colors   rounded-md bg-black hover:bg-gray-900 text-[#ffe034]">SIGN IN</button>
                </div>
            </main>
        </nav>
    )
}
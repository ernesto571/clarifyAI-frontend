import CTA from "../components/LandingPage/CTA";
import FAQ from "../components/LandingPage/FAQ";
import Features from "../components/LandingPage/Features";
import Footer from "../components/LandingPage/Footer";
import Hero from "../components/LandingPage/Hero";
import HowItWorks from "../components/LandingPage/HowItWorks";
import Review from "../components/LandingPage/Review";
import Slide from "../components/LandingPage/Slide";

export default function LandingPage(){

    return(
        <section>
            <Hero />
            <Slide />
            <Features />
            <HowItWorks />
            <Review />
            <FAQ />
            <CTA />
            <Footer />
        </section>
    )
}
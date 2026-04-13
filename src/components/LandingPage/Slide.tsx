import { Star } from "lucide-react";
import { slide } from "../../constants";

export default function Slide() {
  return (
    <section className="py-3 overflow-hidden bg-sec border-y-2 border-black">
      <div className="flex w-max animate-marquee gap-14">
        {/* Render twice for seamless looping */}
        {[...slide, ...slide].map((s, i) => (
          <span key={i} className="flex gap-4 text-[0.8rem] font-semibold items-center">
            <p className="text-gray-200 font-satoshi whitespace-nowrap">{s.text}</p>
            <Star className="text-gray-200 fill-gray-200 size-3" />
          </span>
        ))}
      </div>
    </section>
  );
}
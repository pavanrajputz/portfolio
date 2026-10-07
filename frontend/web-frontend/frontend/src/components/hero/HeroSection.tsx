import { useEffect, useRef } from "react";
import gsap from "gsap";

const BASE = ["MAKING", "GOOD", "SHIT", "SINCE", "2024"];
const ALT = ["HIDING", "BAD", "SHIT", "SINCE", "2024"];

const DOT_R = 16; // idle dot radius
const HOVER_R = 190; // radius when hovering the text

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        // skip on touch devices
        if (!window.matchMedia("(hover: hover)").matches) return;

        const section = sectionRef.current!;
        const overlay = overlayRef.current!;
        const headline = headlineRef.current!;

        const pos = { x: 0, y: 0 }; // follows the cursor
        const size = { r: 0 }; // radius, tweened separately

        const render = () => {
            overlay.style.clipPath = `circle(${size.r}px at ${pos.x}px ${pos.y}px)`;
        };
        gsap.ticker.add(render);

        const xTo = gsap.quickTo(pos, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(pos, "y", { duration: 0.6, ease: "power3.out" });

        let started = false;
        const onMove = (e: MouseEvent) => {
            const rect = section.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (!started) {
                started = true;
                pos.x = x;
                pos.y = y;
                gsap.to(size, { r: DOT_R, duration: 0.4, ease: "power3.out", overwrite: true });
            }
            xTo(x);
            yTo(y);
        };

        const onLeaveSection = () => {
            started = false;
            gsap.to(size, { r: 0, duration: 0.3, overwrite: true });
        };

        const grow = () =>
            gsap.to(size, { r: HOVER_R, duration: 0.7, ease: "power3.out", overwrite: true });
        const shrink = () =>
            gsap.to(size, { r: DOT_R, duration: 0.5, ease: "power3.out", overwrite: true });

        section.addEventListener("mousemove", onMove);
        section.addEventListener("mouseleave", onLeaveSection);
        headline.addEventListener("mouseenter", grow);
        headline.addEventListener("mouseleave", shrink);

        return () => {
            gsap.ticker.remove(render);
            section.removeEventListener("mousemove", onMove);
            section.removeEventListener("mouseleave", onLeaveSection);
            headline.removeEventListener("mouseenter", grow);
            headline.removeEventListener("mouseleave", shrink);
            gsap.killTweensOf(pos);
            gsap.killTweensOf(size);
        };
    }, []);

    const headlineClasses =
        "flex flex-col items-center text-center font-bold uppercase " +
        "text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.88] tracking-tight";

    return (
        <section
            ref={sectionRef}
            className="relative h-screen w-full overflow-hidden bg-white"
            style={{ fontFamily: "'Jost', 'Futura', sans-serif" }}
        >
            {/* Background video */}
            <video
                className="absolute inset-0 h-full w-full object-cover grayscale"
                src="/videos/hero-model.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Layer 1: base content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center">
                <p className="mb-4 text-[10px] tracking-[0.35em] text-[#b9a998]">Pawan Kumar</p>
                <h1 ref={headlineRef} className={`${headlineClasses} cursor-default`}>
                    {BASE.map((word, i) => (
                        <span
                            key={word + i}
                            className={i === 1 || i === 2 ? "text-[#e04030]" : "text-[#b9a998]"}
                        >
              {word}
            </span>
                    ))}
                </h1>
            </div>

            {/* Layer 2: red circle + alt text, clipped to the circle */}
            <div
                ref={overlayRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-[#e04030]"
                style={{ clipPath: "circle(0px at 0px 0px)" }}
            >
                <div className="flex h-full flex-col items-center justify-center">
                    {/* invisible spacer: keeps the headline at the same position as layer 1 */}
                    <p className="mb-4 text-[10px] tracking-[0.35em] opacity-0">YOUR NAME</p>
                    <div className={`${headlineClasses} text-[#111]`}>
                        {ALT.map((word, i) => (
                            <span key={word + i}>{word}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
import { useEffect, useRef } from "react";
import type { ReactNode, MutableRefObject } from "react";
import gsap from "gsap";

const BASE = ["MAKING", "GOOD", "SHIT", "SINCE", "2024"];
const ALT = ["HIDING", "BAD", "SHIT", "SINCE", "2024"];

const DOT_R = 16; // idle dot radius
const HOVER_R = 190; // radius over the headline
const BUTTON_R = 30; // radius over a social button
const MAGNET = 0.35; // how far the icon is pulled toward the cursor (0-1)

type Social = { label: string; href: string; icon: ReactNode };

const SOCIALS: Social[] = [
    {
        label: "GitHub",
        href: "https://github.com/pavanrajputz",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
        ),
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/pavanrajputz/",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                    fillRule="evenodd"
                    d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm4 5.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7z"
                />
            </svg>
        ),
    },
    {
        label: "LeetCode",
        href: "https://leetcode.com/u/pavanrajputz/",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
            </svg>
        ),
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/pavanrajputz/",
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 9h4v12H4zM6 3a2.2 2.2 0 1 1 0 4.4A2.2 2.2 0 0 1 6 3zM10 9h3.8v1.7c.6-1 2-2 4-2 3.7 0 4.2 2.4 4.2 5.5V21h-4v-5.8c0-1.4 0-3.2-2-3.2s-2.2 1.5-2.2 3.1V21H10z" />
            </svg>
        ),
    },
];

type ColumnProps = {
    variant: "base" | "overlay";
    iconRefs: MutableRefObject<(HTMLSpanElement | null)[]>;
    anchorRefs?: MutableRefObject<(HTMLAnchorElement | null)[]>;
};

// Rendered twice: once in the base layer (beige, clickable),
// once in the clipped overlay (dark on red, not interactive).
function SocialColumn({ variant, iconRefs, anchorRefs }: ColumnProps) {
    const overlay = variant === "overlay";
    const boxClass = "flex h-14 w-14 items-center justify-center";

    return (
        <div
            className={`absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-3 md:left-10 ${
                overlay ? "pointer-events-none" : "z-10"
            }`}
        >
            {SOCIALS.map((s, i) => {
                const icon = (
                    <span
                        ref={(el) => {
                            iconRefs.current[i] = el;
                        }}
                        className={`block h-5 w-5 will-change-transform ${
                            overlay ? "text-[#111]" : "text-[#b9a998]"
                        }`}
                    >
            {s.icon}
          </span>
                );

                return overlay ? (
                    <div key={s.label} className={boxClass}>
                        {icon}
                    </div>
                ) : (
                    <a
                        key={s.label}
                        ref={(el) => {
                            if (anchorRefs) anchorRefs.current[i] = el;
                        }}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.label}
                        className={`${boxClass} cursor-pointer`}
                    >
                        {icon}
                    </a>
                );
            })}
        </div>
    );
}

export default function HeroSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const headlineRef = useRef<HTMLHeadingElement>(null);
    const baseIcons = useRef<(HTMLSpanElement | null)[]>([]);
    const overlayIcons = useRef<(HTMLSpanElement | null)[]>([]);
    const anchors = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        // skip on touch devices
        if (!window.matchMedia("(hover: hover)").matches) return;

        const section = sectionRef.current!;
        const overlay = overlayRef.current!;
        const headline = headlineRef.current!;

        const pos = { x: 0, y: 0 }; // circle position (smoothed)
        const size = { r: 0 }; // circle radius
        const cursor = { x: 0, y: 0 }; // raw cursor, section-relative
        const states = SOCIALS.map(() => ({ x: 0, y: 0 })); // magnet offsets
        let active = -1; // hovered button index
        let started = false;

        // one render loop: clip-path + magnet transforms (base and overlay in sync)
        const render = () => {
            overlay.style.clipPath = `circle(${size.r}px at ${pos.x}px ${pos.y}px)`;
            states.forEach((s, i) => {
                const t = `translate3d(${s.x}px, ${s.y}px, 0)`;
                const a = baseIcons.current[i];
                const b = overlayIcons.current[i];
                if (a) a.style.transform = t;
                if (b) b.style.transform = t;
            });
        };
        gsap.ticker.add(render);

        const xTo = gsap.quickTo(pos, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(pos, "y", { duration: 0.6, ease: "power3.out" });

        const updateCursor = (e: MouseEvent) => {
            const rect = section.getBoundingClientRect();
            cursor.x = e.clientX - rect.left;
            cursor.y = e.clientY - rect.top;
        };

        // decides where the circle goes and how the hovered icon moves
        const follow = () => {
            if (active >= 0) {
                const a = anchors.current[active]!.getBoundingClientRect();
                const s = section.getBoundingClientRect();
                const cx = a.left - s.left + a.width / 2;
                const cy = a.top - s.top + a.height / 2;
                const dx = (cursor.x - cx) * MAGNET;
                const dy = (cursor.y - cy) * MAGNET;
                gsap.to(states[active], { x: dx, y: dy, duration: 0.4, ease: "power3.out", overwrite: true });
                xTo(cx + dx); // circle locks onto the (pulled) icon
                yTo(cy + dy);
            } else {
                xTo(cursor.x);
                yTo(cursor.y);
            }
        };

        const growTo = (r: number, d = 0.5) =>
            gsap.to(size, { r, duration: d, ease: "power3.out", overwrite: true });

        const cleanups: (() => void)[] = [];
        const on = (el: HTMLElement, type: string, fn: (e: MouseEvent) => void) => {
            el.addEventListener(type, fn as EventListener);
            cleanups.push(() => el.removeEventListener(type, fn as EventListener));
        };

        on(section, "mousemove", (e) => {
            updateCursor(e);
            if (!started) {
                started = true;
                pos.x = cursor.x;
                pos.y = cursor.y;
                growTo(active >= 0 ? BUTTON_R : DOT_R, 0.4);
            }
            follow();
        });

        on(section, "mouseleave", () => {
            started = false;
            gsap.to(size, { r: 0, duration: 0.3, overwrite: true });
        });

        // headline: big reveal
        on(headline, "mouseenter", () => growTo(HOVER_R, 0.7));
        on(headline, "mouseleave", () => growTo(DOT_R));

        // social buttons: small circle + magnet
        anchors.current.forEach((a, i) => {
            if (!a) return;
            on(a, "mouseenter", (e) => {
                updateCursor(e);
                active = i;
                growTo(BUTTON_R);
                follow();
            });
            on(a, "mouseleave", (e) => {
                updateCursor(e);
                active = -1;
                gsap.to(states[i], { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: true });
                growTo(DOT_R);
                follow();
            });
        });

        return () => {
            gsap.ticker.remove(render);
            cleanups.forEach((fn) => fn());
            gsap.killTweensOf(pos);
            gsap.killTweensOf(size);
            states.forEach((s) => gsap.killTweensOf(s));
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
                className="absolute inset-0 h-full w-full object-cover grayscale opacity-0.08"
                src="/videos/hero-model.mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="absolute inset-0 bg-white" />

            {/* Layer 1: base content (wrapper ignores the mouse so the buttons stay clickable) */}
            <div className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center">
                <p className="mb-4 text-[10px] tracking-[0.35em] text-[#b9a998]">Pawan Kumar</p>
                <h1 ref={headlineRef} className={`${headlineClasses} pointer-events-auto cursor-default`}>
                    {BASE.map((word, i) => (
                        <span key={word + i} className={i === 1 || i === 2 ? "text-[#e04030]" : "text-[#b9a998]"}>
              {word}
            </span>
                    ))}
                </h1>

                {/* Bottom content */}
                <div className="absolute bottom-8 left-6 right-6 z-10 md:left-10 md:right-10 lg:left-16 lg:right-16">
                    <div className="flex items-end justify-between">

                        {/* Left: description + scroll */}
                        <div className="flex flex-col gap-8">
                            <p className="max-w-md text-sm leading-6 text-black/50 md:text-base">
                                I build backend systems, Android applications and digital
                                products with a focus on clean architecture, performance and
                                thoughtful interaction.
                            </p>

                            <div className="flex items-center gap-3">
                                <span className="h-8 w-px bg-black/20" />

                                <span className="text-[10px] uppercase tracking-[0.3em] text-black/40">
                    Scroll to explore
                </span>
                            </div>
                        </div>

                        {/* Right: actions */}
                        <div className="flex items-center gap-3">
                            <a
                                href="#projects"
                                className="rounded-full bg-black px-8 py-4 text-sm font-medium !text-white transition-transform duration-300 hover:scale-105"
                            >
                                Explore work
                            </a>

                            <a
                                href="#contact"
                                className="rounded-full border border-black/15 bg-white/40 px-8 py-4 text-sm font-medium !text-black transition-all duration-300 hover:border-black/40"
                            >
                                Contact
                            </a>
                        </div>

                    </div>
                </div>


            </div>

            <SocialColumn variant="base" iconRefs={baseIcons} anchorRefs={anchors} />

            {/* Layer 2: red circle + dark copies of everything, clipped to the circle */}
            <div
                ref={overlayRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20 bg-[#e04030]"
                style={{ clipPath: "circle(0px at 0px 0px)" }}
            >
                <div className="flex h-full flex-col items-center justify-center">
                    <p className="mb-4 text-[10px] tracking-[0.35em]">Pawan Kumar</p>
                    <div className={`${headlineClasses} text-[#111]`}>
                        {ALT.map((word, i) => (
                            <span key={word + i}>{word}</span>
                        ))}
                    </div>
                </div>
                <SocialColumn variant="overlay" iconRefs={overlayIcons} />
            </div>
        </section>
    );
}
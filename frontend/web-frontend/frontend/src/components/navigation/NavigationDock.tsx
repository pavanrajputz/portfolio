
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import {
    BriefcaseBusiness,
    Code2,
    Home,
    Mail,
    UserRound,
} from "lucide-react";

const dockItems = [
    { label: "Home", target: "home", icon: Home },
    { label: "Experience", target: "experience", icon: BriefcaseBusiness },
    { label: "Projects", target: "projects", icon: Code2 },
    { label: "About", target: "about", icon: UserRound },
    { label: "Contact", target: "contact", icon: Mail },
];

function NavigationDock() {
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);

    const indicatorRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const positionedRef = useRef(false);
    const previousXRef = useRef(0);
    const navigationTargetRef = useRef<number | null>(null);

    const displayIndex = hoverIndex ?? activeIndex;

    // Track both dock visibility and the section currently being viewed.
    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 100);

            const activationLine = window.innerHeight * 0.42;
            const pendingTarget = navigationTargetRef.current;

            // Keep the clicked item selected while smooth scrolling.
            if (pendingTarget !== null) {
                const targetSection = document.getElementById(
                    dockItems[pendingTarget].target
                );

                const nextItem = dockItems[pendingTarget + 1];
                const nextSection = nextItem
                    ? document.getElementById(nextItem.target)
                    : null;

                const targetReached =
                    targetSection !== null &&
                    targetSection.getBoundingClientRect().top <= activationLine &&
                    (
                        !nextSection ||
                        nextSection.getBoundingClientRect().top > activationLine
                    );

                if (!targetReached) {
                    return;
                }

                navigationTargetRef.current = null;
                setActiveIndex(pendingTarget);
                return;
            }

            // Determine which section has reached the activation line.
            let currentIndex = 0;

            dockItems.forEach((item, index) => {
                const section = document.getElementById(item.target);

                if (
                    section &&
                    section.getBoundingClientRect().top <= activationLine
                ) {
                    currentIndex = index;
                }
            });

            setActiveIndex(currentIndex);
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });
        window.addEventListener("resize", handleScroll);

        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleScroll);
        };
    }, []);

    // Move and deform the single glass lens.
    useEffect(() => {
        const indicator = indicatorRef.current;
        const button = buttonRefs.current[displayIndex];

        if (!indicator || !button) {
            return;
        }

        const targetX = button.offsetLeft;
        const targetWidth = button.offsetWidth;

        // Set the initial position without animating from the wrong place.
        if (!positionedRef.current) {
            gsap.set(indicator, {
                x: targetX,
                width: targetWidth,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
            });

            previousXRef.current = targetX;
            positionedRef.current = true;

            return;
        }

        gsap.killTweensOf(indicator);

        const direction =
            targetX >= previousXRef.current ? 1 : -1;

        const animation = gsap.timeline();

        // Stretch the glass in the direction of travel.
        animation.to(indicator, {
            x: targetX + direction * 8,
            scaleX: 1.3,
            scaleY: 0.86,
            duration: 0.22,
            ease: "power3.out",
        });

        // Settle into the destination with a soft spring.
        animation.to(indicator, {
            x: targetX,
            width: targetWidth,
            scaleX: 1,
            scaleY: 1,
            duration: 0.55,
            ease: "elastic.out(1, 0.52)",
        }, "-=0.02");

        previousXRef.current = targetX;

        return () => {
            animation.kill();
        };
    }, [displayIndex]);

    // Keep the lens aligned if the dock layout changes size.
    useEffect(() => {
        const alignIndicator = () => {
            const indicator = indicatorRef.current;
            const button = buttonRefs.current[displayIndex];

            if (!indicator || !button) {
                return;
            }

            gsap.set(indicator, {
                x: button.offsetLeft,
                width: button.offsetWidth,
                scaleX: 1,
                scaleY: 1,
            });

            previousXRef.current = button.offsetLeft;
        };

        window.addEventListener("resize", alignIndicator);

        return () => {
            window.removeEventListener("resize", alignIndicator);
        };
    }, [displayIndex]);

    const scrollToSection = (target: string, index: number) => {
        const section = document.getElementById(target);

        if (!section) {
            console.warn(`Navigation target "${target}" was not found.`);
            return;
        }

        navigationTargetRef.current = index;
        setActiveIndex(index);

        section.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    };

    return (
        <nav
            aria-label="Section navigation"
            onMouseLeave={() => setHoverIndex(null)}
            className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2
                rounded-full border border-black/10
                bg-white/70 p-2 shadow-lg backdrop-blur-2xl
                transition-all duration-500
                ${
                visible
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-20 opacity-0"
            }`}
        >
            <div className="relative flex items-center gap-1">
                {/* One shared lens travels between every icon. */}
                <div
                    ref={indicatorRef}
                    aria-hidden="true"
                    className="dock-glass-indicator"
                />

                {dockItems.map((item, index) => {
                    const Icon = item.icon;
                    const isHighlighted = displayIndex === index;

                    return (
                        <button
                            key={item.target}
                            ref={(element) => {
                                buttonRefs.current[index] = element;
                            }}
                            type="button"
                            onClick={() =>
                                scrollToSection(item.target, index)
                            }
                            onMouseEnter={() => setHoverIndex(index)}
                            aria-label={item.label}
                            aria-current={
                                activeIndex === index ? "location" : undefined
                            }
                            className={`group relative z-10 rounded-full p-3
                                transition-colors duration-200
                                focus-visible:outline-none
                                focus-visible:ring-2 focus-visible:ring-black/30
                                ${
                                isHighlighted
                                    ? "text-black"
                                    : "text-black/50 hover:text-black"
                            }`}
                        >
                            <Icon size={18} strokeWidth={1.7} />

                            <span
                                className="pointer-events-none absolute -top-9
                                    left-1/2 -translate-x-1/2 whitespace-nowrap
                                    rounded-full bg-black px-2.5 py-1
                                    text-[10px] text-white opacity-0
                                    transition-opacity duration-200
                                    group-hover:opacity-100"
                            >
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
}

export default NavigationDock;

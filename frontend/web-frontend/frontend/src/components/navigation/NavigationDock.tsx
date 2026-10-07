import { useEffect, useState } from "react";
import {
    BriefcaseBusiness,
    Code2,
    Home,
    Mail,
    UserRound,
} from "lucide-react";

const dockItems = [
    {
        label: "Home",
        target: "home",
        icon: Home,
    },
    {
        label: "Experience",
        target: "experience",
        icon: BriefcaseBusiness,
    },
    {
        label: "Projects",
        target: "projects",
        icon: Code2,
    },
    {
        label: "About",
        target: "about",
        icon: UserRound,
    },
    {
        label: "Contact",
        target: "contact",
        icon: Mail,
    },
];

function NavigationDock() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToSection = (target: string) => {
        document.getElementById(target)?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <nav
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
            <div className="flex items-center gap-1">
                {dockItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <button
                            key={item.target}
                            onClick={() => scrollToSection(item.target)}
                            aria-label={item.label}
                            className="group relative rounded-full p-3
                text-black/50 transition-all duration-300
                hover:bg-black/5 hover:text-black"
                        >
                            <Icon size={18} strokeWidth={1.7} />

                            <span
                                className="pointer-events-none absolute -top-9 left-1/2
                  -translate-x-1/2 whitespace-nowrap rounded-full
                  bg-black px-2.5 py-1 text-[10px] text-white
                  opacity-0 transition-opacity duration-200
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
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

const navItems = [
    { label: "Home", target: "home" },
    { label: "Experience", target: "experience" },
    { label: "Projects", target: "projects" },
    { label: "Contact", target: "contact" },
];

function Navigation() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 80);
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
        <header
            className={`fixed left-1/2 top-5 z-50 w-[calc(100%-32px)] max-w-7xl -translate-x-1/2
        rounded-full border border-black/5 px-5 py-3
        backdrop-blur-xl transition-all duration-500
        ${
                scrolled
                    ? "pointer-events-none -translate-y-24 opacity-0"
                    : "bg-white/50 opacity-100"
            }`}
        >
            <div className="flex items-center justify-between">
                <button
                    onClick={() => scrollToSection("home")}
                    className="text-lg font-semibold tracking-tight"
                >
                    P
                </button>

                <nav className="hidden items-center gap-8 md:flex">
                    {navItems.map((item) => (
                        <button
                            key={item.target}
                            onClick={() => scrollToSection(item.target)}
                            className="text-sm text-black/60 transition-colors hover:text-black"
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>

                <button
                    className="rounded-full p-2 md:hidden"
                    aria-label="Open navigation"
                >
                    <Menu size={20} strokeWidth={1.8} />
                </button>
            </div>
        </header>
    );
}

export default Navigation;
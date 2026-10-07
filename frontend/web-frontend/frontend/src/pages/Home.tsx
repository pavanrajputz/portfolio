import Navigation from "../components/navigation/Navigation";
import NavigationDock from "../components/navigation/NavigationDock";
import HeroSection from "../components/hero/HeroSection.tsx";

function Home() {
    return (
        <main className="bg-white text-black">
            <Navigation />
            <NavigationDock />

            <HeroSection />

            <section
                id="experience"
                className="flex min-h-screen items-center justify-center"
            >
                <h2 className="text-5xl font-semibold">Experience</h2>
            </section>

            <section
                id="projects"
                className="flex min-h-screen items-center justify-center"
            >
                <h2 className="text-5xl font-semibold">Projects</h2>
            </section>

            <section
                id="about"
                className="flex min-h-screen items-center justify-center"
            >
                <h2 className="text-5xl font-semibold">About</h2>
            </section>

            <section
                id="contact"
                className="flex min-h-screen items-center justify-center"
            >
                <h2 className="text-5xl font-semibold">Contact</h2>
            </section>
        </main>
    );
}

export default Home;
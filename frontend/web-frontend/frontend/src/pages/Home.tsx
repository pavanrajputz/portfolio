import Navigation from "../components/navigation/Navigation";
import NavigationDock from "../components/navigation/NavigationDock";
import HeroSection from "../components/hero/HeroSection.tsx";
import SoundToggle from "../components/sound/SoundToggle.tsx";
import ExperienceSection from "../components/experience/ExperienceSection";
import ProjectsSection from "../components/projects/ProjectsSection";
import AboutSection from "../components/about/AboutSection";
import ContactSection from "../components/contacts/ContactSection";

function Home() {
    return (
        <main className="bg-white text-black">
            <Navigation />
            <NavigationDock />

            <HeroSection />
            <SoundToggle />

            <ExperienceSection />

            <ProjectsSection />

            <AboutSection />

            <ContactSection />
        </main>
    );
}

export default Home;
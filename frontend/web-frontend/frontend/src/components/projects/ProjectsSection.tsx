import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Project } from "../../types/Project";
import { getProjects } from "../../services/portfolioApi";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadProjects = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getProjects();

                setProjects(data);
            } catch (err) {
                console.error("Failed to load projects:", err);
                setError("Unable to load projects.");
            } finally {
                setLoading(false);
            }
        };

        loadProjects();
    }, []);

    useEffect(() => {
        if (loading || error || projects.length === 0) {
            return;
        }

        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.from(".projects-heading", {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                },
            });

            gsap.from(".project-card", {
                y: 100,
                opacity: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".projects-grid",
                    start: "top 80%",
                },
            });
        }, section);

        return () => ctx.revert();
    }, [loading, error, projects]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="projects-section"
        >
            <div className="projects-container">

                <div className="projects-heading">
                    <p className="projects-eyebrow">
                        02 / PROJECTS
                    </p>

                    <h2>
                        Things I&apos;ve
                        <br />
                        <span>built.</span>
                    </h2>

                    <p className="projects-intro">
                        A selection of applications and systems I&apos;ve
                        designed, developed, and brought to life.
                    </p>
                </div>

                {loading && (
                    <div className="projects-status">
                        Loading projects...
                    </div>
                )}

                {error && (
                    <div className="projects-status projects-status--error">
                        {error}
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="projects-status">
                        No projects available.
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div className="projects-grid">
                        {projects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
};

export default ProjectsSection;
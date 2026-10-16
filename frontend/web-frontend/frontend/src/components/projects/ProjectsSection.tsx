import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Project } from "../../types/Project";
import { getProjects } from "../../services/portfolioApi";
import ProjectCard from "./ProjectCard";

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);

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
        if (loading) {
            return;
        }

        const section = sectionRef.current;
        const stack = stackRef.current;

        if (!section) {
            return;
        }

        const media = gsap.matchMedia();

        const ctx = gsap.context(() => {
            // Animate the heading independently from the project cards.
            gsap.from(".projects-heading", {
                y: 65,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                    once: true,
                },
            });

            if (error || !stack || projects.length === 0) {
                return;
            }

            // Desktop: stacked sticky cards.
            media.add("(min-width: 769px)", () => {
                const cards = gsap.utils.toArray<HTMLElement>(
                    ".project-card",
                    stack
                );

                cards.forEach((currentCard, index) => {
                    if (index === 0) {
                        return;
                    }

                    const previousSurface =
                        cards[index - 1].querySelector<HTMLElement>(
                            ".project-card__surface"
                        );

                    if (!previousSurface) {
                        return;
                    }

                    // As the next card rises over the current one,
                    // push the previous surface slightly back visually.
                    gsap.to(previousSurface, {
                        scale: 0.94,
                        y: -20,
                        filter: "brightness(0.72) saturate(0.85)",
                        transformOrigin: "center top",
                        ease: "none",
                        scrollTrigger: {
                            trigger: currentCard,
                            start: "top 88%",
                            end: "top 180px",
                            scrub: 0.7,
                            invalidateOnRefresh: true,
                        },
                    });
                });
            });

            // Mobile: retain a simple, readable vertical list.
            media.add("(max-width: 768px)", () => {
                const surfaces = gsap.utils.toArray<HTMLElement>(
                    ".project-card__surface",
                    stack
                );

                surfaces.forEach((surface) => {
                    gsap.from(surface, {
                        opacity: 0,
                        y: 28,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: surface,
                            start: "top 92%",
                            toggleActions: "play none none reverse",
                        },
                    });
                });
            });
        }, section);

        return () => {
            ctx.revert();
            media.revert();
        };
    }, [loading, error, projects]);

    return (
        <section
            ref={sectionRef}
            id="projects"
            className="projects-section"
        >
            <div className="projects-container">
                <header className="projects-heading">
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
                </header>

                {loading && (
                    <div className="projects-status">
                        Loading projects...
                    </div>
                )}

                {error && (
                    <div
                        className="projects-status projects-status--error"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {!loading && !error && projects.length === 0 && (
                    <div className="projects-status">
                        No projects available.
                    </div>
                )}

                {!loading && !error && projects.length > 0 && (
                    <div
                        ref={stackRef}
                        className="projects-stack"
                        aria-label="Selected projects"
                    >
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
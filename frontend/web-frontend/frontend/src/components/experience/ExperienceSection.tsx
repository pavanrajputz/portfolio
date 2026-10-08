import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Experience } from "../../types/Experience";
import { getExperiences } from "../../services/portfolioApi";
import ExperienceCard from "./ExperienceCard";

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const pathRef = useRef<HTMLDivElement>(null);

    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadExperiences = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getExperiences();

                setExperiences(data);
            } catch (err) {
                console.error("Failed to load experiences:", err);
                setError("Unable to load experience.");
            } finally {
                setLoading(false);
            }
        };

        loadExperiences();
    }, []);

    useEffect(() => {
        if (loading || error || experiences.length === 0) {
            return;
        }

        const section = sectionRef.current;
        const path = pathRef.current;

        if (!section || !path) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.from(".experience-heading", {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                },
            });

            gsap.from(".experience-card", {
                y: 100,
                opacity: 0,
                duration: 0.9,
                stagger: 0.18,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".experience-list",
                    start: "top 75%",
                },
            });

            gsap.fromTo(
                path,
                {
                    scaleY: 0,
                    transformOrigin: "top center",
                },
                {
                    scaleY: 1,
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".experience-list",
                        start: "top 70%",
                        end: "bottom 75%",
                        scrub: true,
                    },
                }
            );
        }, section);

        return () => ctx.revert();
    }, [loading, error, experiences]);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="experience-section"
        >
            <div className="experience-container">

                <div className="experience-heading">
                    <p className="experience-eyebrow">
                        01 / EXPERIENCE
                    </p>

                    <h2>
                        Where I&apos;ve
                        <br />
                        <span>been building.</span>
                    </h2>

                    <p className="experience-intro">
                        A timeline of the places, roles, and technologies
                        that have shaped my journey as a developer.
                    </p>
                </div>

                {loading && (
                    <div className="experience-status">
                        Loading experience...
                    </div>
                )}

                {error && (
                    <div className="experience-status experience-status--error">
                        {error}
                    </div>
                )}

                {!loading && !error && experiences.length === 0 && (
                    <div className="experience-status">
                        No experience available.
                    </div>
                )}

                {!loading && !error && experiences.length > 0 && (
                    <div className="experience-list">

                        <div
                            ref={pathRef}
                            className="experience-path"
                        />

                        {experiences.map((experience, index) => (
                            <ExperienceCard
                                key={experience.id}
                                experience={experience}
                                index={index}
                            />
                        ))}

                    </div>
                )}

            </div>
        </section>
    );
};

export default ExperienceSection;
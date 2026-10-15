import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Profile } from "../../types/Profile";
import type { Skill } from "../../types/Skill";
import type { Education } from "../../types/Education";
import type { Certificate } from "../../types/Certificate";

import {
    getProfile,
    getSkills,
    getEducation,
    getCertificates,
} from "../../services/portfolioApi";

import ProfileBlock from "./ProfileBlock";
import SkillsBlock from "./SkillsBlock";
import EducationBlock from "./EducationBlock";
import CertificatesBlock from "./CertificatesBlock";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    const [profile, setProfile] = useState<Profile | null>(null);
    const [skills, setSkills] = useState<Skill[]>([]);
    const [education, setEducation] = useState<Education[]>([]);
    const [certificates, setCertificates] = useState<Certificate[]>([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadAboutData = async () => {
            setLoading(true);
            setError(null);

            const results = await Promise.allSettled([
                getProfile(),
                getSkills(),
                getEducation(),
                getCertificates(),
            ]);

            const [profileResult, skillsResult, educationResult, certificatesResult] =
                results;

            if (profileResult.status === "fulfilled") {
                setProfile(profileResult.value);
            } else {
                console.error("Failed to load profile:", profileResult.reason);
            }

            if (skillsResult.status === "fulfilled") {
                setSkills(skillsResult.value);
            } else {
                console.error("Failed to load skills:", skillsResult.reason);
            }

            if (educationResult.status === "fulfilled") {
                setEducation(educationResult.value);
            } else {
                console.error("Failed to load education:", educationResult.reason);
            }

            if (certificatesResult.status === "fulfilled") {
                setCertificates(certificatesResult.value);
            } else {
                console.error(
                    "Failed to load certificates:",
                    certificatesResult.reason
                );
            }

            const failedModules = results.reduce<string[]>(
                (failed, result, index) => {
                    if (result.status === "rejected") {
                        failed.push(
                            ["Profile", "Skills", "Education", "Certificates"][index]
                        );
                    }
                    return failed;
                },
                []
            );

            if (failedModules.length > 0) {
                setError(
                    `Some About data could not be loaded: ${failedModules.join(", ")}.`
                );
            }

            setLoading(false);
        };

        loadAboutData();
    }, []);

    useEffect(() => {
        if (loading) {
            return;
        }

        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.from(".about-heading", {
                y: 80,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: section,
                    start: "top 75%",
                },
            });

            gsap.from(".about-block", {
                y: 80,
                opacity: 0,
                duration: 0.9,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".about-content",
                    start: "top 80%",
                },
            });
        }, section);

        return () => ctx.revert();
    }, [loading, error]);

    return (
        <section
            ref={sectionRef}
            id="about"
            className="about-section"
        >
            <div className="about-container">

                <div className="about-heading">
                    <p className="about-eyebrow">
                        03 / ABOUT
                    </p>

                    <h2>
                        More than
                        <br />
                        <span>just code.</span>
                    </h2>

                    <p className="about-intro">
                        A closer look at who I am, what I work with,
                        and the experiences that shaped the developer
                        I am today.
                    </p>
                </div>

                {loading && (
                    <div className="about-status">
                        Loading...
                    </div>
                )}

                {error && (
                    <div className="about-status about-status--error">
                        {error}
                    </div>
                )}

                {!loading && (
                    <div className="about-content">
                        {profile && (
                            <div className="about-block about-profile">
                                <ProfileBlock profile={profile} />
                            </div>
                        )}

                        <div className="about-block about-skills">
                            <SkillsBlock skills={skills} />
                        </div>

                        <div className="about-block about-education">
                            <EducationBlock education={education} />
                        </div>

                        <div className="about-block about-certificates">
                            <CertificatesBlock certificates={certificates} />
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
};

export default AboutSection;
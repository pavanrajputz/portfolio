import type { CSSProperties } from "react";
import { ArrowUpRight } from "lucide-react";

import type { Project } from "../../types/Project";

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
    const technologies =
        project.technologies
            ?.split(",")
            .map((technology) => technology.trim())
            .filter(Boolean) ?? [];

    const projectNumber = String(index + 1).padStart(2, "0");

    const stackStyle = {
        "--project-stack-top": `${108 + Math.min(index, 3) * 18}px`,
        zIndex: index + 1,
    } as CSSProperties;

    return (
        <article
            className="project-card"
            style={stackStyle}
            aria-label={`Project ${projectNumber}: ${project.title}`}
        >
            <div className="project-card__surface">
                <div className="project-card__topline">
                    <span>SELECTED WORK / {projectNumber}</span>

                    {project.featured && (
                        <span className="project-card__featured">
                            FEATURED
                        </span>
                    )}
                </div>

                <div className="project-card__layout">
                    <div className="project-card__details">
                        <p className="project-card__eyebrow">
                            PROJECT {projectNumber}
                        </p>

                        <h3>{project.title}</h3>

                        {project.description && (
                            <p className="project-card__description">
                                {project.description}
                            </p>
                        )}

                        {technologies.length > 0 && (
                            <div className="project-card__technologies">
                                {technologies.map((technology) => (
                                    <span key={technology}>
                                        {technology}
                                    </span>
                                ))}
                            </div>
                        )}

                        <div className="project-card__links">
                            {project.githubUrl && (
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>View source</span>
                                    <ArrowUpRight size={17} />
                                </a>
                            )}

                            {project.liveUrl && (
                                <a
                                    href={project.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span>Live project</span>
                                    <ArrowUpRight size={17} />
                                </a>
                            )}

                            {!project.githubUrl && !project.liveUrl && (
                                <span className="project-card__no-links">
                                    Project details
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="project-card__visual">
                        {project.imageUrl ? (
                            <img
                                src={project.imageUrl}
                                alt={`${project.title} preview`}
                                className="project-card__image"
                                loading={index === 0 ? "eager" : "lazy"}
                            />
                        ) : (
                            <div className="project-card__image-placeholder">
                                <span>PREVIEW NOT AVAILABLE</span>
                                <strong>{projectNumber}</strong>
                            </div>
                        )}

                        <span
                            className="project-card__visual-index"
                            aria-hidden="true"
                        >
                            {projectNumber}
                        </span>

                        <span className="project-card__visual-label">
                            {project.liveUrl
                                ? "LIVE PROJECT ↗"
                                : "PROJECT PREVIEW"}
                        </span>
                    </div>
                </div>

                <div className="project-card__footer">
                    <span>DESIGN / DEVELOPMENT / ENGINEERING</span>
                    <span>SCROLL TO EXPLORE ↓</span>
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
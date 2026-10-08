import type { Project } from "../../types/Project";

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard = ({
                         project,
                         index,
                     }: ProjectCardProps) => {
    const technologies =
        project.technologies
            ?.split(",")
            .map((technology) => technology.trim())
            .filter(Boolean) ?? [];

    return (
        <article className="project-card">
            <div className="project-card__number">
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="project-card__image-wrapper">
                {project.imageUrl ? (
                    <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="project-card__image"
                    />
                ) : (
                    <div className="project-card__image-placeholder">
                        No preview
                    </div>
                )}

                {project.featured && (
                    <span className="project-card__featured">
            FEATURED
          </span>
                )}
            </div>

            <div className="project-card__content">
                <h3>{project.title}</h3>

                {project.description && (
                    <p>{project.description}</p>
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
                            GitHub
                        </a>
                    )}

                    {project.liveUrl && (
                        <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Project
                        </a>
                    )}
                </div>
            </div>
        </article>
    );
};

export default ProjectCard;
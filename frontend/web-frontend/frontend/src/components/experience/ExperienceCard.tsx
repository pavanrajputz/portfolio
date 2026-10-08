import type { Experience } from "../../types/Experience";

interface ExperienceCardProps {
    experience: Experience;
    index: number;
}

const ExperienceCard = ({
                            experience,
                            index,
                        }: ExperienceCardProps) => {
    const formatDate = (date?: string | null) => {
        if (!date) return "Present";

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <article className="experience-card">
            <div className="experience-card__index">
                {String(index + 1).padStart(2, "0")}
            </div>

            <div className="experience-card__content">
                <div className="experience-card__date">
                    {formatDate(experience.startDate)}
                    {" — "}
                    {experience.currentlyWorking
                        ? "Present"
                        : formatDate(experience.endDate)}
                </div>

                <h3>{experience.position}</h3>

                <h4>
                    {experience.company}
                    {experience.location && ` · ${experience.location}`}
                </h4>

                {experience.description && (
                    <p>{experience.description}</p>
                )}

                {experience.technologies && (
                    <div className="experience-card__technologies">
                        {experience.technologies
                            .split(",")
                            .map((technology) => (
                                <span key={technology.trim()}>
                  {technology.trim()}
                </span>
                            ))}
                    </div>
                )}
            </div>

            {experience.currentlyWorking && (
                <div className="experience-card__current">
                    <span />
                    CURRENT
                </div>
            )}
        </article>
    );
};

export default ExperienceCard;
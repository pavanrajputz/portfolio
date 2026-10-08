import type { Education } from "../../types/Education";

interface EducationBlockProps {
    education: Education[];
}

const EducationBlock = ({
                            education,
                        }: EducationBlockProps) => {
    const formatDate = (date?: string | null) => {
        if (!date) {
            return "Present";
        }

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="education-block">
            <div className="education-block__header">
                <p className="education-block__eyebrow">
                    EDUCATION
                </p>

                <h3>
                    Where I
                    <br />
                    <span>learned.</span>
                </h3>
            </div>

            <div className="education-block__list">
                {education.map((item, index) => (
                    <article
                        key={item.id}
                        className="education-item"
                    >
                        <div className="education-item__number">
                            {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="education-item__content">
                            <div className="education-item__date">
                                {formatDate(item.startDate)}
                                {" — "}
                                {item.currentlyStudying
                                    ? "Present"
                                    : formatDate(item.endDate)}
                            </div>

                            <h4>{item.degree}</h4>

                            {item.fieldOfStudy && (
                                <p className="education-item__field">
                                    {item.fieldOfStudy}
                                </p>
                            )}

                            <p className="education-item__institution">
                                {item.institution}
                                {item.location &&
                                    ` · ${item.location}`}
                            </p>

                            {item.description && (
                                <p className="education-item__description">
                                    {item.description}
                                </p>
                            )}

                            {item.grade && (
                                <span className="education-item__grade">
                  {item.grade}
                </span>
                            )}
                        </div>

                        {item.currentlyStudying && (
                            <span className="education-item__current">
                CURRENT
              </span>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
};

export default EducationBlock;
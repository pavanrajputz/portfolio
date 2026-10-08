import type { Skill } from "../../types/Skill";

interface SkillsBlockProps {
    skills: Skill[];
}

const SkillsBlock = ({ skills }: SkillsBlockProps) => {
    return (
        <div className="skills-block">
            <div className="skills-block__header">
                <p className="skills-block__eyebrow">
                    SKILLS
                </p>

                <h3>
                    Tools I
                    <br />
                    <span>work with.</span>
                </h3>
            </div>

            <div className="skills-block__list">
                {skills.map((skill) => (
                    <div
                        key={skill.id}
                        className="skill-item"
                    >
                        <div className="skill-item__top">
                            <div>
                <span className="skill-item__name">
                  {skill.name}
                </span>

                                {skill.category && (
                                    <span className="skill-item__category">
                    {skill.category}
                  </span>
                                )}
                            </div>

                            {skill.proficiency !== null && (
                                <span className="skill-item__percentage">
                  {skill.proficiency}%
                </span>
                            )}
                        </div>

                        {skill.proficiency !== null && (
                            <div className="skill-item__track">
                                <div
                                    className="skill-item__progress"
                                    style={{
                                        width: `${Math.min(
                                            Math.max(skill.proficiency, 0),
                                            100
                                        )}%`,
                                    }}
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkillsBlock;
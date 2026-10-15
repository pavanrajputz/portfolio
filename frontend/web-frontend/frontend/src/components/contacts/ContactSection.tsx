
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

import { submitContactMessage } from "../../services/portfolioApi";
import type { ContactMessagePayload } from "../../services/portfolioApi";

type Feedback = {
    type: "success" | "error";
    message: string;
};

const initialForm: ContactMessagePayload = {
    name: "",
    email: "",
    subject: "",
    message: "",
};

function ContactSection() {
    const [form, setForm] =
        useState<ContactMessagePayload>({ ...initialForm });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState<Feedback | null>(null);

    const handleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.currentTarget;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setFeedback(null);
    };

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setIsSubmitting(true);
        setFeedback(null);

        try {
            await submitContactMessage(form);

            setForm({ ...initialForm });
            setFeedback({
                type: "success",
                message: "Message sent successfully. Thank you for reaching out.",
            });
        } catch (error) {
            console.error("Failed to submit contact message:", error);

            setFeedback({
                type: "error",
                message:
                    "Your message could not be sent. Please check your connection and try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                <header className="contact-heading">
                    <p className="contact-eyebrow">
                        04 / CONTACT
                    </p>

                    <h2>
                        Let&apos;s start a
                        <br />
                        <span>conversation.</span>
                    </h2>

                    <p className="contact-intro">
                        Have a project, question, or collaboration in mind?
                        Share a few details and let&apos;s take it from there.
                    </p>
                </header>

                <div className="contact-layout">
                    <aside className="contact-aside">
                        <p className="contact-aside__eyebrow">
                            A GOOD PLACE TO START
                        </p>

                        <h3>
                            Tell me what
                            <br />
                            you&apos;re thinking.
                        </h3>

                        <p>
                            Whether it&apos;s a project, a technical question,
                            or a potential collaboration, share a little
                            context and we can take it from there.
                        </p>

                        <div className="contact-aside__footer">
                            <span>AREAS OF INTEREST</span>
                            <p>
                                Backend systems · Android apps · Digital products
                            </p>
                        </div>
                    </aside>

                    <form
                        className="contact-form"
                        onSubmit={handleSubmit}
                    >
                        <div className="contact-form__grid">
                            <div className="contact-field">
                                <label htmlFor="contact-name">
                                    Full name
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                    autoComplete="name"
                                    maxLength={100}
                                    required
                                />
                            </div>

                            <div className="contact-field">
                                <label htmlFor="contact-email">
                                    Email address
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    maxLength={150}
                                    required
                                />
                            </div>

                            <div className="contact-field contact-field--full">
                                <label htmlFor="contact-subject">
                                    Subject <span>(optional)</span>
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    value={form.subject}
                                    onChange={handleChange}
                                    placeholder="What is this about?"
                                    maxLength={200}
                                />
                            </div>

                            <div className="contact-field contact-field--full">
                                <label htmlFor="contact-message">
                                    Your message
                                </label>
                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={form.message}
                                    onChange={handleChange}
                                    placeholder="Tell me a little about it..."
                                    rows={5}
                                    maxLength={5000}
                                    required
                                />
                            </div>
                        </div>

                        <div className="contact-form__actions">
                            <button
                                type="submit"
                                className="contact-submit"
                                disabled={isSubmitting}
                            >
                                <span>
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send message"}
                                </span>
                                <ArrowUpRight
                                    size={18}
                                    strokeWidth={1.8}
                                />
                            </button>

                            {feedback && (
                                <p
                                    id="contact-feedback"
                                    className={`contact-feedback contact-feedback--${feedback.type}`}
                                    role={
                                        feedback.type === "error"
                                            ? "alert"
                                            : "status"
                                    }
                                >
                                    {feedback.message}
                                </p>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;

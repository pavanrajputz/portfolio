import type { Certificate } from "../../types/Certificate";

interface CertificatesBlockProps {
    certificates: Certificate[];
}

const CertificatesBlock = ({
                               certificates,
                           }: CertificatesBlockProps) => {
    const formatDate = (date?: string | null) => {
        if (!date) {
            return null;
        }

        return new Date(date).toLocaleDateString("en-US", {
            month: "short",
            year: "numeric",
        });
    };

    return (
        <div className="certificates-block">
            <div className="certificates-block__header">
                <p className="certificates-block__eyebrow">
                    CERTIFICATES
                </p>

                <h3>
                    Things I&apos;ve
                    <br />
                    <span>earned.</span>
                </h3>
            </div>

            <div className="certificates-block__list">
                {certificates.map((certificate, index) => (
                    <article
                        key={certificate.id}
                        className="certificate-item"
                    >
                        <div className="certificate-item__number">
                            {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="certificate-item__content">
                            <div className="certificate-item__date">
                                {formatDate(certificate.issueDate)}

                                {certificate.expiryDate &&
                                    ` — ${formatDate(certificate.expiryDate)}`}
                            </div>

                            <h4>{certificate.title}</h4>

                            <p className="certificate-item__issuer">
                                {certificate.issuer}
                            </p>

                            {certificate.description && (
                                <p className="certificate-item__description">
                                    {certificate.description}
                                </p>
                            )}

                            {certificate.credentialId && (
                                <p className="certificate-item__credential">
                                    Credential ID:{" "}
                                    <span>{certificate.credentialId}</span>
                                </p>
                            )}

                            {certificate.credentialUrl && (
                                <a
                                    href={certificate.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="certificate-item__link"
                                >
                                    Verify Certificate
                                </a>
                            )}
                        </div>

                        {certificate.certificateImageUrl && (
                            <div className="certificate-item__image">
                                <img
                                    src={certificate.certificateImageUrl}
                                    alt={certificate.title}
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
};

export default CertificatesBlock;
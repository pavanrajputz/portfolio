import type { Profile } from "../../types/Profile";

interface ProfileBlockProps {
    profile: Profile;
}

const ProfileBlock = ({ profile }: ProfileBlockProps) => {
    return (
        <div className="profile-block">
            <div className="profile-block__image-wrapper">
                {profile.profileImageUrl ? (
                    <img
                        src={profile.profileImageUrl}
                        alt={profile.name}
                        className="profile-block__image"
                    />
                ) : (
                    <div className="profile-block__image-placeholder">
                        {profile.name.charAt(0)}
                    </div>
                )}
            </div>

            <div className="profile-block__content">
                <p className="profile-block__eyebrow">
                    A LITTLE ABOUT ME
                </p>

                <h3>{profile.name}</h3>

                {profile.headline && (
                    <p className="profile-block__headline">
                        {profile.headline}
                    </p>
                )}

                {profile.bio && (
                    <p className="profile-block__bio">
                        {profile.bio}
                    </p>
                )}

                <div className="profile-block__details">
                    {profile.location && (
                        <div>
                            <span>Location</span>
                            <strong>{profile.location}</strong>
                        </div>
                    )}

                    {profile.email && (
                        <div>
                            <span>Email</span>
                            <a href={`mailto:${profile.email}`}>
                                {profile.email}
                            </a>
                        </div>
                    )}
                </div>

                {profile.resumeUrl && (
                    <a
                        href={profile.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="profile-block__resume"
                    >
                        View Resume
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProfileBlock;
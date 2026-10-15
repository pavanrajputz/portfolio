
import { useEffect, useState, type FormEvent } from "react";
import {
    Camera,
    Globe,
    Mail,
    Phone,
    MapPin,
    Save,
    LoaderCircle,
} from "lucide-react";

import { FaGithub, FaLinkedin } from "react-icons/fa";

import {
    getProfile,
    updateProfile,
} from "../../services/profileService";

import type {
    ProfileRequest,
} from "../../types/profile";

const emptyProfile: ProfileRequest = {
    name: "",
    headline: "",
    bio: "",
    profileImageUrl: "",
    email: "",
    phone: "",
    location: "",
    resumeUrl: "",
};

const inputClass =
    "w-full rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-600 focus:border-zinc-600";

function Profile() {
    const [form, setForm] = useState<ProfileRequest>(emptyProfile);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadProfile = async () => {
            try {
                const profile = await getProfile();

                if (cancelled) return;

                setForm({
                    name: profile.name ?? "",
                    headline: profile.headline ?? "",
                    bio: profile.bio ?? "",
                    profileImageUrl: profile.profileImageUrl ?? "",
                    email: profile.email ?? "",
                    phone: profile.phone ?? "",
                    location: profile.location ?? "",
                    resumeUrl: profile.resumeUrl ?? "",
                });
            } catch (err) {
                if (cancelled) return;

                console.error("Failed to load profile:", err);
                setError("Failed to load profile. Check the backend response and try again.");
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        void loadProfile();

        return () => {
            cancelled = true;
        };
    }, []);

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));

        setError(null);
        setSuccess(null);
    };

    const handleSave = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!form.name.trim()) {
            setError("Full name is required.");
            return;
        }

        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            const saved = await updateProfile({
                ...form,
                name: form.name.trim(),
            });

            setForm({
                name: saved.name ?? "",
                headline: saved.headline ?? "",
                bio: saved.bio ?? "",
                profileImageUrl: saved.profileImageUrl ?? "",
                email: saved.email ?? "",
                phone: saved.phone ?? "",
                location: saved.location ?? "",
                resumeUrl: saved.resumeUrl ?? "",
            });

            setSuccess("Profile changes saved successfully.");
        } catch (err) {
            console.error("Failed to save profile:", err);
            setError("Failed to save changes. Please check your connection and backend response.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center gap-3 text-sm text-zinc-500">
                <LoaderCircle size={18} className="animate-spin" />
                Loading profile...
            </div>
        );
    }

    return (
        <form onSubmit={handleSave} className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Profile
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the information displayed on your public profile.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? (
                        <LoaderCircle size={16} className="animate-spin" />
                    ) : (
                        <Save size={16} />
                    )}
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            {error && (
                <div role="alert" className="rounded-lg border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {success && (
                <div role="status" className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">
                    {success}
                </div>
            )}

            <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-800">
                        {form.profileImageUrl ? (
                            <img
                                src={form.profileImageUrl}
                                alt="Profile"
                                className="h-full w-full object-cover"
                                onError={(event) => {
                                    event.currentTarget.style.display = "none";
                                }}
                            />
                        ) : (
                            <span className="text-2xl font-semibold text-zinc-400">
                                {form.name.trim().charAt(0).toUpperCase() || "?"}
                            </span>
                        )}
                        <Camera
                            size={15}
                            className="absolute bottom-1 right-1 rounded-full bg-zinc-700 p-1 text-white"
                        />
                    </div>

                    <div>
                        <h2 className="text-xl font-medium">
                            {form.name || "Your Name"}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-500">
                            {form.headline || "Professional title"}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            Profile information
                        </div>
                    </div>
                </div>
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-medium">Basic Information</h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        Your basic professional information.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                    <Field label="Professional Title" name="headline" value={form.headline} onChange={handleChange} />
                    <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} icon={<Mail size={14} />} />
                    <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} icon={<Phone size={14} />} />
                    <Field label="Location" name="location" value={form.location} onChange={handleChange} icon={<MapPin size={14} />} />
                    <Field label="Website / Resume URL" name="resumeUrl" type="url" value={form.resumeUrl} onChange={handleChange} icon={<Globe size={14} />} placeholder="https://..." />
                    <Field label="Profile Image URL" name="profileImageUrl" type="url" value={form.profileImageUrl} onChange={handleChange} placeholder="https://..." />
                </div>
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-medium">About</h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        Write a short professional introduction for your portfolio.
                    </p>
                </div>

                <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={6}
                    maxLength={5000}
                    placeholder="Tell visitors about yourself..."
                    className={`${inputClass} resize-y`}
                />
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">
                <div className="mb-6">
                    <h2 className="text-lg font-medium">Social Links</h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        These are managed separately through the Social Links section.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
                        <FaGithub size={16} />
                        GitHub links are managed separately.
                    </div>
                    <div className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-400">
                        <FaLinkedin size={16} />
                        LinkedIn links are managed separately.
                    </div>
                </div>
            </section>
        </form>
    );
}

interface FieldProps {
    label: string;
    name: keyof ProfileRequest;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    required?: boolean;
    icon?: React.ReactNode;
}

function Field({
                   label,
                   name,
                   value,
                   onChange,
                   type = "text",
                   placeholder,
                   required = false,
                   icon,
               }: FieldProps) {
    return (
        <div>
            <label htmlFor={name} className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                {icon}
                {label}
            </label>
            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={inputClass}
            />
        </div>
    );
}

export default Profile;

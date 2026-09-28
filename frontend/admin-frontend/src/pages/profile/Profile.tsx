
import{
    Camera,
    Globe,
    Mail,
    Phone,
    MapPin,
    Save,
} from "lucide-react"

import {
    FaGithub,
    FaLinkedin,
} from "react-icons/fa";

function Profile() {
    return (
        <div className="space-y-8">

        {/*    page header*/}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Profile
                    </h1>
                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the information displayed on your public profile.
                    </p>
                </div>

                <button
                    className="flex items-center gap-2 rounded-lg bg-white px-4 py-2.5
                    text-sm font-medium text-black transition-opacity hover:opacity-90">
                    <Save size={16} />
                    Save Changes
                </button>
            </div>

        {/*    Profile header*/}
            <section className="rounded-xl border border-zinc-800 bg-800/40 p-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                {/*    Profile image*/}
                    <div className="relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-zinc-800">
                            <span className="text-2xl font-semibold text-zinc-400">
                                A
                            </span>
                        </div>

                        <button
                            className="absolute bottom-0 right-0 flex h-8 w-8
                            items-center justify-center rounded-full border
                            border-zinc-800 bg-zinc-700 text-white
                            hover:bg-zinc-600">
                            <Camera size={15}/>
                        </button>
                    </div>

                {/*    Profile information*/}
                    <div>
                        <h2 className="text-xl font-medium">
                            Admin
                        </h2>

                        <p className="mt-1 text-sm text-zinc-500">
                            Full Stack Developer
                        </p>

                        <div className="mt-3 flex items-center gap-2 text-xs text-emrald-400">
                            <span className="h-2 w-2 rounded-full bg-emerald-400"/>
                            Public profile active
                        </div>
                    </div>
                </div>
            </section>


        {/*    Basic Information*/}
            <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

                <div className="mb-6">
                    <h2 className="text-lg font-medium">
                        Basic Informatioin
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Your basic professional information.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/*    Full name*/}
                    <div>
                        <label className="mb-2 block text-sm text-zinc-400">
                            Full Name
                        </label>

                        <input
                            type="text"
                            defaultValue="Admin"
                            className="w-full rounded-lg border border-zinc-800
                            bg-zinc-950 px-4 py-3 text-sm text-white
                            outline-none transition-colors
                            placeholder:text-zince-600
                            focus:border-zinc-600"
                            />
                    </div>

                {/*    Professional Title */}
                    <div>
                        <label className="mb-2 block text-sm text-zinc-400">
                            Professional Title
                        </label>

                        <input
                            type="text"
                            defaultValue="Full Stack Developer"
                            className="w-full rounded-lg border border-zinc-800
                            bg-zinc-950 px-4 py-3 text-sm text-white
                            outline-none transition-colors
                            focus:border-zinc-600"
                            />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                            <Mail size={14} />
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="your@email.com"
                            className="w-full rounded-lg border border-zinc-800
              bg-zinc-950 px-4 py-3 text-sm text-white
              outline-none transition-colors
              focus:border-zinc-600"
                        />
                    </div>

                    {/* Phone */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                            <Phone size={14} />
                            Phone
                        </label>

                        <input
                            type="tel"
                            placeholder="+91 00000 00000"
                            className="w-full rounded-lg border border-zinc-800
              bg-zinc-950 px-4 py-3 text-sm text-white
              outline-none transition-colors
              focus:border-zinc-600"
                        />
                    </div>

                    {/* Location */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                            <MapPin size={14} />
                            Location
                        </label>

                        <input
                            type="text"
                            placeholder="City, Country"
                            className="w-full rounded-lg border border-zinc-800
              bg-zinc-950 px-4 py-3 text-sm text-white
              outline-none transition-colors
              focus:border-zinc-600"
                        />
                    </div>


                    {/* Website */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                            <Globe size={14} />
                            Website
                        </label>

                        <input
                            type="url"
                            placeholder="https://yourwebsite.com"
                            className="w-full rounded-lg border border-zinc-800
              bg-zinc-950 px-4 py-3 text-sm text-white
              outline-none transition-colors
              focus:border-zinc-600"
                        />
                    </div>
                </div>
            </section>


            {/* About */}
            <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

                <div className="mb-6">
                    <h2 className="text-lg font-medium">
                        About
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Write a short professional introduction for your portfolio.
                    </p>
                </div>

                <textarea
                    rows={6}
                    placeholder="Tell visitors about yourself..."
                    className="w-full resize-none rounded-lg border border-zinc-800
          bg-zinc-950 px-4 py-3 text-sm text-white
          outline-none transition-colors
          placeholder:text-zinc-600
          focus:border-zinc-600"
                />

            </section>


            {/* Social Links */}
            <section className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-6">

                <div className="mb-6">
                    <h2 className="text-lg font-medium">
                        Social Links
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                        Connect your professional social profiles.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                    {/* GitHub */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                            <FaGithub size={15} />
                            GitHub
                        </label>

                        <input
                            type="url"
                            placeholder="https://github.com/username"
                            className="w-full rounded-lg border border-zinc-800
              bg-zinc-950 px-4 py-3 text-sm text-white
              outline-none focus:border-zinc-600"
                        />
                    </div>
                    {/* LinkedIn */}
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-sm text-zinc-400">
                            <FaLinkedin size={15} />
                            LinkedIn
                        </label>

                        <input
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            className="w-full rounded-lg border border-zinc-800
              bg-zinc-950 px-4 py-3 text-sm text-white
              outline-none focus:border-zinc-600"
                        />
                    </div>

                </div>

            </section>


        </div>
    )
}

export default Profile;
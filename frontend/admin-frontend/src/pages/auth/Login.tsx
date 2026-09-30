import {useState, type FormEvent} from "react";
import {
    ArrowRight,
    LockKeyhole,
    Mail,
} from "lucide-react";

import {useNavigate} from "react-router-dom";
import {useAuth} from "../../context/AuthContext";

function Login() {
    const navigate = useNavigate();
    const {login} = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (
        event: FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            await login({
                email,
                password,
            });

            navigate("/admin", {
                replace: true,
            });
        } catch (error) {
            console.error("Login failed:", error);

            setError(
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-white">
            <div className="flex min-h-screen items-center justify-center px-6">
                <div className="w-full max-w-md">

                    <div className="mb-10 text-center">
                        <div
                            className="mx-auto mb-5 flex h-12 w-12
                            items-center justify-center rounded-xl
                            border border-zinc-800
                            bg-zinc-900"
                        >
                            <LockKeyhole
                                size={21}
                                className="text-zinc-300"
                            />
                        </div>

                        <h1
                            className="text-2xl font-semibold
                            tracking-tight"
                        >
                            Admin Panel
                        </h1>

                        <p
                            className="mt-2 text-sm
                            text-zinc-500"
                        >
                            Sign in to manage your portfolio.
                        </p>
                    </div>

                    <div
                        className="rounded-2xl border
                        border-zinc-800 bg-zinc-900/40 p-7"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm
                                    font-medium text-zinc-300"
                                >
                                    Email
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={17}
                                        className="absolute left-3
                                        top-1/2 -translate-y-1/2
                                        text-zinc-600"
                                    />

                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(event) =>
                                            setEmail(
                                                event.target.value
                                            )
                                        }
                                        placeholder="admin@example.com"
                                        autoComplete="email"
                                        required
                                        className="w-full rounded-lg
                                        border border-zinc-800
                                        bg-zinc-950 py-3 pl-10
                                        pr-4 text-sm text-white
                                        outline-none
                                        placeholder:text-zinc-600
                                        focus:border-zinc-600"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="mb-2 block text-sm
                                    font-medium text-zinc-300"
                                >
                                    Password
                                </label>

                                <div className="relative">
                                    <LockKeyhole
                                        size={17}
                                        className="absolute left-3
                                        top-1/2 -translate-y-1/2
                                        text-zinc-600"
                                    />

                                    <input
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(event) =>
                                            setPassword(
                                                event.target.value
                                            )
                                        }
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        required
                                        className="w-full rounded-lg
                                        border border-zinc-800
                                        bg-zinc-950 py-3 pl-10
                                        pr-4 text-sm text-white
                                        outline-none
                                        placeholder:text-zinc-600
                                        focus:border-zinc-600"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div
                                    className="rounded-lg border
                                    border-red-500/20
                                    bg-red-500/5 px-4 py-3"
                                >
                                    <p className="text-sm text-red-400">
                                        {error}
                                    </p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex w-full
                                items-center justify-center
                                gap-2 rounded-lg bg-white
                                px-4 py-3 text-sm font-medium
                                text-black transition-opacity
                                hover:opacity-90
                                disabled:cursor-not-allowed
                                disabled:opacity-50"
                            >
                                {loading ? (
                                    "Signing in..."
                                ) : (
                                    <>
                                        Sign in
                                        <ArrowRight size={17} />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <p
                        className="mt-6 text-center text-xs
                        text-zinc-600"
                    >
                        Portfolio Administration
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
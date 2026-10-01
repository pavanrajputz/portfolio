import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    Plus,
    Search,
    MoreHorizontal,
    Pencil,
    Trash2,
    Code2,
} from "lucide-react";

import {
    createSkill,
    deleteSkill,
    getSkills,
    updateSkill,
} from "../../services/SkillService";

import type {
    Skill,
    SkillRequest,
} from "../../types/Skill";

import SkillForm from "../../components/forms/SkillForm";

function Skills() {
    const [skills, setSkills] =
        useState<Skill[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [search, setSearch] =
        useState("");

    const [categoryFilter, setCategoryFilter] =
        useState("all");

    const [showForm, setShowForm] =
        useState(false);

    const [editingSkill, setEditingSkill] =
        useState<Skill | null>(null);

    const [deletingId, setDeletingId] =
        useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadSkills = async () => {
            try {
                const data =
                    await getSkills();

                if (cancelled) {
                    return;
                }

                setSkills(data);
                setError(null);
            } catch (error) {
                if (cancelled) {
                    return;
                }

                console.error(
                    "Failed to load skills:",
                    error
                );

                setError(
                    "Failed to load skills."
                );
            } finally {
                if (!cancelled) {
                    setLoading(false);
                }
            }
        };

        void loadSkills();

        return () => {
            cancelled = true;
        };
    }, []);

    const categories = useMemo(() => {
        return Array.from(
            new Set(
                skills.map(
                    (skill) =>
                        skill.category
                )
            )
        ).sort();
    }, [skills]);

    const filteredSkills = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return skills.filter((skill) => {
            const matchesSearch =
                normalizedSearch === "" ||
                skill.name
                    .toLowerCase()
                    .includes(
                        normalizedSearch
                    ) ||
                skill.category
                    .toLowerCase()
                    .includes(
                        normalizedSearch
                    );

            const matchesCategory =
                categoryFilter === "all" ||
                skill.category ===
                categoryFilter;

            return (
                matchesSearch &&
                matchesCategory
            );
        });
    }, [
        skills,
        search,
        categoryFilter,
    ]);

    const handleCreate = async (
        data: SkillRequest
    ) => {
        const createdSkill =
            await createSkill(data);

        setSkills((current) => [
            createdSkill,
            ...current,
        ]);
    };

    const handleUpdate = async (
        data: SkillRequest
    ) => {
        if (!editingSkill) {
            return;
        }

        const updatedSkill =
            await updateSkill(
                editingSkill.id,
                data
            );

        setSkills((current) =>
            current.map((skill) =>
                skill.id ===
                updatedSkill.id
                    ? updatedSkill
                    : skill
            )
        );
    };

    const handleDelete = async (
        id: number
    ) => {
        const confirmed =
            window.confirm(
                "Are you sure you want to delete this skill?"
            );

        if (!confirmed) {
            return;
        }

        try {
            setDeletingId(id);

            await deleteSkill(id);

            setSkills((current) =>
                current.filter(
                    (skill) =>
                        skill.id !== id
                )
            );
        } catch (error) {
            console.error(
                "Failed to delete skill:",
                error
            );

            setError(
                "Failed to delete skill."
            );
        } finally {
            setDeletingId(null);
        }
    };

    const handleRetry = async () => {
        try {
            setError(null);
            setLoading(true);

            const data =
                await getSkills();

            setSkills(data);
        } catch (error) {
            console.error(
                "Failed to load skills:",
                error
            );

            setError(
                "Failed to load skills."
            );
        } finally {
            setLoading(false);
        }
    };

    const openCreateForm = () => {
        setEditingSkill(null);
        setShowForm(true);
    };

    const openEditForm = (
        skill: Skill
    ) => {
        setEditingSkill(skill);
        setShowForm(true);
    };

    const closeForm = () => {
        setShowForm(false);
        setEditingSkill(null);
    };

    const handleFormSubmit = async (
        data: SkillRequest
    ) => {
        if (editingSkill) {
            await handleUpdate(data);
        } else {
            await handleCreate(data);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <p className="text-sm text-zinc-500">
                    Loading skills...
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Skills
                    </h1>

                    <p className="mt-2 text-sm text-zinc-500">
                        Manage the skills displayed on your portfolio.
                    </p>
                </div>

                <button
                    onClick={
                        openCreateForm
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-opacity hover:opacity-90"
                >
                    <Plus size={17} />
                    Add Skill
                </button>
            </div>

            {error && (
                <div className="flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3">
                    <p className="text-sm text-red-400">
                        {error}
                    </p>

                    <button
                        onClick={
                            handleRetry
                        }
                        className="text-sm text-zinc-300 underline underline-offset-4 hover:text-white"
                    >
                        Retry
                    </button>
                </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                    <Search
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(
                                event.target.value
                            )
                        }
                        placeholder="Search skills..."
                        className="w-full rounded-lg border border-zinc-800 bg-zinc-900/40 py-2.5 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-zinc-600"
                    />
                </div>

                <select
                    value={
                        categoryFilter
                    }
                    onChange={(event) =>
                        setCategoryFilter(
                            event.target.value
                        )
                    }
                    className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-4 py-2.5 text-sm text-zinc-300 outline-none focus:border-zinc-600"
                >
                    <option value="all">
                        All Categories
                    </option>

                    {categories.map(
                        (category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        )
                    )}
                </select>
            </div>

            {skills.length === 0 && (
                <div className="flex min-h-[300px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                    <div className="text-center">
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900">
                            <Code2
                                size={20}
                                className="text-zinc-500"
                            />
                        </div>

                        <h2 className="mt-4 text-lg font-medium">
                            No skills yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Add your first skill to your portfolio.
                        </p>

                        <button
                            onClick={
                                openCreateForm
                            }
                            className="mt-5 rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black hover:opacity-90"
                        >
                            Add Skill
                        </button>
                    </div>
                </div>
            )}

            {skills.length > 0 &&
                filteredSkills.length === 0 && (
                    <div className="flex min-h-[250px] items-center justify-center rounded-xl border border-dashed border-zinc-800">
                        <div className="text-center">
                            <h2 className="text-lg font-medium">
                                No matching skills
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                Try changing your search or category filter.
                            </p>
                        </div>
                    </div>
                )}

            {filteredSkills.length > 0 && (
                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                    {filteredSkills.map(
                        (skill) => (
                            <div
                                key={
                                    skill.id
                                }
                                className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <h2 className="text-lg font-medium">
                                                {
                                                    skill.name
                                                }
                                            </h2>

                                            <span className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-500">
                                                {
                                                    skill.category
                                                }
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center gap-1">
                                        <button
                                            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                            title="More"
                                        >
                                            <MoreHorizontal
                                                size={
                                                    18
                                                }
                                            />
                                        </button>

                                        <button
                                            onClick={() =>
                                                openEditForm(
                                                    skill
                                                )
                                            }
                                            className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white"
                                            title="Edit"
                                        >
                                            <Pencil
                                                size={
                                                    16
                                                }
                                            />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    skill.id
                                                )
                                            }
                                            disabled={
                                                deletingId ===
                                                skill.id
                                            }
                                            className="rounded-lg p-2 text-zinc-500 hover:bg-red-500/10 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-50"
                                            title="Delete"
                                        >
                                            <Trash2
                                                size={
                                                    16
                                                }
                                            />
                                        </button>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-xs text-zinc-500">
                                            Proficiency
                                        </span>

                                        <span className="text-sm font-medium text-zinc-300">
                                            {
                                                skill.proficiency
                                            }
                                            %
                                        </span>
                                    </div>

                                    <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                                        <div
                                            className="h-full rounded-full bg-white transition-all"
                                            style={{
                                                width: `${skill.proficiency}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mt-5 border-t border-zinc-800 pt-4">
                                    <span className="text-xs text-zinc-600">
                                        Updated{" "}
                                        {new Date(
                                            skill.updatedAt
                                        ).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}

            {showForm && (
                <SkillForm
                    skill={
                        editingSkill
                    }
                    onSubmit={
                        handleFormSubmit
                    }
                    onClose={closeForm}
                />
            )}
        </div>
    );
}

export default Skills;
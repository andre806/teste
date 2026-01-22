
'use client';
import { api } from "@workspace/backend/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { useState } from "react";
export default function My_projects() {
const projects = useQuery(api.projects.my_projects);
const patchProject = useMutation(api.projects.PatchProjects);
const [editingId, setEditingId] = useState<string | null>(null);
const [editName, setEditName] = useState("");
const [editDescription, setEditDescription] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const startEdit = (project: any) => {
    setEditingId(project._id);
    setEditName(project.name);
    setEditDescription(project.description);
    setError("");
};

const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditDescription("");
    setError("");
};

const saveEdit = async (projectId: string) => {
    setLoading(true);
    setError("");
    try {
        await patchProject({
            projectId,
            updates: {
                name: editName,
                description: editDescription,
            },
        });
        setEditingId(null);
    } catch (err: any) {
        setError(err.message || "Erro ao salvar alterações");
    } finally {
        setLoading(false);
    }
};

return (
    <div className="max-w-3xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Meus Projetos</h1>
        {!projects ? (
            <div className="flex justify-center items-center h-40">
                <span className="text-gray-500 animate-pulse">Carregando projetos...</span>
            </div>
        ) : projects.length === 0 ? (
            <div className="text-center text-gray-500">Nenhum projeto cadastrado ainda.</div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <div
                        key={project._id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
                    >
                        {editingId === project._id ? (
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    saveEdit(project._id);
                                }}
                                className="space-y-3"
                            >
                                <input
                                    className="w-full border rounded px-3 py-2 text-lg font-semibold mb-1"
                                    value={editName}
                                    onChange={e => setEditName(e.target.value)}
                                    required
                                />
                                <textarea
                                    className="w-full border rounded px-3 py-2 mb-1"
                                    value={editDescription}
                                    onChange={e => setEditDescription(e.target.value)}
                                    required
                                />
                                <div className="flex gap-2 justify-end">
                                    <button
                                        type="button"
                                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                        onClick={cancelEdit}
                                        disabled={loading}
                                    >Cancelar</button>
                                    <button
                                        type="submit"
                                        className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 font-medium"
                                        disabled={loading}
                                    >{loading ? "Salvando..." : "Salvar"}</button>
                                </div>
                                {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
                            </form>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold mb-2 text-blue-700 truncate">{project.name}</h2>
                                <p className="text-gray-700 mb-4 line-clamp-3 min-h-[48px]">{project.description}</p>
                                {project.imgs && project.imgs.length > 0 && (
                                    <div className="flex gap-2 overflow-x-auto mb-2">
                                        {project.imgs.map((img: string, idx: number) => (
                                            <img
                                                key={idx}
                                                src={img}
                                                alt={project.name}
                                                className="w-20 h-20 object-cover rounded border"
                                                onError={e => (e.currentTarget.style.display = 'none')}
                                            />
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-end gap-2">
                                    <button
                                        className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-sm font-medium"
                                        onClick={() => startEdit(project)}
                                    >Editar</button>
                                    <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium">Ver detalhes</button>
                                </div>
                            </>
                        )}
                    </div>
                ))}
            </div>
        )}
    </div>
);
}
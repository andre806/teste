"use client";
import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@workspace/backend/_generated/api";

export default function CreateProjectPage() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [imgs, setImgs] = useState<string[]>([]);
    const [userId, setUserId] = useState("");
    const [imgInput, setImgInput] = useState("");
    const createProject = useMutation(api.projects.createProject); // Ajuste conforme sua mutation

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");


    const handleAddImg = () => {
        if (imgInput.trim()) {
            setImgs([...imgs, imgInput.trim()]);
            setImgInput("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);
        try {
            await createProject({ name, description, imgs, userId });
            setSuccess(true);
            setName("");
            setDescription("");
            setImgs([]);
            setUserId("");
        } catch (err: any) {
            setError(err.message || "Erro ao criar projeto");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
            <h1 className="text-2xl font-bold mb-4">Cadastrar Projeto</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Nome</label>
                    <input
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <div>
                    <label className="block font-medium">Descrição</label>
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-green-600 text-white rounded font-semibold"
                    disabled={loading}
                >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                </button>
                {success && <div className="text-green-600">Projeto cadastrado com sucesso!</div>}
                {error && <div className="text-red-600">{error}</div>}
            </form>
        </div>
    );
}

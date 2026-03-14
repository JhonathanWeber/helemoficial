"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { usersService } from "@/services/users";

export default function NovoUsuarioPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "EDITOR" as "ADMIN" | "EDITOR",
    });

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await usersService.create(form);
            toast.success("Membro adicionado com sucesso!");
            router.push("/admin/usuarios");
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Erro ao criar membro.";
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-lg space-y-6">
            <div className="flex items-center gap-3">
                <Link
                    href="/admin/usuarios"
                    className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Novo Membro</h1>
                    <p className="text-sm text-gray-500">Adicionar membro à equipe administrativa</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome completo
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Ex: Maria Silva"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        E-mail
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Ex: maria@helemoficial.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                        Senha provisória
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        minLength={6}
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Mínimo 6 caracteres"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                        Cargo
                    </label>
                    <select
                        id="role"
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 transition bg-white"
                    >
                        <option value="EDITOR">Editor — pode criar e editar conteúdo</option>
                        <option value="ADMIN">Administrador — acesso total, incluindo usuários</option>
                    </select>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex-1 bg-purple-700 hover:bg-purple-800 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition disabled:opacity-60"
                    >
                        {loading ? "Salvando..." : "Adicionar Membro"}
                    </button>
                    <Link
                        href="/admin/usuarios"
                        className="flex-1 text-center border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-2.5 rounded-lg font-medium text-sm transition"
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
}

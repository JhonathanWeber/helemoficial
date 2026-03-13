"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, UserCog } from "lucide-react";
import toast from "react-hot-toast";
import { usersService, AdminUser } from "@/services/users";

const ROLE_LABELS: Record<string, string> = {
    ADMIN: "Administrador",
    EDITOR: "Editor",
};

const ROLE_COLORS: Record<string, string> = {
    ADMIN: "bg-purple-100 text-purple-800",
    EDITOR: "bg-blue-100 text-blue-800",
};

export default function UsuariosPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const data = await usersService.getAll();
            setUsers(data);
        } catch {
            toast.error("Erro ao carregar usuários.");
        } finally {
            setLoading(false);
        }
    }

    async function handleDelete(user: AdminUser) {
        if (!confirm(`Tem certeza que deseja remover "${user.name}"?`)) return;

        setDeletingId(user.id);
        try {
            await usersService.delete(user.id);
            setUsers((prev) => prev.filter((u) => u.id !== user.id));
            toast.success(`Usuário "${user.name}" removido.`);
        } catch {
            toast.error("Erro ao remover usuário.");
        } finally {
            setDeletingId(null);
        }
    }

    if (loading) {
        return (
            <div className="space-y-4 animate-pulse">
                <div className="h-10 bg-gray-200 rounded w-48"></div>
                <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Equipe</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        {users.length} {users.length === 1 ? "membro" : "membros"} cadastrados
                    </p>
                </div>
                <Link
                    href="/admin/usuarios/novo"
                    className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-lg transition text-sm font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Novo Membro
                </Link>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="text-left px-6 py-3 text-gray-600 font-medium">Nome</th>
                            <th className="text-left px-6 py-3 text-gray-600 font-medium">E-mail</th>
                            <th className="text-left px-6 py-3 text-gray-600 font-medium">Cargo</th>
                            <th className="text-left px-6 py-3 text-gray-600 font-medium">Desde</th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50 transition">
                                <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${ROLE_COLORS[user.role] ?? "bg-gray-100 text-gray-700"}`}>
                                        {ROLE_LABELS[user.role] ?? user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2 justify-end">
                                        <Link
                                            href={`/admin/usuarios/${user.id}`}
                                            className="p-2 text-gray-400 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition"
                                            title="Editar"
                                        >
                                            <UserCog className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user)}
                                            disabled={deletingId === user.id}
                                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
                                            title="Remover"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    Nenhum membro ainda.{" "}
                                    <Link href="/admin/usuarios/novo" className="text-purple-700 underline">
                                        Adicionar primeiro membro
                                    </Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

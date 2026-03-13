import { Metadata } from 'next';
import AdminLayoutClient from './AdminLayoutClient';

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
    title: "Painel Administrativo - Helem",
};

export default function AdminLayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
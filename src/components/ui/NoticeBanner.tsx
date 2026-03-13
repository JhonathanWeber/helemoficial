"use client";

type NoticeType = "error" | "success" | "info";

interface NoticeBannerProps {
    type: NoticeType;
    message: string;
    onClose?: () => void;
}

const typeClasses: Record<NoticeType, string> = {
    error: "bg-red-50 border-red-200 text-red-700",
    success: "bg-green-50 border-green-200 text-green-700",
    info: "bg-blue-50 border-blue-200 text-blue-700",
};

export function NoticeBanner({ type, message, onClose }: NoticeBannerProps) {
    return (
        <div className={`mb-6 border rounded-lg px-4 py-3 text-sm font-medium flex items-center justify-between ${typeClasses[type]}`}>
            <span>{message}</span>
            {onClose && (
                <button
                    type="button"
                    onClick={onClose}
                    className="ml-4 text-current opacity-70 hover:opacity-100 transition"
                    aria-label="Fechar aviso"
                >
                    ×
                </button>
            )}
        </div>
    );
}

"use client";

import { useEffect, useRef } from "react";
import { postsService } from "@/services/posts";

interface ViewTrackerProps {
    postId: string;
}

export function ViewTracker({ postId }: ViewTrackerProps) {
    const hasTracked = useRef(false);

    useEffect(() => {
        if (hasTracked.current) return;

        // Marcar como trackeado para evitar envios duplos no React Strict Mode
        hasTracked.current = true;

        // Registra a visualização em background e ignora erros silenciosamente 
        // se por acaso o backend bloquear requisições muito curtas ou dar rate limit
        postsService.trackView(postId).catch(() => { });
    }, [postId]);

    return null;
}

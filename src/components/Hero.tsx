"use client";

import Image from "next/image";

export function Hero() {
    return (
        <>
            <div className="fixed inset-0 -z-50 h-[100dvh] w-full bg-gradient-to-r from-[#5367f4] via-[#ab58d2] to-[#ed7f9f]">
                <Image
                    src="/whatsapp-image-2026-08-16-hero.jpeg"
                    alt="Arte oficial de pré-campanha de Helem Cristina para deputada estadual no Rio de Janeiro, número 45789"
                    fill
                    priority
                    sizes="100vw"
                    className="h-full w-full object-contain object-center"
                />
            </div>

            <div className="relative w-full min-h-[calc(100dvh-6rem)] flex items-center justify-center">
                <h1 className="sr-only">
                    Helem Cristina — pré-candidata a deputada estadual pelo Rio de Janeiro
                </h1>
            </div>
        </>
    );
}

import type { Post } from "@/services/posts";

export const editorialPreviewEnabled = process.env.NODE_ENV !== "production";

export const localEditorialPosts: Post[] = [
    {
        id: "local-editorial-1",
        title: "Primeiro dia de campanha de Helem Cristina destaca propostas e presença nas redes",
        content:
            "<p>O primeiro dia oficial da campanha eleitoral de 2026 foi marcado por diferentes formas de mobilização em Maricá e em outras cidades do estado do Rio de Janeiro.</p><p>Entre os candidatos ligados ao município, Helem Cristina utilizou as redes sociais para publicar vídeos, apresentar propostas e registrar sua movimentação política.</p><p>Esta é uma prévia editorial local. A publicação definitiva depende de revisão e aprovação da equipe.</p>",
        summary: "Segundo o LSM Notícias, Helem Cristina marcou o início da campanha de 2026 com vídeos, apresentação de propostas e registros de sua movimentação política.",
        slug: "primeiro-dia-campanha-helem-cristina-propostas-presenca-redes",
        coverUrl: "/editorial-covers/capa-materia-1-13-06-campanha-helem-solo.png",
        category: "Outros",
        tags: [
            "Helem Cristina",
            "deputada estadual",
            "mulher negra",
            "campanha 2026",
            "Maricá",
            "Rio de Janeiro",
            "representatividade",
            "escuta",
            "presença",
            "compromisso",
        ],
        published: false,
        createdAt: "2026-08-17T12:00:00.000Z",
        updatedAt: "2026-08-29T12:00:00.000Z",
    },
    {
        id: "local-editorial-2",
        title: "Projeto Elas reúne mulheres para compartilhar conhecimento, superação e oportunidades",
        content:
            "<p>Uma reportagem publicada pelo Jornal DR1 apresentou o Projeto Elas, iniciativa criada por quatro mulheres para promover troca de experiências, autoconhecimento, superação e networking.</p><p>O grupo é descrito como uma rede de relacionamento e fortalecimento coletivo entre mulheres de diferentes áreas de atuação.</p><p>Esta é uma prévia editorial local. Novos encontros e resultados devem ser atualizados somente com fonte identificada.</p>",
        summary: "Reportagem do Jornal DR1 apresentou o Projeto Elas como uma iniciativa de troca de experiências, networking e fortalecimento de mulheres.",
        slug: "projeto-elas-mulheres-conhecimento-superacao-oportunidades",
        coverUrl: "/editorial-covers/capa-materia-2-img-5401.jpg",
        category: "Mulher",
        tags: [
            "Projeto Elas",
            "Helem Cristina",
            "deputada estadual",
            "mulher negra",
            "mulheres",
            "liderança feminina",
            "representatividade",
            "campanha 2026",
            "Maricá",
            "rede de apoio",
        ],
        published: false,
        createdAt: "2026-08-01T12:00:00.000Z",
        updatedAt: "2026-08-29T12:00:00.000Z",
    },
    {
        id: "local-editorial-3",
        title: "Direitos das mulheres e participação social aparecem entre as prioridades de Helem Cristina",
        content:
            "<p>Na apresentação oficial da campanha, Helem Cristina relaciona sua atuação pública a temas como combate ao feminicídio, direitos das mulheres, assistência social, periferias e geração de emprego.</p><p>O posicionamento também destaca escuta, presença nas ruas e participação como elementos da construção política.</p><p>Esta é uma prévia editorial local. Resultados concretos e compromissos com prazo exigem documentação adicional.</p>",
        summary: "A apresentação oficial da campanha reúne como prioridades o combate ao feminicídio, a assistência social, o apoio às periferias e a geração de emprego.",
        slug: "direitos-das-mulheres-participacao-social-prioridades-helem-cristina",
        coverUrl: "/editorial-covers/capa-materia-3-img-1081.jpg",
        category: "Ações Sociais",
        tags: [
            "Helem Cristina",
            "deputada estadual",
            "mulher negra",
            "direitos das mulheres",
            "representatividade",
            "combate ao feminicídio",
            "assistência social",
            "periferias",
            "Maricá",
            "campanha 2026",
        ],
        published: false,
        createdAt: "2026-07-28T12:00:00.000Z",
        updatedAt: "2026-08-29T12:00:00.000Z",
    },
];

export function getLocalEditorialPost(slug: string) {
    return localEditorialPosts.find((post) => post.slug === slug || post.id === slug) ?? null;
}

export function getLocalEditorialRecentPosts(excludeId?: string) {
    return localEditorialPosts.filter((post) => post.id !== excludeId).slice(0, 3);
}

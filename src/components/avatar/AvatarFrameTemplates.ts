export type FrameTemplateId = 'official-banner' | 'supporter-badge';

export interface FrameTemplate {
    id: FrameTemplateId;
    name: string;
    description: string;
}

export const FRAME_TEMPLATES: FrameTemplate[] = [
    {
        id: 'official-banner',
        name: 'Faixa Oficial 45789',
        description: 'Faixa inferior curva com nome e número oficial de campanha',
    },
    {
        id: 'supporter-badge',
        name: 'Selo Apoiador',
        description: 'Moldura circular com selo de apoio e número em destaque',
    },
];

/**
 * Desenha a moldura oficial da campanha sobre o canvas de saída.
 * @param ctx Contexto 2D do canvas
 * @param size Tamanho do canvas (largura = altura, ex: 1080px)
 * @param templateId Identificador do modelo de moldura
 */
export function drawAvatarFrame(
    ctx: CanvasRenderingContext2D,
    size: number,
    templateId: FrameTemplateId = 'official-banner'
) {
    const center = size / 2;
    const radius = size / 2;

    ctx.save();

    if (templateId === 'official-banner') {
        // --- 1. Borda circular externa suave ---
        ctx.beginPath();
        ctx.arc(center, center, radius - 4, 0, Math.PI * 2);
        ctx.lineWidth = 8;
        const borderGradient = ctx.createLinearGradient(0, 0, size, size);
        borderGradient.addColorStop(0, '#5B21B6'); // helem-purple-900
        borderGradient.addColorStop(0.5, '#9333EA'); // helem-purple-600
        borderGradient.addColorStop(1, '#F97316'); // helem-orange
        ctx.strokeStyle = borderGradient;
        ctx.stroke();

        // --- 2. Faixa inferior curva com gradiente da campanha ---
        ctx.beginPath();
        // Começa na borda esquerda inferior
        const startAngle = Math.PI * 0.22;
        const endAngle = Math.PI * 0.78;
        ctx.arc(center, center, radius - 4, startAngle, endAngle, false);

        // Curva superior interna da faixa
        const innerArcTopY = size * 0.72;
        ctx.bezierCurveTo(
            size * 0.75, innerArcTopY,
            size * 0.25, innerArcTopY,
            center + (radius - 4) * Math.cos(startAngle),
            center + (radius - 4) * Math.sin(startAngle)
        );
        ctx.closePath();

        const bannerGradient = ctx.createLinearGradient(0, size * 0.68, size, size);
        bannerGradient.addColorStop(0, '#4C1D95'); // purple-950
        bannerGradient.addColorStop(0.4, '#6D28D9'); // purple-800
        bannerGradient.addColorStop(0.85, '#F97316'); // orange-500
        bannerGradient.addColorStop(1, '#FACC15'); // yellow-400
        ctx.fillStyle = bannerGradient;
        ctx.fill();

        // Linha dourada superior da faixa
        ctx.beginPath();
        ctx.moveTo(center + (radius - 4) * Math.cos(startAngle), center + (radius - 4) * Math.sin(startAngle));
        ctx.bezierCurveTo(
            size * 0.25, innerArcTopY,
            size * 0.75, innerArcTopY,
            center + (radius - 4) * Math.cos(endAngle),
            center + (radius - 4) * Math.sin(endAngle)
        );
        ctx.lineWidth = 4;
        ctx.strokeStyle = '#FACC15';
        ctx.stroke();

        // --- 3. Textos na Faixa Inferior ---
        // Nome: Helem Cristina
        ctx.fillStyle = '#FFFFFF';
        ctx.font = `bold ${Math.round(size * 0.052)}px 'Geist', sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0,0,0,0.5)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.fillText('HELEM CRISTINA', center, size * 0.80);

        // Subtítulo: Deputada Estadual
        ctx.fillStyle = '#F3E8FF';
        ctx.font = `600 ${Math.round(size * 0.028)}px 'Geist', sans-serif`;
        ctx.fillText('DEPUTADA ESTADUAL', center, size * 0.855);

        // Número Destaque: 45789 com pill decorativo
        const badgeY = size * 0.925;
        const badgeWidth = size * 0.36;
        const badgeHeight = size * 0.075;
        const badgeRadius = badgeHeight / 2;

        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(0,0,0,0.4)';
        ctx.fillStyle = '#FACC15'; // Amarelo vibrante
        ctx.beginPath();
        ctx.roundRect(center - badgeWidth / 2, badgeY - badgeHeight / 2, badgeWidth, badgeHeight, badgeRadius);
        ctx.fill();

        // Número 45789
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#4C1D95'; // Roxo escuro
        ctx.font = `900 ${Math.round(size * 0.052)}px 'Geist', sans-serif`;
        ctx.fillText('45789', center, badgeY + 1);

    } else if (templateId === 'supporter-badge') {
        // --- Modelo 2: Selo Apoiador ---
        // Borda circular
        ctx.beginPath();
        ctx.arc(center, center, radius - 6, 0, Math.PI * 2);
        ctx.lineWidth = 12;
        const borderGradient = ctx.createLinearGradient(0, 0, size, size);
        borderGradient.addColorStop(0, '#F97316');
        borderGradient.addColorStop(0.5, '#6D28D9');
        borderGradient.addColorStop(1, '#FACC15');
        ctx.strokeStyle = borderGradient;
        ctx.stroke();

        // Faixa inferior sólida
        const bannerHeight = size * 0.24;
        const bannerY = size - bannerHeight;

        ctx.save();
        // Clip para respeitar o círculo
        ctx.beginPath();
        ctx.arc(center, center, radius - 6, 0, Math.PI * 2);
        ctx.clip();

        const badgeGradient = ctx.createLinearGradient(0, bannerY, size, size);
        badgeGradient.addColorStop(0, '#5B21B6');
        badgeGradient.addColorStop(0.7, '#6D28D9');
        badgeGradient.addColorStop(1, '#F97316');
        ctx.fillStyle = badgeGradient;
        ctx.fillRect(0, bannerY, size, bannerHeight);

        // Linha de divisão amarela
        ctx.fillStyle = '#FACC15';
        ctx.fillRect(0, bannerY, size, 4);

        // Textos
        ctx.shadowColor = 'rgba(0,0,0,0.6)';
        ctx.shadowBlur = 6;
        ctx.fillStyle = '#FFFFFF';
        ctx.textAlign = 'center';
        ctx.font = `800 ${Math.round(size * 0.042)}px 'Geist', sans-serif`;
        ctx.fillText('TÔ COM HELEM CRISTINA', center, bannerY + bannerHeight * 0.35);

        ctx.fillStyle = '#FACC15';
        ctx.font = `900 ${Math.round(size * 0.065)}px 'Geist', sans-serif`;
        ctx.fillText('45789', center, bannerY + bannerHeight * 0.72);

        ctx.restore();
    }

    ctx.restore();
}

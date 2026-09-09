"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { 
    Upload, 
    Download, 
    Share2, 
    RotateCcw, 
    ZoomIn, 
    ZoomOut, 
    Image as ImageIcon,
    Check
} from "lucide-react";
import { 
    FRAME_TEMPLATES, 
    FrameTemplateId, 
    drawAvatarFrame 
} from "./AvatarFrameTemplates";

const EXPORT_SIZE = 1080; // Resolução final HD
const PREVIEW_SIZE = 360; // Tamanho base no display

export function AvatarGenerator() {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [imageElement, setImageElement] = useState<HTMLImageElement | null>(null);
    const [selectedTemplate, setSelectedTemplate] = useState<FrameTemplateId>('official-banner');
    const [zoom, setZoom] = useState(1);
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [isExporting, setIsExporting] = useState(false);
    const canShare = typeof window !== 'undefined' && typeof navigator !== 'undefined' && typeof navigator.share === 'function' && typeof navigator.canShare === 'function';

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Carrega a imagem do usuário
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result as string;
            setImageSrc(dataUrl);
            
            const img = new Image();
            img.onload = () => {
                setImageElement(img);
                setZoom(1);
                setPan({ x: 0, y: 0 });
            };
            img.src = dataUrl;
        };
        reader.readAsDataURL(file);
    };

    // Renderiza a composição no Canvas
    const renderCanvas = useCallback((targetCanvas: HTMLCanvasElement, renderSize: number) => {
        const ctx = targetCanvas.getContext('2d');
        if (!ctx) return;

        targetCanvas.width = renderSize;
        targetCanvas.height = renderSize;

        const center = renderSize / 2;
        const radius = renderSize / 2;

        // Limpa o canvas
        ctx.clearRect(0, 0, renderSize, renderSize);

        // 1. Cria a máscara circular de recorte
        ctx.save();
        ctx.beginPath();
        ctx.arc(center, center, radius - 4, 0, Math.PI * 2);
        ctx.clip();

        // Fundo neutro
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, renderSize, renderSize);

        // 2. Desenha a foto do usuário com zoom e pan
        if (imageElement) {
            const scaleFactor = renderSize / PREVIEW_SIZE;
            const imgAspect = imageElement.width / imageElement.height;
            
            let baseWidth = renderSize;
            let baseHeight = renderSize;

            if (imgAspect > 1) {
                baseWidth = renderSize * imgAspect;
            } else {
                baseHeight = renderSize / imgAspect;
            }

            const drawWidth = baseWidth * zoom;
            const drawHeight = baseHeight * zoom;
            const drawX = center - drawWidth / 2 + (pan.x * scaleFactor);
            const drawY = center - drawHeight / 2 + (pan.y * scaleFactor);

            ctx.drawImage(imageElement, drawX, drawY, drawWidth, drawHeight);
        } else {
            // Placeholder se ainda não tiver imagem
            ctx.fillStyle = '#F3E8FF';
            ctx.fillRect(0, 0, renderSize, renderSize);
        }

        ctx.restore();

        // 3. Desenha a Moldura e o Número Oficial sobre a foto
        drawAvatarFrame(ctx, renderSize, selectedTemplate);
    }, [imageElement, zoom, pan, selectedTemplate]);

    // Atualiza o preview sempre que houver mudanças
    useEffect(() => {
        if (canvasRef.current) {
            renderCanvas(canvasRef.current, PREVIEW_SIZE);
        }
    }, [renderCanvas]);

    // Controles de Toque / Arraste (Touch & Mouse)
    const handlePointerDown = (clientX: number, clientY: number) => {
        if (!imageElement) return;
        setIsDragging(true);
        setDragStart({ x: clientX - pan.x, y: clientY - pan.y });
    };

    const handlePointerMove = (clientX: number, clientY: number) => {
        if (!isDragging || !imageElement) return;
        setPan({
            x: clientX - dragStart.x,
            y: clientY - dragStart.y,
        });
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    // Gera o Blob em alta resolução para download ou share
    const generateHDBlob = async (): Promise<Blob | null> => {
        const exportCanvas = document.createElement('canvas');
        renderCanvas(exportCanvas, EXPORT_SIZE);

        return new Promise((resolve) => {
            exportCanvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png', 1.0);
        });
    };

    // Ação: Baixar Foto de Perfil
    const handleDownload = async () => {
        setIsExporting(true);
        try {
            const blob = await generateHDBlob();
            if (!blob) return;

            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `avatar-helem-cristina-45789.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Erro ao baixar avatar:", error);
        } finally {
            setIsExporting(false);
        }
    };

    // Ação: Compartilhar direto no WhatsApp / Redes (Mobile)
    const handleShare = async () => {
        setIsExporting(true);
        try {
            const blob = await generateHDBlob();
            if (!blob) return;

            const file = new File([blob], 'avatar-helem-cristina-45789.png', { type: 'image/png' });

            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    files: [file],
                    title: 'Meu Avatar Oficial — Helem Cristina 45789',
                    text: 'Criei minha foto de perfil oficial com a Helem Cristina 45789! Crie a sua também:',
                });
            } else {
                // Fallback para download caso o navegador não suporte partilha de ficheiros
                handleDownload();
            }
        } catch (error) {
            // Ignora se o utilizador cancelar a partilha
            if ((error as Error).name !== 'AbortError') {
                console.error("Erro ao compartilhar:", error);
            }
        } finally {
            setIsExporting(false);
        }
    };

    const handleReset = () => {
        setZoom(1);
        setPan({ x: 0, y: 0 });
    };

    return (
        <div className="w-full max-w-md mx-auto flex flex-col items-center">
            {/* Input oculto de arquivo */}
            <input 
                type="file" 
                ref={fileInputRef} 
                accept="image/*" 
                onChange={handleFileChange}
                className="hidden" 
            />

            {/* Container do Canvas Interativo */}
            <div className="relative flex flex-col items-center justify-center w-full">
                <div 
                    className={`relative w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] rounded-full overflow-hidden shadow-2xl bg-white border-4 border-white/80 touch-none select-none transition-transform ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={(e) => handlePointerDown(e.clientX, e.clientY)}
                    onMouseMove={(e) => handlePointerMove(e.clientX, e.clientY)}
                    onMouseUp={handlePointerUp}
                    onMouseLeave={handlePointerUp}
                    onTouchStart={(e) => {
                        if (e.touches.length === 1) {
                            handlePointerDown(e.touches[0].clientX, e.touches[0].clientY);
                        }
                    }}
                    onTouchMove={(e) => {
                        if (e.touches.length === 1) {
                            handlePointerMove(e.touches[0].clientX, e.touches[0].clientY);
                        }
                    }}
                    onTouchEnd={handlePointerUp}
                >
                    <canvas 
                        ref={canvasRef} 
                        className="w-full h-full object-contain pointer-events-none"
                    />

                    {/* Placeholder caso nenhuma foto tenha sido escolhida */}
                    {!imageSrc && (
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="absolute inset-0 flex flex-col items-center justify-center bg-purple-900/10 hover:bg-purple-900/20 backdrop-blur-[2px] cursor-pointer transition-colors p-6 text-center"
                        >
                            <div className="w-16 h-16 rounded-full bg-purple-700 text-white flex items-center justify-center shadow-lg mb-3 animate-bounce-subtle">
                                <Upload className="w-8 h-8" />
                            </div>
                            <span className="text-sm sm:text-base font-bold text-purple-950">
                                Toque para escolher sua foto
                            </span>
                            <span className="text-xs text-purple-800/80 mt-1">
                                Câmera ou Galeria do celular
                            </span>
                        </div>
                    )}
                </div>

                {imageSrc && (
                    <p className="text-xs text-purple-900/70 mt-2 flex items-center gap-1 font-medium">
                        Arraste a foto para ajustar o enquadramento
                    </p>
                )}
            </div>

            {/* Controles de Foto e Ajustes */}
            {imageSrc ? (
                <div className="w-full mt-6 space-y-5 bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-purple-100 shadow-lg">
                    {/* Seletor de Modelo de Moldura */}
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-purple-950 mb-2">
                            Estilo da Moldura
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {FRAME_TEMPLATES.map((tmpl) => {
                                const isSelected = selectedTemplate === tmpl.id;
                                return (
                                    <button
                                        key={tmpl.id}
                                        type="button"
                                        onClick={() => setSelectedTemplate(tmpl.id)}
                                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-bold transition ${
                                            isSelected 
                                                ? 'bg-purple-700 text-white border-purple-700 shadow-sm' 
                                                : 'bg-white text-gray-700 border-gray-200 hover:bg-purple-50'
                                        }`}
                                    >
                                        <span className="truncate">{tmpl.name}</span>
                                        {isSelected && <Check className="w-4 h-4 shrink-0 ml-1" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Controle de Zoom */}
                    <div>
                        <div className="flex justify-between items-center text-xs font-bold text-purple-950 mb-1.5">
                            <span className="flex items-center gap-1">
                                <ZoomIn className="w-3.5 h-3.5 text-purple-700" /> Zoom
                            </span>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="text-purple-600 hover:text-purple-800 flex items-center gap-1 font-semibold"
                                title="Centralizar foto"
                            >
                                <RotateCcw className="w-3 h-3" /> Centralizar
                            </button>
                        </div>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
                                className="p-2 rounded-lg bg-purple-100 text-purple-800 hover:bg-purple-200 transition"
                            >
                                <ZoomOut className="w-4 h-4" />
                            </button>
                            <input
                                type="range"
                                min="0.5"
                                max="3"
                                step="0.05"
                                value={zoom}
                                onChange={(e) => setZoom(parseFloat(e.target.value))}
                                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-700"
                            />
                            <button
                                type="button"
                                onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
                                className="p-2 rounded-lg bg-purple-100 text-purple-800 hover:bg-purple-200 transition"
                            >
                                <ZoomIn className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Botões de Ação Principal */}
                    <div className="pt-2 flex flex-col gap-2.5">
                        {canShare && (
                            <button
                                type="button"
                                onClick={handleShare}
                                disabled={isExporting}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-5 h-5" />
                                {isExporting ? 'Preparando...' : 'Compartilhar no WhatsApp'}
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={handleDownload}
                            disabled={isExporting}
                            className="w-full bg-purple-700 hover:bg-purple-800 active:scale-[0.98] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2"
                        >
                            <Download className="w-5 h-5" />
                            {isExporting ? 'Gerando imagem HD...' : 'Baixar Foto de Perfil'}
                        </button>

                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="w-full bg-white hover:bg-gray-50 text-purple-900 border border-purple-200 font-semibold py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-2 text-sm"
                        >
                            <ImageIcon className="w-4 h-4 text-purple-600" />
                            Escolher outra foto
                        </button>
                    </div>
                </div>
            ) : (
                <div className="w-full mt-6">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-purple-700 hover:bg-purple-800 active:scale-[0.98] text-white font-bold py-4 px-6 rounded-2xl shadow-xl transition flex items-center justify-center gap-3 text-base"
                    >
                        <Upload className="w-5 h-5" />
                        Carregar Minha Foto
                    </button>
                </div>
            )}
        </div>
    );
}

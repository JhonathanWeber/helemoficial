export function Hero() {
    return (
        <div className="relative w-full h-[calc(100vh-6rem)] bg-gray-200 overflow-hidden scroll-mt-24">
            {/* 
        NOTE for User: Replace the src below with the actual photo of Helem walking.
        If using the 'helem-hero.png' extracted from Figma, put it in public folder.
      */}
            <img
                src="/helem foto de capa.jpg"
                alt="Helem Caminhando"
                className="w-full h-full object-cover object-center"
            />
            <div className="absolute top-0 right-0 p-4">
                {/* Optional overlay elements */}
            </div>
        </div>
    );
}

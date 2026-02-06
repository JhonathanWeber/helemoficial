import { Heart } from "lucide-react";

export function FlagsSection() {
    const flags = [
        {
            title: "Democracia de Proximidade",
            description: "Política com método, estrutura e escuta real!"
        },
        {
            title: "Mulheres no Centro das Decisões",
            description: "Mulher não é cota. É liderança. Não à misoginia. Não à violência. BASTA!"
        },
        {
            title: "Justiça Social",
            description: "O problema tem endereço. A solução também."
        }
    ];

    return (
        <section id="bandeiras" className="w-full min-h-screen flex flex-col justify-center bg-[#5B21B6] py-20 px-4 text-white">
            <div className="max-w-6xl mx-auto flex flex-col items-center">

                {/* Header */}
                <div className="flex flex-col items-center mb-16 text-center">
                    <Heart className="w-12 h-12 mb-4 text-white fill-current" />
                    <h2 className="text-3xl md:text-5xl font-extrabold uppercase leading-none">
                        <span className="block text-2xl font-normal lowercase mb-1">Conheça minhas</span>
                        BANDEIRAS!
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full px-4 md:px-0">
                    {flags.map((flag, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center group">
                            {/* Card Icon Placeholder */}
                            <div className="w-64 h-64 md:w-80 md:h-80 bg-gray-200 rounded-3xl mb-8 shadow-inner transition-transform group-hover:scale-105 group-hover:bg-white duration-300"></div>

                            <h3 className="text-2xl font-bold mb-4">{flag.title}</h3>
                            <p className="text-base text-purple-200 max-w-[300px]">{flag.description}</p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

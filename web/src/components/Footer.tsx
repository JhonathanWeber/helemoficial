import { Instagram, Facebook, Linkedin, Youtube, ExternalLink } from "lucide-react";

export function Footer() {
    return (
        <footer>
            {/* Socials Bar */}
            <div className="bg-gradient-to-b from-orange-400 to-yellow-100 py-10 flex flex-col items-center">
                <h3 className="text-xl text-purple-800 font-bold mb-1">ME SIGA</h3>
                <h2 className="text-3xl font-extrabold text-purple-900 mb-6">NAS REDES</h2>

                <div className="flex space-x-4">
                    {[Instagram, Youtube, ExternalLink /* TikTok alternate */, Facebook, Linkedin].map((Icon, i) => (
                        <a key={i} href="#" className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center text-white hover:bg-purple-600 transition shadow-lg">
                            <Icon className="w-6 h-6" />
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom Crowd Banner */}
            <div className="relative w-full h-[65vh] bg-gray-900 flex items-end justify-center">
                <img
                    src="/foto_minha_caminhada_bottom.png"
                    alt="Minha caminhada com as mulheres"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />

                <div className="relative z-10 mb-40 max-w-4xl text-center px-4">
                    <h3 className="text-white text-xl md:text-7xl font-bold font-sans drop-shadow-md">
                        Minha caminhada é junto com as mulheres<br />
                        e os trabalhadores do nosso estado!
                    </h3>
                    <p className="text-white text-right text-3xl mt-2 font-bold">- Helem</p>
                </div>
            </div>
        </footer>
    );
}

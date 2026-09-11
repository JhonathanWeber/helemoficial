"use client";

import { useState } from "react";
import {
    GraduationCap,
    HeartPulse,
    Home,
    MapPin,
    Quote,
    ShieldAlert,
    Sparkles,
    UsersRound,
    CheckCircle2,
    type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";

type Flag = {
    id: string;
    eyebrow: string;
    title: string;
    description: string;
    commitments: string[];
    icon: LucideIcon;
    visual: string;
};

type ProposalTopic = {
    id: string;
    title: string;
    shortTitle: string;
    icon: LucideIcon;
    badge: string;
    proposals: string[];
};

export function FlagsSection() {
    const [activeTab, setActiveTab] = useState<string>("saude");

    const flags: Flag[] = [
        {
            id: "mulheres-autonomia",
            eyebrow: "Protagonismo & Autonomia",
            title: "Mulheres e Autonomia",
            description: "Independência financeira, apoio a mães chefes de família e presença ativa das mulheres nos espaços de liderança.",
            commitments: [
                "Incentivo à capacitação profissional e autonomia financeira",
                "Fomento ao empreendedorismo feminino nas comunidades",
                "Ampliação do protagonismo e representatividade em políticas públicas",
            ],
            icon: Sparkles,
            visual: "from-purple-950 via-fuchsia-800 to-pink-600",
        },
        {
            id: "combate-violencia",
            eyebrow: "Proteção & Amparo Real",
            title: "Combate à Violência contra a Mulher",
            description: "Nenhuma mulher silenciada ou desamparada. Fortalecimento da rede de acolhimento, suporte psicológico e rigor na lei.",
            commitments: [
                "Fortalecimento de delegacias e centros de acolhimento especializados",
                "Apoio psicológico, jurídico e habitacional para vítimas de violência",
                "Fiscalização ativa do cumprimento ágil das medidas protetivas",
            ],
            icon: ShieldAlert,
            visual: "from-rose-950 via-rose-800 to-amber-600",
        },
        {
            id: "defesa-comunidades",
            eyebrow: "Da Favela para a ALERJ",
            title: "Defesa das Comunidades e Periferias",
            description: "Quem veio da favela sabe onde o calo aperta. Levar dignidade, infraestrutura e voz ativa para quem vive na periferia.",
            commitments: [
                "Cobrar saneamento básico, iluminação e urbanização nas periferias",
                "Ampliar projetos de educação, cultura e cidadania nas comunidades",
                "Presença permanente e diálogo direto com lideranças comunitárias",
            ],
            icon: Home,
            visual: "from-indigo-950 via-purple-900 to-violet-600",
        },
        {
            id: "educacao-juventude",
            eyebrow: "Futuro & Primeiro Emprego",
            title: "Educação e Oportunidade para os Jovens",
            description: "Educação pública de qualidade, qualificação profissional e oportunidades concretas para o jovem construir seu futuro.",
            commitments: [
                "Fortalecimento do ensino estadual e cursos técnicos profissionalizantes",
                "Incentivo à permanência dos jovens na escola e combate à evasão",
                "Criação de pontes com o mercado e oportunidades para o primeiro emprego",
            ],
            icon: GraduationCap,
            visual: "from-blue-950 via-indigo-800 to-cyan-600",
        },
        {
            id: "saude-dignidade",
            eyebrow: "Acesso Digno & Eficiente",
            title: "Saúde, Dignidade e Cuidado",
            description: "Atendimento humanizado na rede estadual, agilidade em exames e foco prioritário na saúde da mulher e regiões afastadas.",
            commitments: [
                "Cobrar melhorias urgentes no atendimento da rede estadual",
                "Defender ampliação do acesso a exames e tratamentos especializados",
                "Fiscalizar recursos da saúde e defender políticas de saúde da mulher",
            ],
            icon: HeartPulse,
            visual: "from-emerald-950 via-teal-800 to-amber-500",
        },
    ];

    const proposalTopics: ProposalTopic[] = [
        {
            id: "saude",
            title: "Saúde e Cuidado com as Pessoas",
            shortTitle: "Saúde",
            icon: HeartPulse,
            badge: "Prioridade Absoluta",
            proposals: [
                "Cobrar melhorias urgentes no atendimento e estrutura da rede estadual de saúde.",
                "Defender a ampliação do acesso a exames complexos e tratamentos médicos especializados.",
                "Fiscalizar com rigor todos os recursos públicos estaduais destinados à saúde.",
                "Defender políticas públicas permanentes voltadas à saúde integral da mulher.",
                "Lutar para que a população do interior e das regiões mais afastadas tenha acesso digno aos serviços especializados.",
            ],
        },
        {
            id: "educacao",
            title: "Educação, Juventude e Oportunidades",
            shortTitle: "Educação",
            icon: GraduationCap,
            badge: "Futuro & Qualificação",
            proposals: [
                "Fortalecer a educação pública estadual com melhorias na infraestrutura e valorização pedagógica.",
                "Defender a ampliação de cursos técnicos e profissionalizantes de qualidade nos municípios.",
                "Criar mais oportunidades concretas para jovens ingressarem dignamente no mercado de trabalho.",
                "Incentivar programas sociais e educacionais de permanência dos jovens na escola.",
                "Ampliar projetos integrados de educação, cultura e cidadania dentro das comunidades.",
            ],
        },
        {
            id: "cidades",
            title: "Cidades, Integração e Territórios (Maricá e Região)",
            shortTitle: "Maricá & Região",
            icon: MapPin,
            badge: "Voz Regional",
            proposals: [
                "Fiscalizar e acompanhar de perto os investimentos públicos estaduais que impactam Maricá e cidades vizinhas.",
                "Defender melhorias contínuas na integração entre Governo do Estado e prefeituras municipais.",
                "Cobrar investimentos estaduais consistentes em saúde, segurança pública e mobilidade urbana.",
                "Dar atenção especial às regiões mais afastadas, como Ponta Negra, Cordeirinho, Bambuí e Jaconé.",
                "Apoiar ações e incentivos que estimulem a geração de emprego, renda e qualificação de mão de obra local.",
            ],
        },
        {
            id: "social",
            title: "Social, Cuidado Familiar e Vulnerabilidade",
            shortTitle: "Social & Famílias",
            icon: UsersRound,
            badge: "Dignidade & Inclusão",
            proposals: [
                "Defender políticas públicas estruturantes voltadas para famílias em situação de vulnerabilidade social.",
                "Garantir apoio prioritário a mães solo e mulheres chefes de família que sustentam seus lares.",
                "Propor iniciativas de assistência, dignidade e proteção social para a população idosa.",
                "Defender a inclusão plena, acessibilidade e respeito aos direitos das pessoas com deficiência (PcD).",
                "Incentivar programas estaduais de capacitação, formação profissional e conquista da autonomia financeira.",
            ],
        },
    ];

    const currentTopic = proposalTopics.find((t) => t.id === activeTab) || proposalTopics[0];

    return (
        <section
            id="bandeiras"
            className="w-full bg-gradient-to-b from-helem-purple-950 via-helem-purple-900 to-helem-purple-950 py-20 px-4 text-white overflow-hidden relative"
            aria-labelledby="bandeiras-title"
        >
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                {/* Header da Seção */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center mb-10 text-center max-w-3xl"
                >
                    <span className="inline-flex items-center gap-2 rounded-full border border-yellow-300/40 bg-yellow-400/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-yellow-300 mb-4 shadow-sm">
                        <Sparkles className="h-3.5 w-3.5" />
                        Compromissos & Bandeiras Oficiais
                    </span>
                    <h2 id="bandeiras-title" className="text-3xl md:text-5xl font-extrabold uppercase leading-tight tracking-tight">
                        <span className="block text-xl md:text-2xl font-light lowercase text-purple-200 mb-1">Conheça as</span>
                        5 Bandeiras da Mudança
                    </h2>
                    <p className="mt-4 text-base md:text-lg text-purple-100/90 leading-relaxed font-normal">
                        Nossas bandeiras nascem da vivência real nas ruas e comunidades. É a coragem de quem sente na pele
                        as dificuldades do povo traduzida em compromisso com o Rio de Janeiro.
                    </p>
                </motion.div>

                {/* Bloco de Citação Oficial */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-4xl mb-16 relative overflow-hidden rounded-3xl border border-yellow-400/30 bg-gradient-to-r from-purple-900/80 via-black/40 to-purple-900/80 p-6 md:p-8 backdrop-blur-md shadow-2xl"
                >
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-yellow-400/20 text-yellow-300 ring-1 ring-yellow-400/30">
                            <Quote className="h-6 w-6 rotate-180" />
                        </div>
                        <div className="flex-1">
                            <p className="text-base sm:text-lg md:text-xl font-medium italic leading-relaxed text-white">
                                &ldquo;Eu vim da favela, conheço a luta do nosso povo e quero transformar essa história em voz,
                                coragem e trabalho na Assembleia Legislativa.&rdquo;
                            </p>
                            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                <span className="font-bold text-yellow-300 text-sm tracking-wide">Helem Cristina</span>
                                <span className="text-purple-300 text-xs">• Pré-candidata a Deputada Estadual (RJ)</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Grid das 5 Bandeiras */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 w-full">
                    {flags.map((flag, idx) => {
                        const Icon = flag.icon;

                        return (
                            <motion.div
                                key={flag.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className={`group flex flex-col overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.07] text-left shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:shadow-[0_20px_50px_-10px_rgba(109,40,217,0.5)] ${
                                    idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                                }`}
                            >
                                <div className={`relative isolate flex aspect-[16/10] sm:aspect-[4/3] w-full items-end overflow-hidden bg-gradient-to-br ${flag.visual} p-6`}>
                                    <div className="absolute -right-8 -top-10 -z-10 h-36 w-36 rounded-full border-[14px] border-white/15 animate-float" aria-hidden="true" />
                                    <div className="absolute -bottom-14 -left-6 -z-10 h-40 w-40 rounded-full bg-white/10 blur-xl animate-float" aria-hidden="true" />
                                    <Icon className="absolute right-5 top-5 h-12 w-12 text-white/80 transition-transform duration-300 group-hover:scale-110" strokeWidth={1.5} aria-hidden="true" />
                                    <span className="rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 shadow-sm backdrop-blur-sm">
                                        {flag.eyebrow}
                                    </span>
                                    <span className="absolute bottom-4 right-5 text-4xl sm:text-5xl font-black text-white/20 select-none" aria-hidden="true">
                                        0{idx + 1}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-6 md:p-7">
                                    <h3 className="mb-2 text-xl md:text-2xl font-bold leading-snug tracking-tight text-white group-hover:text-yellow-200 transition-colors">
                                        {flag.title}
                                    </h3>
                                    <p className="mb-6 text-sm md:text-base leading-relaxed text-purple-100/90 font-light">
                                        {flag.description}
                                    </p>

                                    <div className="mt-auto border-t border-white/15 pt-4">
                                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-yellow-300 flex items-center gap-1.5">
                                            <span className="h-1.5 w-1.5 rounded-full bg-yellow-300 animate-pulse" />
                                            Compromissos essenciais
                                        </p>
                                        <ul className="space-y-2.5 text-xs sm:text-sm leading-relaxed text-white/90">
                                            {flag.commitments.map((commitment) => (
                                                <li key={commitment} className="flex gap-2.5 items-start">
                                                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-yellow-300/90" />
                                                    <span>{commitment}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Subseção: Propostas Detalhadas por Área */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="w-full mt-24 flex flex-col items-center"
                >
                    <div className="text-center max-w-2xl mb-8">
                        <span className="inline-block rounded-full border border-purple-400/40 bg-purple-500/20 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-purple-200 mb-3">
                            Plano de Atuação Legislativa
                        </span>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white">
                            Propostas por Área de Atuação
                        </h3>
                        <p className="mt-2 text-sm sm:text-base text-purple-200/80">
                            Ações concretas e pautas prioritárias que Helem levará para defender o povo fluminense na ALERJ.
                        </p>
                    </div>

                    {/* Navegação por Abas Responsiva */}
                    <div className="w-full max-w-4xl flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none snap-x">
                        {proposalTopics.map((topic) => {
                            const TabIcon = topic.icon;
                            const isActive = activeTab === topic.id;

                            return (
                                <button
                                    key={topic.id}
                                    type="button"
                                    onClick={() => setActiveTab(topic.id)}
                                    className={`flex items-center gap-2.5 whitespace-nowrap rounded-2xl px-4 py-3 text-sm font-semibold transition-all duration-200 snap-start cursor-pointer border ${
                                        isActive
                                            ? "border-yellow-400 bg-gradient-to-r from-yellow-400/20 to-amber-500/20 text-yellow-300 shadow-lg shadow-yellow-500/10"
                                            : "border-white/10 bg-white/5 text-purple-200 hover:bg-white/10 hover:text-white"
                                    }`}
                                >
                                    <TabIcon className={`h-4 w-4 ${isActive ? "text-yellow-300" : "text-purple-300"}`} />
                                    <span>{topic.shortTitle}</span>
                                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                                        isActive ? "bg-yellow-400/30 text-yellow-200" : "bg-white/10 text-purple-300"
                                    }`}>
                                        {topic.proposals.length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Conteúdo da Aba Ativa */}
                    <div className="w-full max-w-4xl rounded-3xl border border-white/15 bg-white/[0.08] p-6 sm:p-8 backdrop-blur-lg shadow-2xl">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/15">
                            <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/20 text-yellow-300 ring-1 ring-yellow-400/30">
                                    <currentTopic.icon className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                                        {currentTopic.title}
                                    </h4>
                                    <span className="text-xs font-semibold tracking-wider uppercase text-yellow-300/90">
                                        {currentTopic.badge}
                                    </span>
                                </div>
                            </div>
                            <span className="text-xs text-purple-200 bg-white/10 rounded-full px-3 py-1 self-start sm:self-center">
                                {currentTopic.proposals.length} propostas prioritárias
                            </span>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-3 sm:gap-4">
                            {currentTopic.proposals.map((proposal, i) => (
                                <motion.div
                                    key={proposal}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="flex items-start gap-3.5 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-4.5 transition-all hover:bg-white/[0.09] hover:border-yellow-400/30"
                                >
                                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-400/20 text-yellow-300 mt-0.5">
                                        <span className="text-xs font-bold">{i + 1}</span>
                                    </div>
                                    <p className="text-sm sm:text-base leading-relaxed text-purple-50 font-normal">
                                        {proposal}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

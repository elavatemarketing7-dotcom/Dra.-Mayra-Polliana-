import React, { useState, useRef, useEffect } from "react";
import { 
  Sparkles, 
  Shield, 
  Heart, 
  Lock, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Check, 
  CheckCircle2, 
  X, 
  ChevronRight, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Instagram, 
  MessageSquare,
  Compass,
  CheckCircle,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { EXPERT_DATA, QUIZ_QUESTIONS, TRUST_DIFFERENTIALS, CONSULTATION_STEPS, VIDEO_SECTION } from "./data";
import { UserResponse } from "./types";

export default function App() {
  // Navigation scrolling state
  const [activeSection, setActiveSection] = useState("home");

  // State for the interactive evaluation quiz overlay
  // The quiz is open by default on first load overlaying the site
  const [showQuizOverlay, setShowQuizOverlay] = useState(true);
  const [quizStep, setQuizStep] = useState<"intro" | "questions" | "analyzing" | "result">("intro");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserResponse[]>([]);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [analyzingMessage, setAnalyzingMessage] = useState("Iniciando análise...");

  // Lightbox for galleries
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Video element player states
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true); // Attempt autoplay
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Auto-play the video when page loads, bypassing browser blocks if possible by ensuring muted
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Safe fallback in case browser delays autoplay
        if (videoRef.current) {
          videoRef.current.muted = true;
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, []);

  // States and effects for the automated sliding galleries (Social Proof / Transformations and Hearts Gallery)
  const [socialIndex, setSocialIndex] = useState(0);
  const [socialItemsToShow, setSocialItemsToShow] = useState(1);
  const [heartsIndex, setHeartsIndex] = useState(0);
  const [heartsItemsToShow, setHeartsItemsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      // Social Proof visible items
      if (window.innerWidth >= 1024) {
        setSocialItemsToShow(3);
      } else if (window.innerWidth >= 768) {
        setSocialItemsToShow(2);
      } else {
        setSocialItemsToShow(1);
      }

      // Hearts gallery visible items
      if (window.innerWidth >= 1024) {
        setHeartsItemsToShow(4);
      } else if (window.innerWidth >= 768) {
        setHeartsItemsToShow(2);
      } else {
        setHeartsItemsToShow(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Sync index boundaries on resize
  useEffect(() => {
    const maxSocial = Math.max(0, EXPERT_DATA.socialProof.length - socialItemsToShow);
    if (socialIndex > maxSocial) {
      setSocialIndex(maxSocial);
    }
  }, [socialItemsToShow, socialIndex]);

  useEffect(() => {
    const maxHearts = Math.max(0, EXPERT_DATA.heartsGallery.length - heartsItemsToShow);
    if (heartsIndex > maxHearts) {
      setHeartsIndex(maxHearts);
    }
  }, [heartsItemsToShow, heartsIndex]);

  // Auto-slide timers
  useEffect(() => {
    const timer = setInterval(() => {
      setSocialIndex((prev) => {
        const maxSocial = Math.max(0, EXPERT_DATA.socialProof.length - socialItemsToShow);
        if (maxSocial === 0) return 0;
        return prev >= maxSocial ? 0 : prev + 1;
      });
    }, 3500);
    return () => clearInterval(timer);
  }, [socialItemsToShow]);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeartsIndex((prev) => {
        const maxHearts = Math.max(0, EXPERT_DATA.heartsGallery.length - heartsItemsToShow);
        if (maxHearts === 0) return 0;
        return prev >= maxHearts ? 0 : prev + 1;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, [heartsItemsToShow]);

  // Navigation targets
  const sections = [
    { id: "home", label: "Início" },
    { id: "video-apresentacao", label: "O Procedimento" },
    { id: "sobre-mim", label: "Sobre Mim" },
    { id: "provas-reais", label: "Prova Visual" },
    { id: "por-que-confiar", label: "Diferenciais" },
    { id: "harmonizacao-coracao", label: "Harmonização de 💚" },
    { id: "como-funciona", label: "Como Funciona" },
    { id: "onde-encontrar", label: "Onde Encontrar" },
    { id: "contato", label: "Contato" }
  ];

  // Auto-scroll indicator / ticker items
  const marqueeItems = [
    "✨ SOBRE MIM",
    "⚜️ PROVA VISUAL",
    "💚 HARMONIZAÇÃO DE CORAÇÃO",
    "📍 ONDE NOS ENCONTRAR",
    "📞 CONTATO",
    "✨ MAYRA POLLIANA",
    "⚜️ HARMONIZAÇÃO NATURAL",
    "✨ SOBRE MIM",
    "⚜️ PROVA VISUAL",
    "💚 HARMONIZAÇÃO DE CORAÇÃO",
    "📍 ONDE NOS ENCONTRAR",
    "📞 CONTATO",
    "✨ MAYRA POLLIANA",
    "⚜️ HARMONIZAÇÃO NATURAL"
  ];

  // Smooth scroll handler
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(id);
    }
  };

  // Video mute/unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  // Video play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
          .then(() => setIsVideoPlaying(true))
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  // Handle answers selection in Quiz
  const handleAnswerSelect = (selectedText: string) => {
    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    const newAnswer: UserResponse = {
      questionId: question.id,
      questionText: question.question,
      selectedAnswer: selectedText
    };

    const updatedAnswers = [...userAnswers, newAnswer];
    setUserAnswers(updatedAnswers);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question answered - go to simulated analyzing state
      setQuizStep("analyzing");
      startAnalyzingSimulation(updatedAnswers);
    }
  };

  // Simulated professional progress analysis
  const startAnalyzingSimulation = (finalAnswers: UserResponse[]) => {
    setAnalyzingProgress(0);
    const messages = [
      "Iniciando análise facial estruturada...",
      "Processando percepções de naturalidade e simetria...",
      "Validando compatibilidade com o Método Dra. Mayra Polliana...",
      "Calculando harmonia labial e proporções áureas...",
      "Sincronizando disponibilidades na agenda da Av. Paulista...",
      "Gerando recomendação personalizada..."
    ];

    let currentMsgIndex = 0;
    const interval = setInterval(() => {
      setAnalyzingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setQuizStep("result");
          }, 300);
          return 100;
        }

        // Cycle messages
        if (prev > 0 && prev % 20 === 0 && currentMsgIndex < messages.length - 1) {
          currentMsgIndex++;
          setAnalyzingMessage(messages[currentMsgIndex]);
        }

        return prev + 4; // increment speed
      });
    }, 100);
  };

  // Reset the quiz to take it again
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setQuizStep("questions");
  };

  // Format the answers for sending to WhatsApp in a beautifully structured text
  const generateWhatsAppMessage = () => {
    let text = `Olá Dra. Mayra Polliana! Gostaria de agendar minha consulta de Harmonização Facial. Fiz a sua Avaliação Exclusiva e meu perfil foi compatível!\n\n`;
    text += `📋 *RESPOSTAS DO MEU QUIZ DE COMPATIBILIDADE*:\n`;
    userAnswers.forEach((ans, index) => {
      text += `\n*${index + 1}. ${ans.questionText}*\n↳ _R: ${ans.selectedAnswer}_\n`;
    });
    text += `\n📍 _Enviado via Avaliação Exclusiva - Av. Paulista / Al. Santos_`;
    return encodeURIComponent(text);
  };

  // Direct send evaluation to Dra
  const sendEvaluationToWhatsApp = () => {
    const url = `${EXPERT_DATA.whatsappLink}&text=${generateWhatsAppMessage()}`;
    window.open(url, "_blank");
  };

  // Direct message with no attachment
  const openDirectWhatsApp = () => {
    const text = encodeURIComponent("Olá Dra. Mayra Polliana, gostaria de tirar dúvidas e agendar uma primeira avaliação de harmonização facial sem compromisso.");
    const url = `${EXPERT_DATA.whatsappLink}&text=${text}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#FDFCF0] font-sans-ui overflow-x-hidden selection:bg-[#C5A059]/25 selection:text-[#E8D2A6]">
      
      {/* 1. INTERACTIVE QUIZ OVERLAY (Floating premium gate over blurred background) */}
      <AnimatePresence>
        {showQuizOverlay && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/90 backdrop-blur-md overflow-y-auto"
          >
            {/* Embedded Background elements of the main expert name & floating head inside quiz */}
            <div className="absolute inset-0 bg-radial from-stone-900/60 to-stone-950/95 pointer-events-none" />
            
            {/* The Quiz Container */}
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative w-full max-w-lg bg-[#0d0d0d] rounded-2xl sm:rounded-3xl border border-[#C5A059]/30 shadow-2xl p-4 sm:p-6 md:p-8 text-white overflow-hidden my-auto"
            >
              {/* Premium Top Bar */}
              <div className="flex items-center justify-between border-b border-stone-800/80 pb-3 sm:pb-4 mb-3 sm:mb-4">
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Floating Expert portrait in a premium gold frame */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#C5A059] shadow-lg shrink-0">
                    <img 
                      src={EXPERT_DATA.images.hero} 
                      alt="Dra. Mayra Polliana" 
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold tracking-wider text-[#E8D2A6] uppercase">Avaliação</h4>
                    <p className="text-[10px] sm:text-xs text-stone-400 font-luxury-serif italic">com Dra. Mayra</p>
                  </div>
                </div>
                
                {/* Secondary button to proceed straight to the site */}
                <button 
                  id="btn-skip-quiz"
                  onClick={() => setShowQuizOverlay(false)}
                  className="text-[10px] sm:text-xs text-stone-400 hover:text-white transition-colors py-1 px-2 sm:px-2.5 rounded-full border border-stone-800 hover:border-[#C5A059]/40 flex items-center gap-1 cursor-pointer"
                >
                  Pular <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </button>
              </div>

              {/* INTRO STEP */}
              {quizStep === "intro" && (
                <div className="text-center py-2 sm:py-4 space-y-4 sm:space-y-5">
                  <div className="inline-flex p-2 sm:p-3 rounded-full bg-[#121212] border border-[#C5A059]/30 text-[#E8D2A6]">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 animate-pulse" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-semibold font-luxury-serif tracking-tight text-white leading-tight">
                    Descubra o protocolo ideal para o seu rosto
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                    Responda a <span className="text-[#E8D2A6] font-medium">5 perguntas objetivas</span> e veja se você está qualificada para o método exclusivo de Harmonização Natural da Dra. Mayra.
                  </p>
                  
                  <div className="space-y-2 sm:space-y-3 pt-1 sm:pt-2">
                    <button 
                      id="btn-start-quiz"
                      onClick={() => setQuizStep("questions")}
                      className="w-full py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-semibold gold-gradient text-[#050505] transition-all active:scale-[0.98] shadow-lg hover:brightness-110 flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                    >
                      Iniciar Avaliação <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                    </button>
                    
                    <button 
                      id="btn-direct-site"
                      onClick={() => setShowQuizOverlay(false)}
                      className="w-full py-2.5 sm:py-3.5 px-4 sm:px-6 rounded-xl font-medium text-stone-300 bg-[#121212] border border-stone-800 hover:bg-stone-850 hover:border-stone-700 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Ir direto para o site oficial
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1.5 text-stone-400 text-[10px] sm:text-xs">
                    <Shield className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#E8D2A6]" />
                    <span>Seus dados estão 100% protegidos e seguros</span>
                  </div>
                </div>
              )}

              {/* QUESTIONS STEP */}
              {quizStep === "questions" && (
                <div className="space-y-4 sm:space-y-5 py-1 sm:py-2">
                  {/* Progress Indicator */}
                  <div>
                    <div className="flex justify-between text-[10px] sm:text-xs text-stone-400 mb-1.5 sm:mb-2">
                      <span className="font-semibold text-[#E8D2A6] uppercase tracking-wider">Pergunta {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}</span>
                      <span>{Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}%</span>
                    </div>
                    <div className="w-full h-1 sm:h-1.5 bg-stone-800 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-[#C5A059]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Question Title */}
                  <h3 className="text-lg sm:text-xl font-medium font-luxury-serif text-white leading-snug">
                    {QUIZ_QUESTIONS[currentQuestionIndex].question}
                  </h3>

                  {/* Answer Options */}
                  <div className="space-y-2 sm:space-y-3">
                    {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        id={`btn-answer-${currentQuestionIndex}-${idx}`}
                        onClick={() => handleAnswerSelect(option.text)}
                        className="w-full p-3 sm:p-4 rounded-xl text-left text-xs sm:text-sm bg-stone-850 border border-stone-800/80 hover:border-[#C5A059]/50 hover:bg-stone-800 text-stone-200 transition-all hover:text-white flex items-center justify-between group cursor-pointer"
                      >
                        <span className="pr-3">{option.text}</span>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-stone-700 flex items-center justify-center group-hover:border-[#C5A059] group-hover:bg-[#C5A059]/10 shrink-0 transition-all">
                          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Back button or direct exit option */}
                  <div className="flex justify-between items-center pt-1 text-stone-400 text-[10px] sm:text-xs">
                    {currentQuestionIndex > 0 ? (
                      <button 
                        onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                        className="hover:text-white transition-colors cursor-pointer"
                      >
                        ← Voltar anterior
                      </button>
                    ) : (
                      <span />
                    )}
                    <button 
                      onClick={() => setShowQuizOverlay(false)}
                      className="hover:text-white underline transition-colors cursor-pointer"
                    >
                      Sair e navegar no site
                    </button>
                  </div>
                </div>
              )}

              {/* ANALYZING STEP */}
              {quizStep === "analyzing" && (
                <div className="text-center py-6 sm:py-10 space-y-4 sm:space-y-6">
                  <div className="relative w-14 h-14 sm:w-20 sm:h-20 mx-auto">
                    <div className="absolute inset-0 rounded-full border-4 border-stone-800" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-[#C5A059] animate-spin" />
                    <div className="absolute inset-0 flex items-center justify-center text-stone-300">
                      <Compass className="w-6 h-6 sm:w-8 sm:h-8 animate-pulse text-[#E8D2A6]" />
                    </div>
                  </div>
                  
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-luxury-serif font-semibold text-white">
                      Analisando...
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-400 min-h-[32px] sm:min-h-[40px] italic">
                      "{analyzingMessage}"
                    </p>
                  </div>

                  <div className="max-w-xs mx-auto">
                    <div className="w-full h-1 bg-stone-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#C5A059] via-[#E8D2A6] to-[#C5A059] transition-all duration-100" 
                        style={{ width: `${analyzingProgress}%` }}
                      />
                    </div>
                    <div className="text-right text-[10px] sm:text-xs text-[#E8D2A6] mt-1 font-mono">
                      {analyzingProgress}%
                    </div>
                  </div>
                </div>
              )}

              {/* COMPATIBILITY RESULT PAGE */}
              {quizStep === "result" && (
                <div className="space-y-4 sm:space-y-6 py-1">
                  {/* Headline highlights grouped neatly */}
                  <div className="text-center space-y-1.5 sm:space-y-2">
                    <span className="inline-block py-0.5 sm:py-1 px-2.5 sm:px-3 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 text-[10px] sm:text-xs font-semibold tracking-widest uppercase animate-pulse">
                      ✓ Perfil Compatível
                    </span>
                    <h3 className="text-xl sm:text-2xl font-semibold font-luxury-serif text-white tracking-tight mt-1 leading-tight">
                      Pronta para sua Transformação Natural
                    </h3>
                    <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto">
                      Com base nas suas respostas, o Método da <strong className="text-[#E8D2A6] font-medium">Dra. Mayra Polliana</strong> consegue entregar a naturalidade e segurança que você procura.
                    </p>
                  </div>

                  {/* Floating styled Expert portrait specifically chest up on result screen */}
                  <div className="relative rounded-xl sm:rounded-2xl overflow-hidden border border-[#C5A059]/45 shadow-xl bg-stone-950 h-32 sm:h-48 md:h-56 flex items-center justify-center">
                    <img 
                      src={EXPERT_DATA.images.secondary} 
                      alt="Dra. Mayra Polliana Harmonização" 
                      className="absolute inset-0 w-full h-full object-cover object-top filter brightness-95"
                      referrerPolicy="no-referrer"
                    />
                    {/* Visual vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/20" />
                    
                    <div className="absolute bottom-3 left-3 right-3 text-left">
                      <h4 className="text-[#E8D2A6] text-sm sm:text-lg font-bold tracking-tight font-luxury-serif">Dra. Mayra Polliana</h4>
                      <p className="text-[10px] sm:text-xs text-stone-300">Especialista em Harmonização Facial Natural • São Paulo</p>
                    </div>
                  </div>

                  {/* Required 3 Actions Buttons compactly formatted to fit entirely on mobile screens */}
                  <div className="space-y-2 pt-1 sm:pt-2">
                    {/* Button 1: Enviar minha avaliação */}
                    <button 
                      id="btn-send-evaluation"
                      onClick={sendEvaluationToWhatsApp}
                      className="w-full py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-xl font-bold gold-gradient text-[#050505] hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md animate-premium-pulse cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                      1. Enviar minha avaliação à DRA
                    </button>

                    {/* Button 2: Chamar no WhatsApp sem compromisso */}
                    <button 
                      id="btn-call-whatsapp"
                      onClick={openDirectWhatsApp}
                      className="w-full py-2.5 sm:py-3.5 px-3 sm:px-4 rounded-xl font-medium bg-[#121212] hover:bg-stone-800 border border-emerald-500/30 text-emerald-300 hover:text-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-emerald-400" />
                      2. CHAMAR NO WHATSAPP SEM COMPROMISSO
                    </button>

                    {/* Button 3: Não enviar e continuar no site */}
                    <button 
                      id="btn-skip-site"
                      onClick={() => setShowQuizOverlay(false)}
                      className="w-full py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-medium bg-stone-900 hover:bg-[#121212] border border-stone-800 text-stone-400 hover:text-stone-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-[10px] sm:text-xs cursor-pointer"
                    >
                      3. NÃO ENVIAR E CONTINUAR NO SITE
                    </button>
                  </div>

                  <p className="text-[10px] text-stone-500 text-center leading-relaxed italic">
                    Ao enviar a avaliação, Dra. Mayra receberá suas respostas para desenhar um planejamento personalizado de harmonia facial.
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. MAIN HEADER (Logo, address & quick click actions) */}
      <header className="sticky top-0 z-40 bg-[#050505]/90 backdrop-blur-md border-b border-[#C5A059]/25 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* Logo & Signature Brand */}
          <div className="flex flex-col">
            <span className="font-luxury-serif text-xl md:text-2xl font-bold tracking-widest text-[#FDFCF0] uppercase">
              Mayra Polliana
            </span>
            <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold -mt-1">
              Harmonização Facial
            </span>
          </div>

          {/* Inline location display */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900 py-1 px-2.5 rounded-full border border-stone-850">
            <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Av. Paulista / Alameda Santos</span>
          </div>

          {/* Quick Action Button */}
          <div className="flex items-center gap-2">
            <button 
              id="header-btn-quiz"
              onClick={() => {
                resetQuiz();
                setQuizStep("intro");
                setShowQuizOverlay(true);
              }}
              className="text-xs font-semibold py-1.5 px-3 rounded-full bg-[#C5A059]/10 text-[#E8D2A6] border border-[#C5A059]/35 hover:bg-[#C5A059]/15 transition-all cursor-pointer hidden md:block"
            >
              Fazer Avaliação (Quiz)
            </button>
            <button 
              id="header-btn-whatsapp"
              onClick={openDirectWhatsApp}
              className="text-xs font-semibold bg-[#C5A059] text-[#050505] py-2 px-4 rounded-full hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#050505]" />
              <span>Agendar Consulta</span>
            </button>
          </div>
        </div>

        {/* PROMPTS EXTRA 2: LOGRADOURO MARQUEE TICKER (Passando devagar com links de âncoras funcionais) */}
        <div className="bg-stone-950 text-stone-300 py-2 border-y border-[#C5A059]/15 overflow-hidden relative">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-8">
            {marqueeItems.map((item, index) => {
              // Parse basic text for scroll target mappings
              let targetId = "sobre-mim";
              if (item.includes("SOBRE")) targetId = "sobre-mim";
              else if (item.includes("PROVA VISUAL")) targetId = "provas-reais";
              else if (item.includes("HARMONIZAÇÃO DE CORAÇÃO") || item.includes("💚")) targetId = "harmonizacao-coracao";
              else if (item.includes("ONDE NOS ENCONTRAR")) targetId = "onde-encontrar";
              else if (item.includes("CONTATO")) targetId = "contato";

              return (
                <button
                  key={index}
                  onClick={() => scrollToSection(targetId)}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-stone-300 hover:text-[#edd39a] transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (Dobra 1: 100% focused on expert visual, trust, naturality) */}
      <section id="home" className="relative pt-6 pb-12 md:py-20 bg-radial from-[#0d0d0d] to-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Visual Left Block: Hero Portrait of Dra. Mayra */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-5/6 rounded-3xl overflow-hidden border-2 border-[#C5A059]/35 shadow-xl bg-stone-900">
                <img 
                  src={EXPERT_DATA.images.hero} 
                  alt="Dra. Mayra Polliana - Harmonização Facial" 
                  className="w-full h-full object-cover object-center filter saturate-[1.02]"
                  referrerPolicy="no-referrer"
                />
                
                {/* Visual accents */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/0 to-transparent" />
                
                {/* Overlaid credentials tag */}
                <div className="absolute bottom-4 left-4 right-4 bg-stone-950/85 backdrop-blur-md p-4 rounded-2xl border border-[#C5A059]/30 text-white">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-xs tracking-widest uppercase font-semibold text-[#E8D2A6]">Procedimento Exclusivo</span>
                  </div>
                  <h4 className="text-base font-bold font-luxury-serif tracking-tight mt-1">Dra. Mayra Polliana</h4>
                  <p className="text-xs text-stone-300 mt-0.5">Estética avançada focada em resgatar sua autenticidade.</p>
                </div>
              </div>
            </div>

            {/* Copy Right Block: Persuasive text */}
            <div className="lg:col-span-6 text-left space-y-6">
              <div className="inline-flex items-center gap-2 py-1 px-3.5 rounded-full bg-[#C5A059]/10 border border-[#C5A059]/30 text-[#E8D2A6] text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>⚜️ Atendimento Premium em São Paulo</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-luxury-serif tracking-tight text-[#FDFCF0] leading-tight">
                Eu sou Dra. Mayra Polliana. Especialista em realçar sua beleza com <span className="italic font-normal text-[#C5A059]">naturalidade e equilíbrio</span>.
              </h1>
              
              <p className="text-stone-300 text-base md:text-lg leading-relaxed max-w-xl">
                O método de Harmonização Facial exclusivo focado em proporção, sofisticação e máxima segurança. Desenhado para quem exige discrição e refinamento — sem artificialidades ou exageros.
              </p>

              {/* Bullet Quick benefits for safety */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-stone-900 border border-stone-850 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#E8D2A6]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#FDFCF0]">Planejamento Facial Único</h5>
                    <p className="text-xs text-stone-400">Avaliação baseada na sua anatomia</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="p-1 rounded-full bg-stone-900 border border-stone-850 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#E8D2A6]" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-[#FDFCF0]">Materiais Importados</h5>
                    <p className="text-xs text-stone-400">Apenas marcas premium mundiais</p>
                  </div>
                </div>
              </div>

              {/* High converting touch button CTA */}
              <div className="space-y-3 pt-4">
                <button 
                  id="hero-btn-cta"
                  onClick={openDirectWhatsApp}
                  className="w-full sm:w-auto py-4 px-8 rounded-xl font-bold gold-gradient text-[#050505] hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#C5A059]/20 group cursor-pointer animate-premium-pulse"
                >
                  <MessageSquare className="w-5 h-5 text-[#050505] group-hover:scale-110 transition-transform" />
                  <span>Agendar Consulta no WhatsApp</span>
                </button>
                <p className="text-xs text-stone-400 italic pl-1 flex items-center gap-1.5 justify-center sm:justify-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A059]" />
                  Primeira consulta de avaliação sem compromisso financeiro
                </p>
              </div>

              {/* Direct access to Quiz option highlighted inside Hero */}
              <div className="p-4 rounded-2xl bg-[#121212]/80 backdrop-blur-md border border-[#C5A059]/25 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-[#FDFCF0] flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#C5A059]" />
                    Não sabe por onde começar?
                  </h4>
                  <p className="text-xs text-stone-400 mt-0.5">Participe da nossa avaliação interativa rápida.</p>
                </div>
                <button
                  id="hero-btn-quiz-cta"
                  onClick={() => {
                    resetQuiz();
                    setQuizStep("intro");
                    setShowQuizOverlay(true);
                  }}
                  className="py-2 px-4 rounded-lg bg-[#050505] hover:bg-stone-900 text-xs font-semibold text-[#E8D2A6] border border-[#C5A059]/35 shadow-xs transition-colors cursor-pointer"
                >
                  Fazer Quiz Personalizado
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 4. PROCEDIMENTO VIDEO SECTION (Highlighting Video at the top) */}
      <section id="video-apresentacao" className="py-12 bg-stone-950 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Video Player Block */}
            <div className="lg:col-span-5 flex flex-col items-center w-full">
              <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[9/16] rounded-3xl overflow-hidden border-2 border-[#C5A059]/40 shadow-2xl bg-stone-900 group mx-auto">
                <video 
                  ref={videoRef}
                  src={VIDEO_SECTION.url}
                  className="w-full h-full object-cover"
                  playsInline
                  loop
                  muted={isVideoMuted}
                  autoPlay
                  referrerPolicy="no-referrer"
                />

                {/* Ambient vignette and Sound Control Overlay - Persistent for easy desktop/mobile access */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/90 via-stone-950/30 to-transparent p-4 flex flex-col gap-2">
                  <span className="text-[10px] text-stone-300 tracking-wider text-center">Demonstração • Dra. Mayra Polliana</span>
                  
                  <button 
                    onClick={toggleMute}
                    className="w-full py-2 px-3 rounded-xl bg-stone-950/95 backdrop-blur-md text-white border border-[#C5A059]/40 hover:border-[#C5A059] transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg hover:scale-102"
                    title={isVideoMuted ? "Ativar Som" : "Silenciar"}
                  >
                    {isVideoMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-[#E8D2A6] animate-pulse" />
                        <span className="text-xs font-semibold tracking-wide text-stone-200">Ativar Som</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-[#C5A059]" />
                        <span className="text-xs font-semibold tracking-wide text-stone-200">Silenciar</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              {/* Controls guide focusing ONLY on sound as requested */}
              <div className="flex flex-col items-center justify-center gap-1.5 mt-3 text-xs text-stone-400 text-center">
                <span className="flex items-center gap-1.5 justify-center">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Reproduzindo automaticamente
                </span>
                <button 
                  onClick={toggleMute}
                  className="hover:text-[#E8D2A6] underline text-[11px] cursor-pointer"
                >
                  {isVideoMuted ? "Clique para ativar o som" : "Som ativado"}
                </button>
              </div>
            </div>

            {/* Copy Adjacent Block */}
            <div className="lg:col-span-7 text-left space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#E8D2A6] uppercase border-b-2 border-[#C5A059] pb-1 inline-block">
                Técnica & Delicadeza
              </span>
              <h3 className="text-2xl md:text-3xl font-bold font-luxury-serif text-[#E8D2A6] leading-tight">
                Procedimento Realizado com Propósito
              </h3>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                Descubra como a beleza pode ser realçada com técnica, sensibilidade e propósito. Resultados naturais e transformadores. Aperte o play e sinta a diferença de ser cuidada por quem entende que sua beleza é única, e merece atenção especial.
              </p>
              
              <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3">
                <h5 className="text-xs font-bold text-[#E8D2A6] uppercase tracking-wider">Atendimento Seguro:</h5>
                <p className="text-xs text-stone-400 leading-relaxed">
                  Todo procedimento é procedido de biossegurança estrita, mapeamento individual muscular e dosagem conservadora para garantir que seu sorriso e expressões continuem espontâneos.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. QUEM SOU EU SECTION (Autoridade pessoal, humana e sofisticada) */}
      <section id="sobre-mim" className="py-16 md:py-24 bg-[#0d0d0d] relative border-t border-[#C5A059]/15">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Copy Left Block */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
                A Profissional por trás da Beleza Natural
              </span>
              
              <h2 className="text-3xl md:text-4xl font-bold font-luxury-serif text-[#FDFCF0] tracking-tight leading-tight">
                "Não crio novos rostos. Eu revelo a sofisticação que já existe em você."
              </h2>

              <div className="space-y-4 text-stone-300 text-sm md:text-base leading-relaxed">
                <p>
                  Olá, eu sou a <strong>Dra. Mayra Polliana</strong>. Atuo na área de harmonização facial com uma filosofia clara: a estética avançada deve servir para resgatar a sua autoestima e realçar os seus pontos fortes, jamais para padronizar feições.
                </p>
                <p>
                  Acredito que cada ruga ou contorno tem uma história, e o meu trabalho é suavizar marcas do tempo devolvendo o viço e a firmeza perdidos, respeitando a sua individualidade anatômica.
                </p>
                <p>
                  No meu espaço clínico na região da Av. Paulista, você não encontrará fórmulas prontas. Cada paciente passa por uma consulta minuciosa e focada em resultados reais e autênticos.
                </p>
              </div>

              {/* Bullet differences */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C5A059]/15 flex items-center justify-center mt-1 text-[#E8D2A6]">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#FDFCF0]">Estética com Intencionalidade</h4>
                    <p className="text-xs text-stone-400">Planejamento focado em manter suas expressões dinâmicas e naturais.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C5A059]/15 flex items-center justify-center mt-1 text-[#E8D2A6]">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#FDFCF0]">Localização Privilegiada</h4>
                    <p className="text-xs text-stone-400">Discreta e segura na Av. Paulista, com fácil acesso e total privacidade.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#C5A059]/15 flex items-center justify-center mt-1 text-[#E8D2A6]">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#FDFCF0]">Acompanhamento Atencioso</h4>
                    <p className="text-xs text-stone-400">Suporte integral pós-procedimento para sanar todas as suas dúvidas.</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  id="sobre-btn-insta"
                  onClick={() => window.open(EXPERT_DATA.instagramLink, "_blank")}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#FDFCF0] hover:text-[#E8D2A6] border-b-2 border-[#C5A059] pb-1 transition-all cursor-pointer"
                >
                  <Instagram className="w-4 h-4" />
                  Ver bastidores no meu Instagram Reels
                </button>
              </div>

            </div>

            {/* Photo Right Block: Secondary image of Dra. Mayra */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm aspect-4/5 rounded-3xl overflow-hidden border border-[#C5A059]/35 shadow-xl bg-stone-900 group">
                <img 
                  src={EXPERT_DATA.images.secondary} 
                  alt="Dra. Mayra Polliana Harmonização" 
                  className="w-full h-full object-cover object-top filter brightness-[0.98] hover:scale-103 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/40 via-transparent to-transparent pointer-events-none" />
                
                {/* Floating caption badge */}
                <div className="absolute bottom-4 left-4 bg-stone-950/95 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#C5A059]/25 text-[#FDFCF0]">
                  <p className="text-xs font-bold font-luxury-serif text-[#C5A059]">Atendimento Humanizado</p>
                  <p className="text-[10px] text-stone-400 font-medium">Focado na sua história e bem-estar.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. RESULTADOS REAIS SECTION (Grid de Antes/Depois com Lightbox integrado) */}
      <section id="provas-reais" className="py-16 bg-[#050505] border-t border-[#C5A059]/15">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
              Resultados Práticos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-luxury-serif text-[#FDFCF0] tracking-tight">
              Galeria de Transformações
            </h2>
            <p className="text-sm text-stone-300">
              Clique em qualquer imagem para abrir em tela cheia e analisar a sutileza e elegância dos procedimentos de Harmonização Facial.
            </p>
          </div>

          {/* Social Proof Images Auto-Slider */}
          <div className="relative max-w-5xl mx-auto px-4 group">
            {/* Carousel container */}
            <div className="overflow-hidden rounded-2xl border border-[#C5A059]/15">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${socialIndex * (100 / socialItemsToShow)}%)` }}
              >
                {EXPERT_DATA.socialProof.map((imgSrc, index) => (
                  <div 
                    key={index}
                    className="w-full sm:w-1/2 md:w-1/3 shrink-0 p-2"
                  >
                    <div 
                      className="relative aspect-square bg-stone-900 rounded-xl overflow-hidden border border-stone-800 shadow-xs hover:shadow-md hover:border-[#C5A059]/45 transition-all cursor-pointer group/item"
                      onClick={() => setLightboxImage(imgSrc)}
                    >
                      <img 
                        src={imgSrc} 
                        alt={`Caso de Harmonização Facial Dra. Mayra ${index + 1}`} 
                        className="w-full h-full object-cover group-hover/item:scale-104 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      {/* Zoom overlay label */}
                      <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="py-1 px-3 bg-[#050505]/95 text-white text-[10px] font-bold rounded-full uppercase tracking-wider shadow-sm border border-[#C5A059]/30 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-[#C5A059]" /> Ampliar Caso
                        </div>
                      </div>
                      
                      {/* Discrete tags */}
                      <span className="absolute top-2.5 left-2.5 text-[9px] bg-stone-950/85 text-[#E8D2A6] py-0.5 px-1.5 rounded-full font-semibold border border-[#C5A059]/25">
                        Caso {index + 1}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Left/Right manual arrows for premium UX */}
            {EXPERT_DATA.socialProof.length > socialItemsToShow && (
              <>
                <button
                  onClick={() => setSocialIndex(prev => prev === 0 ? Math.max(0, EXPERT_DATA.socialProof.length - socialItemsToShow) : prev - 1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-stone-950/90 border border-[#C5A059]/40 flex items-center justify-center text-[#E8D2A6] hover:text-white hover:bg-stone-900 transition-all cursor-pointer shadow-lg z-10"
                  aria-label="Caso anterior"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={() => setSocialIndex(prev => {
                    const max = Math.max(0, EXPERT_DATA.socialProof.length - socialItemsToShow);
                    return prev >= max ? 0 : prev + 1;
                  })}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-stone-950/90 border border-[#C5A059]/40 flex items-center justify-center text-[#E8D2A6] hover:text-white hover:bg-stone-900 transition-all cursor-pointer shadow-lg z-10"
                  aria-label="Próximo caso"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Pagination Indicators / Dots */}
            <div className="flex justify-center gap-1.5 pt-4">
              {Array.from({ length: Math.max(0, EXPERT_DATA.socialProof.length - socialItemsToShow + 1) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSocialIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${socialIndex === idx ? 'bg-[#C5A059] w-4 shadow-sm shadow-[#C5A059]/50' : 'bg-stone-800 hover:bg-stone-700'}`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs text-stone-400 italic">
              *Aviso Importante: Os resultados podem variar de pessoa para pessoa devido a características anatômicas individuais e hábitos de vida de cada paciente.
            </p>
          </div>

        </div>
      </section>

      {/* 7. POR QUE CONFIAR EM MIM SECTION (Cards elegantes com diferenciais) */}
      <section id="por-que-confiar" className="py-16 md:py-20 bg-[#0d0d0d] border-t border-[#C5A059]/15">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
              Seus Cuidados na Mão Certa
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-luxury-serif text-[#FDFCF0] tracking-tight">
              Os Pilares do Meu Atendimento
            </h2>
            <p className="text-sm text-stone-300">
              Conheça os diferenciais que tornam a minha consulta uma experiência diferenciada, privativa e segura.
            </p>
          </div>

          {/* Grid Cards layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {TRUST_DIFFERENTIALS.map((diff, index) => {
              // Map icons dynamically
              let IconComponent = Sparkles;
              if (diff.icon === "Shield") IconComponent = Shield;
              if (diff.icon === "Heart") IconComponent = Heart;
              if (diff.icon === "Lock") IconComponent = Lock;

              return (
                <div 
                  key={index} 
                  className="bg-stone-900/60 backdrop-blur-md border border-stone-800 p-6 rounded-2xl text-left hover:border-[#C5A059]/35 transition-colors group space-y-4"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#C5A059]/15 flex items-center justify-center text-[#E8D2A6] group-hover:bg-[#C5A059]/25 transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="text-lg font-bold font-luxury-serif text-[#FDFCF0] tracking-tight">
                    {diff.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {diff.description}
                  </p>
                </div>
              );
            })}
          </div>

         </div>
      </section>

      {/* 8. CTA INTERMEDIÁRIO (Crushing objections and directing back to the WhatsApp or Quiz) */}
      <section className="py-16 bg-stone-950 text-white relative overflow-hidden border-t border-[#C5A059]/15">
        <div className="absolute inset-0 bg-radial from-stone-900/60 to-stone-950 pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 text-center relative space-y-6">
          <span className="text-xs font-bold tracking-widest text-[#E8D2A6] uppercase bg-[#C5A059]/10 py-1 px-3.5 rounded-full border border-[#C5A059]/20">
            Segurança em Primeiro Lugar
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-luxury-serif text-white tracking-tight leading-tight max-w-xl mx-auto">
            Tem receio de perder a naturalidade? Deixe as dúvidas para trás.
          </h2>
          <p className="text-stone-300 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
            Nós mapeamos cada detalhe das suas expressões faciais em repouso e em movimento. O nosso objetivo é que as pessoas percebam que você está mais descansada e rejuvenescida, sem jamais desconfiar que passou por procedimentos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button 
              id="cta-intermed-btn-whatsapp"
              onClick={openDirectWhatsApp}
              className="w-full sm:w-auto py-4 px-8 rounded-xl font-bold bg-gradient-to-r from-[#C5A059] via-[#E8D2A6] to-[#C5A059] text-stone-950 hover:brightness-110 transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#C5A059]/20 cursor-pointer animate-premium-pulse"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Chamar no WhatsApp sem Compromisso</span>
            </button>
            <button 
              id="cta-intermed-btn-quiz"
              onClick={() => {
                resetQuiz();
                setQuizStep("intro");
                setShowQuizOverlay(true);
              }}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl font-medium text-stone-300 bg-stone-900 border border-stone-850 hover:bg-[#121212] hover:border-stone-700 transition-all text-sm cursor-pointer"
            >
              Iniciar Avaliação (Quiz)
            </button>
          </div>
        </div>
      </section>

      {/* 9. COMO FUNCIONA A CONSULTA (3 steps journey timeline) */}
      <section id="como-funciona" className="py-16 md:py-20 bg-[#0d0d0d] border-t border-[#C5A059]/15">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
              O Fluxo do Atendimento
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-luxury-serif text-[#FDFCF0] tracking-tight">
              Sua Jornada de Cuidado
            </h2>
            <p className="text-sm text-stone-300">
              Desde o primeiro clique até a consulta de retorno, garantimos total conforto, clareza e dedicação.
            </p>
          </div>

          {/* 3 Step columns layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
            {CONSULTATION_STEPS.map((item, index) => (
              <div 
                key={index} 
                className="bg-stone-900 border border-stone-850 p-8 rounded-2xl text-left relative overflow-hidden flex flex-col justify-between h-full hover:border-[#C5A059]/35 transition-colors"
              >
                {/* Big steps counter */}
                <div className="absolute top-4 right-6 text-5xl font-luxury-serif font-bold text-[#C5A059]/15">
                  {item.step}
                </div>

                <div className="space-y-4">
                  <div className="w-8 h-8 rounded-full bg-[#C5A059]/15 text-[#E8D2A6] font-bold text-xs flex items-center justify-center border border-[#C5A059]/20">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold font-luxury-serif text-[#FDFCF0] tracking-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 mt-4 text-[11px] text-stone-400 font-medium uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Sem compromisso financeiro inicial
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 10. MAIS PROVAS (Harmonização de 💚 - notes, heartful visual statements, backstage) */}
      <section id="harmonizacao-coracao" className="py-16 bg-[#050505] border-t border-[#C5A059]/15">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
          
          <div className="space-y-3 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
              Feito de 💚 para você
            </span>
            <h2 className="text-3xl md:text-4xl font-bold font-luxury-serif text-[#FDFCF0] tracking-tight">
              Harmonizações de Coração
            </h2>
            <p className="text-sm text-stone-300">
              Depoimentos, carinho das pacientes, e registros de momentos únicos e atendimentos cheios de sensibilidade.
            </p>
          </div>

          {/* Interactive gallery of Heart elements Auto-Slider */}
          <div className="relative max-w-5xl mx-auto px-4 group">
            {/* Carousel container */}
            <div className="overflow-hidden rounded-2xl border border-[#C5A059]/15">
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${heartsIndex * (100 / heartsItemsToShow)}%)` }}
              >
                {EXPERT_DATA.heartsGallery.map((imgSrc, index) => (
                  <div 
                    key={index}
                    className="w-full sm:w-1/2 lg:w-1/4 shrink-0 p-2"
                  >
                    <div 
                      className="relative aspect-4/5 rounded-xl overflow-hidden border border-stone-800 shadow-xs hover:shadow-md hover:border-[#C5A059]/45 transition-all cursor-pointer group/item bg-stone-900"
                      onClick={() => setLightboxImage(imgSrc)}
                    >
                      <img 
                        src={imgSrc} 
                        alt={`Harmonização de Coração Dra. Mayra ${index + 1}`} 
                        className="w-full h-full object-cover group-hover/item:scale-103 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Interactive heart indicator */}
                      <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-stone-950/70 backdrop-blur-md flex items-center justify-center text-rose-400 border border-stone-800">
                        <Heart className="w-4.5 h-4.5 fill-current" />
                      </div>

                      <div className="absolute inset-0 bg-stone-950/25 opacity-0 group-hover/item:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="py-1 px-3 bg-[#050505]/95 text-white border border-[#C5A059]/25 text-[10px] font-bold rounded-full uppercase tracking-wider shadow-xs">
                          Ampliar Recado
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Left/Right manual arrows for premium UX */}
            {EXPERT_DATA.heartsGallery.length > heartsItemsToShow && (
              <>
                <button
                  onClick={() => setHeartsIndex(prev => prev === 0 ? Math.max(0, EXPERT_DATA.heartsGallery.length - heartsItemsToShow) : prev - 1)}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-stone-950/90 border border-[#C5A059]/40 flex items-center justify-center text-[#E8D2A6] hover:text-white hover:bg-stone-900 transition-all cursor-pointer shadow-lg z-10"
                  aria-label="Recado anterior"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={() => setHeartsIndex(prev => {
                    const max = Math.max(0, EXPERT_DATA.heartsGallery.length - heartsItemsToShow);
                    return prev >= max ? 0 : prev + 1;
                  })}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-9 h-9 rounded-full bg-stone-950/90 border border-[#C5A059]/40 flex items-center justify-center text-[#E8D2A6] hover:text-white hover:bg-stone-900 transition-all cursor-pointer shadow-lg z-10"
                  aria-label="Próximo recado"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Pagination Indicators / Dots */}
            <div className="flex justify-center gap-1.5 pt-4">
              {Array.from({ length: Math.max(0, EXPERT_DATA.heartsGallery.length - heartsItemsToShow + 1) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setHeartsIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${heartsIndex === idx ? 'bg-[#C5A059] w-4 shadow-sm shadow-[#C5A059]/50' : 'bg-stone-800 hover:bg-stone-700'}`}
                  aria-label={`Ir para slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="text-center">
            <button 
              id="heart-btn-whatsapp"
              onClick={openDirectWhatsApp}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8D2A6] hover:text-white transition-colors cursor-pointer"
            >
              Quer fazer parte das nossas pacientes queridas? <span className="underline">Reserve seu horário</span>
            </button>
          </div>

        </div>
      </section>

      {/* 11. MAP & ADDRESS (EXTRA: Mapa para encontrar a clínica na Av. Paulista / Al. Santos) */}
      <section id="onde-encontrar" className="py-16 bg-[#0d0d0d] border-t border-[#C5A059]/15">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Copy Block */}
            <div className="lg:col-span-5 text-left space-y-6">
              <span className="text-xs font-bold tracking-widest text-[#C5A059] uppercase">
                Onde nos encontrar
              </span>
              <h2 className="text-3xl font-bold font-luxury-serif text-[#FDFCF0] tracking-tight leading-tight">
                Localização Privilegiada e Discreta
              </h2>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                Estamos localizados no coração financeiro de São Paulo, no cruzamento da <strong className="text-[#FDFCF0]">Avenida Paulista com a Alameda Santos</strong>. 
              </p>
              <p className="text-stone-300 text-sm md:text-base leading-relaxed">
                Um local de facílimo acesso por metrô ou veículo, com segurança reforçada, privacidade de consultório particular e estacionamento conveniado.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#FDFCF0]">Endereço Exclusivo</h4>
                    <p className="text-xs text-stone-400">Av. Paulista / Alameda Santos - Jardins, São Paulo - SP</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#C5A059] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-[#FDFCF0]">Horário de Atendimento</h4>
                    <p className="text-xs text-stone-400">De Segunda a Sexta: 09:00 às 19:00 (Apenas com agendamento prévio)</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Alameda Santos, Av Paulista, Sao Paulo")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold gold-gradient hover:brightness-110 text-stone-950 py-3 px-5 rounded-xl transition-all cursor-pointer shadow-lg shadow-[#C5A059]/10"
                >
                  <Compass className="w-4 h-4 text-stone-950" />
                  <span>Traçar rota no Google Maps</span>
                </a>
              </div>

            </div>

            {/* Simulated premium interactive high-fidelity Map block */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden border border-[#C5A059]/35 shadow-lg h-96 bg-stone-900 group">
                {/* Embed high-fidelity OpenStreetMap or static high-end visual representations of Paulista crossing */}
                <iframe 
                  title="Mapa Clínica Mayra Polliana"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.197587002047!2d-46.6586025!3d-23.5613497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f943118a97f1a!2sAlameda%20Santos%20%26%20Av.%20Paulista!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                  className="w-full h-full border-0 grayscale hover:grayscale-0 transition-all duration-750"
                  allowFullScreen
                  loading="lazy"
                />
                
                {/* Elegant overlay badge */}
                <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md py-2 px-3 rounded-lg border border-[#C5A059]/30 text-white text-[11px] font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>⚜️ Região dos Jardins / Paulista</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. CTA FINAL (Decisive, high converting block) */}
      <section id="contato" className="py-20 bg-[#050505] relative overflow-hidden text-[#FDFCF0] border-t border-[#C5A059]/15">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative">
          
          <div className="inline-flex p-3 rounded-full bg-[#C5A059]/15 border border-[#C5A059]/45 text-[#E8D2A6]">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-luxury-serif text-[#FDFCF0] tracking-tight leading-tight max-w-2xl mx-auto">
            Pronta para agendar sua primeira consulta na Av. Paulista?
          </h2>
          
          <p className="text-stone-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Dê o primeiro passo rumo a uma feição mais leve, harmônica e descansada de forma totalmente segura. Fale conosco agora e reserve o seu horário particular exclusivo.
          </p>

          <div className="space-y-4 pt-2">
            <button 
              id="cta-final-btn-whatsapp"
              onClick={openDirectWhatsApp}
              className="w-full sm:w-auto py-4 px-10 rounded-xl font-bold gold-gradient text-stone-950 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#C5A059]/20 mx-auto cursor-pointer animate-premium-pulse"
            >
              <MessageSquare className="w-5 h-5 text-stone-950" />
              <span>Clique aqui para agendar sua consulta</span>
            </button>
            <p className="text-xs text-stone-400 italic">
              ✦ Sem compromisso financeiro • Espaço privativo e seguro
            </p>
          </div>

          {/* Quick link back to the quiz for users that changed mind */}
          <div className="pt-2">
            <button 
              id="cta-final-btn-quiz"
              onClick={() => {
                resetQuiz();
                setQuizStep("intro");
                setShowQuizOverlay(true);
              }}
              className="text-xs text-[#E8D2A6] hover:text-white font-semibold underline cursor-pointer"
            >
              Prefere passar pelo quiz de compatibilidade primeiro? Clique aqui
            </button>
          </div>

        </div>
      </section>

      {/* 13. RODAPÉ (Simple, elegant and branded) */}
      <footer className="bg-stone-950 text-white py-12 border-t border-[#C5A059]/15">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center text-center space-y-6">
          
          {/* Handwritten-styled signature branding */}
          <div className="space-y-1">
            <span className="font-signature text-5xl text-[#C5A059] block">
              Mayra Polliana
            </span>
            <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold block">
              Dra. Mayra Polliana • Harmonização Facial Natural
            </span>
          </div>

          <div className="text-xs text-stone-400 space-y-2 leading-relaxed">
            <p>📍 Av. Paulista / Alameda Santos, Jardins, São Paulo - SP</p>
            <p>⚜️ Atendimento Exclusivo • Espaço CliniPaulista</p>
            <p className="text-[10px] text-stone-500 pt-2">
              © {new Date().getFullYear()} Dra. Mayra Polliana. Todos os direitos reservados.
            </p>
          </div>

          {/* Social connections */}
          <div className="flex items-center gap-4 pt-2">
            <a 
              href={EXPERT_DATA.instagramLink} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-stone-900 hover:bg-[#C5A059]/25 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-all"
              title="Acesse o Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href={EXPERT_DATA.whatsappLink} 
              target="_blank" 
              rel="noreferrer"
              className="w-10 h-10 rounded-full bg-stone-900 hover:bg-[#C5A059]/25 border border-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition-all"
              title="Fale no WhatsApp"
            >
              <MessageSquare className="w-5 h-5" />
            </a>
          </div>

        </div>
      </footer>

      {/* LIGHTBOX COMPONENT FOR FULLSCREEN IMAGES */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 p-3 rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-colors cursor-pointer border border-stone-800"
            >
              <X className="w-6 h-6" />
            </button>
            
            <motion.div 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-3xl max-h-[85vh] rounded-2xl overflow-hidden border border-[#C5A059]/35 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={lightboxImage} 
                alt="Caso Ampliado" 
                className="w-full h-auto max-h-[80vh] object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="bg-stone-900 p-4 text-center border-t border-stone-800 text-white text-xs">
                <span>Visualização Exclusiva de Resultado • Dra. Mayra Polliana</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

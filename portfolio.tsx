"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Github, Linkedin, Mail, ExternalLink, Database, Briefcase, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { toast } from "sonner"

export default function Component() {
  const [typedText, setTypedText] = useState("")
  const [showCursor, setShowCursor] = useState(true)
  const fullText = "HIMNISH.EXE"
  const [konamiActive, setKonamiActive] = useState(false)
  const konamiCode = useRef<string[]>([])
  const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']
  const hasShownAchievements = useRef({
    about: false,
    skills: false,
    experience: false,
    projects: false,
  })

  // Typing animation effect
  useEffect(() => {
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex))
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 150)

    return () => clearInterval(typingInterval)
  }, [])

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(cursorInterval)
  }, [])

  // Konami Code Detection
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      konamiCode.current.push(e.key)
      if (konamiCode.current.length > konamiSequence.length) {
        konamiCode.current.shift()
      }

      const isMatch = konamiCode.current.every((key, index) => key === konamiSequence[index])
      if (isMatch && konamiCode.current.length === konamiSequence.length) {
        setKonamiActive(true)
        toast("🎮 CHEAT CODE ACTIVATED!", {
          description: "Developer Mode Unlocked! You found the secret!",
          duration: 5000,
          style: {
            background: '#000',
            border: '3px solid #ff00ff',
            color: '#00ff00',
            fontWeight: 'bold',
          },
        })
        konamiCode.current = []
        
        // Auto-disable after 10 seconds
        setTimeout(() => setKonamiActive(false), 10000)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Scroll Reveal Animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal')
          }
        })
      },
      { threshold: 0.1 }
    )

    // Observe all sections and cards
    const elements = document.querySelectorAll('.reveal-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  // Achievement toasts on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'about', title: '📊 STATS UNLOCKED', message: 'Player data accessed' },
        { id: 'skills', title: '⚡ SKILL TREE DISCOVERED', message: 'Technologies revealed' },
        { id: 'education', title: '🎓 EDUCATION LOADED', message: 'Academic records accessed' },
        { id: 'experience', title: '🏆 QUEST LOG OPENED', message: 'Experience points loaded' },
        { id: 'projects', title: '🎮 PROJECT ARCHIVE ACCESSED', message: 'High scores retrieved' },
      ]

      sections.forEach(({ id, title, message }) => {
        const element = document.getElementById(id)
        if (element && !hasShownAchievements.current[id as keyof typeof hasShownAchievements.current]) {
          const rect = element.getBoundingClientRect()
          // Trigger when section is 70% into viewport
          if (rect.top < window.innerHeight * 0.7 && rect.top > -100) {
            hasShownAchievements.current[id as keyof typeof hasShownAchievements.current] = true
            toast(title, {
              description: message,
              duration: 3000,
              style: {
                background: '#000',
                border: '2px solid #00ff00',
                color: '#00ff00',
              },
            })
          }
        }
      })
    }

    // Check on mount too
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const projects = [
    {
      title: "LECTUREMATE-AI",
      description: [
        "AI note generator converting lectures → searchable notes (audio + PDF/DOCX/TXT processing)",
        "RAG system with FAISS + DeepSeek V2 for contextual Q&A across all course materials",
        "Real-time chat interface with markdown rendering and PDF/DOCX export"
      ],
      tags: ["Next.js 15", "TypeScript", "FastAPI", "Whisper", "RAG", "FAISS", "DeepSeek V2", "SQLAlchemy"],
      github: "https://github.com/himnishpersonal/lectureAI",
      live: "#",
    },
    {
      title: "SMARTINVEST BOT",
      description: [
        "XGBoost model (84% accuracy) trained on 200K+ prices + 4,800+ news articles for 483 S&P 500 stocks",
        "Automated ETL with 4 APIs, achieving +7.81% returns vs +5.84% benchmark (Sharpe: 2.14)",
        "Discord bot with 6 commands: recommendations, portfolio simulation, risk management"
      ],
      tags: ["Python", "XGBoost", "FinBERT", "Discord", "ETL", "APIs"],
      github: "https://github.com/himnishpersonal/smartinvest-bot",
      live: "#",
    },
    {
      title: "HEART ATTACK RISK PREDICTOR",
      description: [
        "ML model analyzing patient health data with 95% F1 score using Random Forest + KNN",
        "Identified key risk factors: cholesterol levels, chest pain type, exercise-induced angina",
        "Statistical testing and classification algorithms for medical risk prediction"
      ],
      tags: ["Python", "Pandas", "Scikit-learn", "Random Forest", "KNN", "ML"],
      github: "https://himnishpersonal.github.io/",
      live: "#",
    },
    {
      title: "TERPIEZ",
      description: [
        "Cross-platform iOS/Android game with geolocation + accelerometer for shake-to-catch mechanics",
        "Background services for real-time proximity notifications (20m range) with custom sounds",
        "Dual persistence: SharedPreferences (local) + Redis (server) for stats and locations"
      ],
      tags: ["Flutter", "Dart", "Redis", "Geolocation", "SharedPreferences", "Mobile"],
      github: "#",
      live: "#",
    },
    {
      title: "MYSTOCKTRACKER",
      description: [
        "Full-stack portfolio tracker with Node.js + Express.js, MongoDB auth, Yahoo Finance API",
        "Real-time stock quotes, historical data, AI-powered insights, and trend analysis",
        "Personalized dashboard with performance tracking and investment recommendations"
      ],
      tags: ["Node.js", "Express.js", "EJS", "MongoDB", "Yahoo Finance API", "REST APIs"],
      github: "https://github.com/himnishpersonal/MyStockTracker",
      live: "#",
    },
  ]

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Scanlines Effect */}
      <div className="fixed inset-0 pointer-events-none z-10 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)",
          }}
        ></div>
      </div>

      {/* Grid Background */}
      <div className="fixed inset-0 opacity-5">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(#00ff00 1px, transparent 1px), linear-gradient(90deg, #00ff00 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm border-b-2 border-green-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-green-400 font-mono tracking-wider">{"[HIMNISH]"}</div>
            <div className="hidden md:flex space-x-8 font-mono">
              <Link
                href="#home"
                className="text-green-400 hover:text-yellow-400 transition-colors uppercase tracking-wide"
              >
                START
              </Link>
              <Link
                href="#about"
                className="text-green-400 hover:text-yellow-400 transition-colors uppercase tracking-wide"
              >
                STATS
              </Link>
              <Link
                href="#skills"
                className="text-green-400 hover:text-yellow-400 transition-colors uppercase tracking-wide"
              >
                SKILLS
              </Link>
              <Link
                href="#education"
                className="text-green-400 hover:text-yellow-400 transition-colors uppercase tracking-wide"
              >
                EDUCATION
              </Link>
              <Link
                href="#experience"
                className="text-green-400 hover:text-yellow-400 transition-colors uppercase tracking-wide"
              >
                EXPERIENCE
              </Link>
              <Link
                href="#projects"
                className="text-green-400 hover:text-yellow-400 transition-colors uppercase tracking-wide"
              >
                PROJECTS
              </Link>
              <Link
                href="#contact"
                className="text-green-400 hover:text-yellow-400 transition-colors uppercase tracking-wide"
              >
                CONNECT
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="relative">
            {/* Glowing effect */}
            <div className="absolute inset-0 bg-green-400/10 blur-3xl"></div>
            <div className="relative">
              {/* Game Over Style Title */}
              <div className="text-green-400 font-mono text-lg mb-4 tracking-widest">{">>> GAME START <<<"}</div>
              <h1 className="text-6xl md:text-8xl font-bold mb-6 text-green-400 font-mono tracking-wider drop-shadow-[0_0_10px_#00ff00]">
                {typedText}
                {showCursor && <span className="animate-pulse">_</span>}
              </h1>
              <div className="text-2xl md:text-3xl text-yellow-400 mb-8 font-mono tracking-wide">
                {"{ SOFTWARE_ENGINEER }"}
              </div>
              <div className="bg-black/80 border-2 border-green-400 p-6 max-w-3xl mx-auto mb-8 font-mono">
                <div className="text-green-400 text-left">
                  <div className="mb-2">{">"} Loading profile...</div>
                  <div className="mb-2">{">"} Specialization: Full Stack, AI/ML, Mobile Development</div>
                  <div className="mb-2">{">"} Education: B.S. Computer Science @ UMD (2021-2025)</div>
                  <div className="mb-2">{">"} Experience: Fannie Mae, Hughes Network Systems</div>
                  <div className="mb-2">{">"} Status: Full Stack Software Engineer @ Fannie Mae</div>
                  <div className="text-yellow-400 animate-pulse">{">"} Press START to continue_</div>
                </div>
              </div>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-green-400 hover:bg-green-300 text-black font-mono font-bold tracking-wide border-2 border-green-400 shadow-[0_0_20px_#00ff00] uppercase btn-press"
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      const element = document.getElementById('about');
                      element?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  [START GAME]
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-16 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll ${konamiActive ? 'konami-active' : ''}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-green-400 font-mono text-lg mb-4 tracking-widest">{">>> PLAYER STATS <<<"}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-400 font-mono tracking-wider">CHARACTER_INFO</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="relative">
              <div className="border-4 border-green-400 bg-black/80 p-4 mb-6 animate-float">
                <div className="border-2 border-yellow-400 relative overflow-hidden">
                  <Image
                    src="/himmy.png"
                    alt="Player Avatar"
                    width={250}
                    height={250}
                    className="w-full h-auto filter contrast-125 brightness-110"
                  />
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-black/80 border-2 border-green-400 p-6 font-mono">
                <div className="text-green-400 mb-4">
                  <div className="flex justify-between mb-2">
                    <span>NAME:</span>
                    <span className="text-yellow-400">HIMNISH_SAMBARAJU</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>CLASS:</span>
                    <span className="text-yellow-400">SOFTWARE_ENGINEER</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>EDUCATION:</span>
                    <span className="text-yellow-400">UMD_CS_2025</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>LEVEL:</span>
                    <span className="text-yellow-400">SOFTWARE ENGINEER 1</span>
                  </div>
                  <div className="flex justify-between">
                    <span>STATUS:</span>
                    <span className="text-yellow-400 animate-pulse">FULL_STACK_ENGINEER@FANNIE_MAE</span>
                  </div>
                </div>
              </div>

              <div className="bg-black/80 border-2 border-green-400 p-6 font-mono mt-6">
                <div className="text-green-400 mb-4">
                  <div className="text-yellow-400 mb-3 font-bold">EXPERIENCE_LOG:</div>
                  <div className="mb-2 text-sm">
                    <span className="text-yellow-400">[2025-PRESENT]</span> Fannie Mae - Full Stack Software Engineer
                      </div>
                  <div className="mb-2 text-sm">
                    <span className="text-yellow-400">[2024]</span> Fannie Mae - Software Engineering Intern
                    </div>
                  <div className="mb-2 text-sm">
                    <span className="text-yellow-400">[2023]</span> Hughes Network Systems - Data Engineering / Data Science Intern
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-green-400 font-mono text-lg mb-4 tracking-widest">{">>> SKILL TREE <<<"}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-400 font-mono tracking-wider">TECHNOLOGIES</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Programming Languages */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <h3 className="text-lg font-bold text-yellow-400 font-mono">LANGUAGES</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">JavaScript</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">TypeScript</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Python</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Java</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">C</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Ruby</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Dart</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">SQL</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Frontend */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <h3 className="text-lg font-bold text-yellow-400 font-mono">FRONTEND</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">React</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Angular</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Next.js</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">HTML/CSS</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Tailwind CSS</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">EJS</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Flutter</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Backend */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <h3 className="text-lg font-bold text-yellow-400 font-mono">BACKEND</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Node.js</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Express</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Spring Boot</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">FastAPI</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Flask</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">REST APIs</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Microservices</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Databases */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <h3 className="text-lg font-bold text-yellow-400 font-mono">DATABASES</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">MongoDB</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">MySQL</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Oracle</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Amazon Aurora</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Amazon Redshift</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">SQLite</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Redis</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Elasticsearch</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Data & AI/ML */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <h3 className="text-lg font-bold text-yellow-400 font-mono">DATA & AI/ML</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Pandas</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Apache Airflow</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">XGBoost</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">FinBERT</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Whisper</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">FAISS</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">RAG</Badge>
                </div>
              </CardContent>
            </Card>

            {/* DevOps & Cloud */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <h3 className="text-lg font-bold text-yellow-400 font-mono">DEVOPS & CLOUD</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Git</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">AWS</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">AWS ECS</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">GCP</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Linux</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Bitbucket</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Docker</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Testing & Tools */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <h3 className="text-lg font-bold text-yellow-400 font-mono">TESTING & TOOLS</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Karate</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Swagger</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Jira</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Confluence</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">IntelliJ</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Analytics */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <h3 className="text-lg font-bold text-yellow-400 font-mono">ANALYTICS</h3>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Kibana</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Tableau</Badge>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Data Visualization</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-green-400 font-mono text-lg mb-4 tracking-widest">{">>> EDUCATION LOG <<<"}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-400 font-mono tracking-wider">ACADEMIC_RECORDS</h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Card className="bg-black/80 border-4 border-green-400 shadow-[0_0_20px_rgba(0,255,0,0.3)] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)] transition-all">
              <CardHeader className="border-b-2 border-green-400/30 pb-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-bold text-yellow-400 font-mono tracking-wide mb-2">
                      UNIVERSITY OF MARYLAND, COLLEGE PARK
                    </h3>
                    <p className="text-lg text-green-400 font-mono">B.S. in Computer Science</p>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-2">
                    <Badge variant="outline" className="bg-green-400/20 text-green-400 border-green-400 font-mono">
                      <Calendar className="mr-2 h-4 w-4" />
                      Aug 2021 – May 2025
                    </Badge>
                    <p className="text-sm text-gray-400 font-mono">College Park, MD</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {/* Honors */}
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-yellow-400 font-mono mb-3 flex items-center gap-2">
                    <span className="text-green-400">{">"}</span>
                    HONORS & ACHIEVEMENTS
                  </h4>
                  <div className="space-y-2 pl-6">
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">{">"}</span>
                      <span className="text-gray-300 font-mono">
                        <span className="text-green-400 font-bold">UMD Scholars Program</span> (Media, Self and Society)
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">{">"}</span>
                      <span className="text-gray-300 font-mono">
                        <span className="text-green-400 font-bold">Kenneth A. Joseph Scholarship</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Relevant Coursework */}
                <div>
                  <h4 className="text-lg font-bold text-yellow-400 font-mono mb-3 flex items-center gap-2">
                    <span className="text-green-400">{">"}</span>
                    RELEVANT COURSEWORK
                  </h4>
                  <div className="pl-6">
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Object Oriented Programming",
                        "Computer Systems",
                        "Organization of Programming Languages",
                        "Algorithms",
                        "Web App Development with JavaScript",
                        "Database Design",
                        "Web Development with Flask/Python"
                      ].map((course, index) => (
                        <Badge
                key={index}
                          variant="outline"
                          className="bg-cyan-400/10 text-cyan-400 border-cyan-400/50 font-mono text-xs"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-16 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-green-400 font-mono text-lg mb-4 tracking-widest">{">>> QUEST LOG <<<"}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-400 font-mono tracking-wider">EXPERIENCE_HISTORY</h2>
          </div>
          
          <div className="space-y-8">
            {/* Fannie Mae - Full Stack Software Engineer */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-2xl font-bold text-green-400 font-mono">FULL STACK SOFTWARE ENGINEER</h3>
                    </div>
                    <div className="text-yellow-400 font-mono text-lg">FANNIE MAE</div>
                    <div className="flex items-center gap-2 mt-2 text-green-300 font-mono text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Washington DC | Jul 2025 – Present</span>
                    </div>
                  </div>
                  <Badge className="bg-yellow-400/20 text-yellow-400 border border-yellow-400 font-mono text-sm w-fit">
                    CURRENT
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-green-400 font-mono text-sm mb-2 font-bold">TECH STACK:</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Angular</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Spring Boot (Java)</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">REST APIs</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Microservices</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">SQL</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Amazon Aurora</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Amazon Redshift</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">AWS ECS</Badge>
                  </div>
                </div>
                <div className="space-y-3 font-mono text-green-300">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Built the <span className="text-yellow-400 font-bold">NewsDesk UI</span>, a full-stack Angular/Spring Boot application serving <span className="text-yellow-400 font-bold">50+ credit risk analysts</span>, integrating Aurora to provide curated business articles with <span className="text-yellow-400 font-bold">AI-generated summaries, sentiment analysis, relevancy scoring, risk impact</span>, and links to original sources, reducing time spent gathering key information by streamlining data access, with a modern <span className="text-yellow-400 font-bold">publication-inspired design (WaPo/NYT style)</span>.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Implemented <span className="text-yellow-400 font-bold">secure CSV file upload functionality</span> on the <span className="text-yellow-400 font-bold">ECHO risk platform</span> with Angular front-end and Spring Boot back-end validation, ensuring accurate ingestion of risk data and alignment with analysts' workflows.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Contributed to system testing and feature validation on the <span className="text-yellow-400 font-bold">ECHO risk platform</span>, deploying services to <span className="text-yellow-400 font-bold">AWS ECS</span> and using AI-assisted tools to optimize front-end performance and database queries, ensuring smooth production releases.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fannie Mae - Software Engineering Intern */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Briefcase className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-2xl font-bold text-green-400 font-mono">SOFTWARE ENGINEERING INTERN</h3>
                    </div>
                    <div className="text-yellow-400 font-mono text-lg">FANNIE MAE</div>
                    <div className="flex items-center gap-2 mt-2 text-green-300 font-mono text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Washington DC | Jun 2024 – Aug 2024</span>
                    </div>
                  </div>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-sm w-fit">
                    INTERNSHIP
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-green-400 font-mono text-sm mb-2 font-bold">TECH STACK:</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Karate</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">JavaScript</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">SQL (Oracle)</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">JSON</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">CSV</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Swagger</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">IntelliJ</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Bitbucket</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Jira</Badge>
                  </div>
                </div>
                <div className="space-y-3 font-mono text-green-300">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Migrated <span className="text-yellow-400 font-bold">133 regression test scenarios</span> from a legacy Selenium framework to <span className="text-yellow-400 font-bold">Karate API testing</span>, cutting regression execution time by <span className="text-yellow-400 font-bold">92.47%</span> while improving test readability, maintainability, and reliability.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Validated API behavior against <span className="text-yellow-400 font-bold">Oracle databases</span> by writing and optimizing SQL queries to verify response data, strengthening data accuracy and confidence in automated test results.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Streamlined API test automation by managing dynamic <span className="text-yellow-400 font-bold">JSON payloads</span>, implementing <span className="text-yellow-400 font-bold">CSV-driven test cases</span>, and using <span className="text-yellow-400 font-bold">JavaScript</span> for data manipulation and request construction, reducing manual testing effort during feature releases.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Hughes Network Systems Experience */}
            <Card className="bg-black border-2 border-green-400 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="border-b-2 border-green-400">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-2xl font-bold text-green-400 font-mono">DATA ENGINEERING / DATA SCIENCE INTERN</h3>
                      </div>
                    <div className="text-yellow-400 font-mono text-lg">HUGHES NETWORK SYSTEMS</div>
                    <div className="flex items-center gap-2 mt-2 text-green-300 font-mono text-sm">
                      <Calendar className="w-4 h-4" />
                      <span>Germantown, MD | May 2023 – Aug 2023</span>
                    </div>
                  </div>
                  <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-sm w-fit">
                    INTERNSHIP
                  </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                <div className="mb-4">
                  <div className="text-green-400 font-mono text-sm mb-2 font-bold">TECH STACK:</div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Python</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Apache Airflow</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Pandas</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Elasticsearch</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Kibana</Badge>
                    <Badge className="bg-green-400/20 text-green-400 border border-green-400 font-mono text-xs">Google Cloud Storage</Badge>
                  </div>
                </div>
                <div className="space-y-3 font-mono text-green-300">
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Productionized two independent data engineering projects using <span className="text-yellow-400 font-bold">Python and Apache Airflow</span>: (1) an automated Fortinet License Failure Data Pipeline and (2) an Orchestration Activation Analytics system, both running on scheduled workflows and used by both business and technical teams.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Built the <span className="text-yellow-400 font-bold">Fortinet License Failure Data Pipeline</span> to extract, clean, and structure daily failure records (site IDs, timestamps, failure reasons), automatically exporting datasets to CSV and <span className="text-yellow-400 font-bold">Google Cloud Storage (GCS)</span> to support large-scale audits and downstream analysis.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-yellow-400 mt-1">{">"}</span>
                    <span>
                      Developed activation analytics and reporting by analyzing thousands of vendor activation events with <span className="text-yellow-400 font-bold">Pandas, Elasticsearch, and Kibana</span>, culminating in the <span className="text-yellow-400 font-bold">Orchestration Activation Insights Report</span> that identified root causes, enabled corrective actions, and helped resolve <span className="text-yellow-400 font-bold">1,000+ failed activations</span>, increasing overall success rates.
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-green-400 font-mono text-lg mb-4 tracking-widest">{">>> PROJECT ARCHIVE <<<"}</div>
            <h2 className="text-4xl md:text-5xl font-bold text-green-400 font-mono tracking-wider">PROJECTS</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              // Color themes for each project
              const themes = [
                { marquee: 'from-cyan-600 to-cyan-800', marqueeBorder: 'border-cyan-400', text: 'text-cyan-400', textLight: 'text-cyan-300', badge: 'bg-cyan-400/20 text-cyan-400 border-cyan-400' },
                { marquee: 'from-green-600 to-green-800', marqueeBorder: 'border-green-400', text: 'text-green-400', textLight: 'text-green-300', badge: 'bg-green-400/20 text-green-400 border-green-400' },
                { marquee: 'from-red-600 to-red-800', marqueeBorder: 'border-red-400', text: 'text-red-400', textLight: 'text-red-300', badge: 'bg-red-400/20 text-red-400 border-red-400' },
                { marquee: 'from-purple-600 to-purple-800', marqueeBorder: 'border-purple-400', text: 'text-purple-400', textLight: 'text-purple-300', badge: 'bg-purple-400/20 text-purple-400 border-purple-400' },
                { marquee: 'from-orange-600 to-orange-800', marqueeBorder: 'border-orange-400', text: 'text-orange-400', textLight: 'text-orange-300', badge: 'bg-orange-400/20 text-orange-400 border-orange-400' },
              ]
              const theme = themes[index]
              
              return (
                <div key={index} className={`arcade-cabinet group reveal-on-scroll scroll-reveal-delay-${Math.min(index + 1, 4)}`}>
                  {/* Marquee */}
                  <div className={`marquee bg-gradient-to-b ${theme.marquee} p-4 border-4 ${theme.marqueeBorder} relative overflow-hidden`}>
                    <div className="absolute top-2 left-2 w-2 h-2 bg-yellow-400 rounded-full blink-slow"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full blink-slow" style={{ animationDelay: '1s' }}></div>
                    <h3 className="text-xl font-bold text-white font-mono tracking-wide text-center drop-shadow-[0_0_10px_#ffffff]">
                      {project.title}
                    </h3>
                  </div>
                  
                  {/* Screen Bezel */}
                  <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 border-4 border-gray-700">
                    {/* Screen */}
                    <div className="bg-black border-4 border-gray-600 p-6 relative overflow-hidden" style={{ boxShadow: 'inset 0 0 20px rgba(0,0,0,0.8)' }}>
                      {/* Scanlines */}
                      <div className="absolute inset-0 pointer-events-none opacity-10" style={{
                        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00ff00 2px, #00ff00 4px)'
                      }}></div>
                      
                      {/* Screen Content */}
                      <div className="relative z-10">
                        <div className="mb-4 space-y-2">
                          {project.description.map((bullet, bulletIndex) => (
                            <div key={bulletIndex} className="flex items-start gap-2">
                              <span className={`${theme.text} mt-1 text-xs`}>{">"}</span>
                              <span className={`${theme.textLight} font-mono text-sm leading-relaxed`}>{bullet}</span>
                            </div>
                          ))}
                        </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                              className={`${theme.badge} font-mono text-xs`}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Control Panel */}
                  <div className="bg-gradient-to-b from-gray-700 to-gray-800 p-4 border-4 border-gray-600 border-t-0">
                    <div className="flex gap-3 justify-center items-center">
                      {project.github !== "#" && (
                    <Button
                      size="sm"
                          className="bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold border-2 border-red-800 rounded-full w-20 h-20 shadow-lg btn-press"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.open(project.github, '_blank');
                            }
                          }}
                        >
                          <div className="flex flex-col items-center">
                            <Github className="w-5 h-5 mb-1" />
                            <span className="text-[10px]">CODE</span>
                          </div>
                    </Button>
                      )}
                      {project.live !== "#" && (
                    <Button
                      size="sm"
                          className="bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold border-2 border-blue-800 rounded-full w-20 h-20 shadow-lg btn-press"
                          onClick={() => {
                            if (typeof window !== 'undefined') {
                              window.open(project.live, '_blank');
                            }
                          }}
                        >
                          <div className="flex flex-col items-center">
                            <ExternalLink className="w-5 h-5 mb-1" />
                            <span className="text-[10px]">PLAY</span>
                          </div>
                    </Button>
                      )}
                      <div className="w-3 h-3 bg-green-500 rounded-full blink-slow shadow-[0_0_10px_#00ff00]"></div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative reveal-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-green-400 font-mono text-lg mb-4 tracking-widest">{">>> MULTIPLAYER MODE <<<"}</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-green-400 font-mono tracking-wider">JOIN_PARTY</h2>
          <div className="bg-black/80 border-2 border-green-400 p-8 mb-8 font-mono">
            <div className="text-green-400 text-left max-w-2xl mx-auto">
              <div className="mb-2">{">"} Ready to start a new quest together?</div>
              <div className="mb-2">{">"} Looking for a skilled developer to join your team?</div>
              <div className="mb-2">{">"} Let's create something legendary!</div>
              <div className="text-yellow-400 animate-pulse">{">"} Press CONNECT to send message_</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="mailto:himnish03@gmail.com"
              className="inline-flex items-center justify-center gap-2 h-11 rounded-md px-8 bg-green-400 hover:bg-green-300 text-black font-mono font-bold tracking-wide border-2 border-green-400 shadow-[0_0_20px_#00ff00] uppercase transition-colors"
            >
              <Mail className="w-5 h-5" />
              [CONNECT]
            </a>
            <div className="flex gap-4">
              <Button
                size="icon"
                className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.open('https://github.com/himnishpersonal', '_blank');
                  }
                }}
              >
                <Github className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                className="bg-transparent border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.open('https://www.linkedin.com/in/himnish-sambaraju-82b33a228', '_blank');
                  }
                }}
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <div className="mt-6 text-green-400 font-mono text-sm">
            <div>{">"} Email: himnish03@gmail.com</div>
            <div>{">"} Phone: (443)-653-3510</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t-2 border-green-400 relative">
        <div className="max-w-6xl mx-auto text-center">
          <div className="text-green-400 font-mono">
            <div className="mb-2">{"© 2024 HIMNISH.EXE - ALL RIGHTS RESERVED"}</div>
            <div className="text-yellow-400 text-sm">{"GAME OVER - THANKS FOR PLAYING!"}</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

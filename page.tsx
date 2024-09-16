'use client'

import { Button } from "@/components/ui/button"
import { Mail, Check, DollarSign, Layout, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef } from "react"

export default function NewFreelancerUpworkPortfolio() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles: { x: number; y: number; vx: number; vy: number }[] = []
    const particleCount = 50
    const maxDistance = 100

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      })
    }

    function animate() {
      requestAnimationFrame(animate)
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx
        if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255, 59, 48, 0.5)'
        ctx.fill()

        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = `rgba(255, 59, 48, ${0.2 * (1 - distance / maxDistance)})`
            ctx.stroke()
          }
        })
      })
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className="relative h-screen bg-gray-900 text-gray-100 flex flex-col justify-center items-center p-4 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 0 }}
      />
      <main className="relative z-10 w-full max-w-4xl flex flex-col items-center space-y-6">
        {/* Header */}
        <header className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter">Your Name</h1>
          <p className="text-xl text-gray-400">Aspiring Upwork Web Developer & Designer</p>
        </header>

        {/* Introduction */}
        <section className="text-center max-w-2xl">
          <h2 className="text-2xl font-semibold text-red-500 mb-2">Fresh Talent, Boundless Enthusiasm</h2>
          <p className="text-sm leading-relaxed">
            As a new freelancer on Upwork, I'm excited to bring fresh perspectives and innovative ideas to your web projects. 
            I'm committed to delivering high-quality solutions and building long-lasting client relationships. Let's create 
            something amazing together and grow our portfolios side by side!
          </p>
        </section>

        {/* Rate Highlights */}
        <section className="flex justify-center space-x-8 w-full">
          <div className="bg-gray-800 p-4 rounded-md shadow-lg border-l-4 border-red-500">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-red-500" />
              <p className="text-lg font-bold">$10/hr</p>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-md shadow-lg border-l-4 border-red-500">
            <div className="flex items-center space-x-2">
              <Layout className="h-5 w-5 text-red-500" />
              <p className="text-lg font-bold">$20/page</p>
            </div>
          </div>
        </section>

        {/* Key Points */}
        <section className="text-center max-w-2xl">
          <h3 className="text-xl font-semibold text-red-500 mb-3">Why Choose a Rising Star?</h3>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {[
              "Eager to exceed expectations",
              "Fresh, innovative ideas",
              "Flexible and adaptive",
              "Competitive rates",
              "Dedicated to your success",
              "Building long-term relationships",
            ].map((point, index) => (
              <li key={index} className="flex items-start">
                <Star className="mr-2 h-4 w-4 text-red-500 flex-shrink-0 mt-1" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Call to Action */}
        <section>
          <Button asChild size="lg" className="bg-red-600 hover:bg-red-700 text-white">
            <Link href="https://www.upwork.com/freelancers/yourusername" target="_blank" rel="noopener noreferrer">
              <Mail className="mr-2 h-5 w-5" />
              Let's Collaborate on Upwork
            </Link>
          </Button>
        </section>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-2 text-center text-xs text-gray-500 w-full">
        <p>© {new Date().getFullYear()} Your Name. All rights reserved.</p>
      </footer>
    </div>
  )
}
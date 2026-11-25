import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Code2, Cpu } from 'lucide-react'

export const Interactive3DTech: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    // Scene
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 6

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Main 3D Group
    const mainGroup = new THREE.Group()
    scene.add(mainGroup)

    // 1. Inner Core: Metallic faceted Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 0)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x22262b,
      roughness: 0.3,
      metalness: 0.85,
      flatShading: true
    })
    const coreMesh = new THREE.Mesh(coreGeo, coreMat)
    mainGroup.add(coreMesh)

    // 2. Inner Glowing Wireframe Accent
    const wireGeo = new THREE.IcosahedronGeometry(1.32, 0)
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xa1a480,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    })
    const wireMesh = new THREE.Mesh(wireGeo, wireMat)
    mainGroup.add(wireMesh)

    // 3. Outer Polyhedral Lattice Cage (Counter-rotating)
    const cageGeo = new THREE.DodecahedronGeometry(2.0, 0)
    const cageMat = new THREE.MeshStandardMaterial({
      color: 0xa1a480,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      roughness: 0.4,
      metalness: 0.6
    })
    const cageMesh = new THREE.Mesh(cageGeo, cageMat)
    mainGroup.add(cageMesh)

    // 4. Orbiting Gyroscope Rings
    const ringGeo = new THREE.TorusGeometry(2.35, 0.025, 16, 100)
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x8f926e,
      roughness: 0.2,
      metalness: 0.9
    })
    
    const ring1 = new THREE.Mesh(ringGeo, ringMat)
    ring1.rotation.x = Math.PI / 3
    mainGroup.add(ring1)

    const ring2 = new THREE.Mesh(ringGeo, ringMat)
    ring2.rotation.y = Math.PI / 4
    ring2.rotation.x = -Math.PI / 6
    mainGroup.add(ring2)

    // 5. Surrounding Particle Field
    const particleCount = 75
    const particleGeo = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8
      positions[i + 1] = (Math.random() - 0.5) * 8
      positions[i + 2] = (Math.random() - 0.5) * 6
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xa1a480,
      size: 0.045,
      transparent: true,
      opacity: 0.65
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    scene.add(particles)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.0)
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const accentLight = new THREE.PointLight(0xa1a480, 4.0, 15)
    accentLight.position.set(-4, -2, 3)
    scene.add(accentLight)

    const rimLight = new THREE.DirectionalLight(0xd4d7dc, 1.2)
    rimLight.position.set(0, -5, -4)
    scene.add(rimLight)

    // Mouse Parallax Interaction
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      
      targetRotationY = x * 1.5
      targetRotationX = y * 1.2
    }

    window.addEventListener('mousemove', handleMouseMove)

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const width = container.clientWidth
      const height = container.clientHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationFrameId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate)

      const elapsedTime = clock.getElapsedTime()

      // Base idle rotations
      coreMesh.rotation.y = elapsedTime * 0.25
      coreMesh.rotation.x = elapsedTime * 0.15

      wireMesh.rotation.y = elapsedTime * 0.25
      wireMesh.rotation.x = elapsedTime * 0.15

      cageMesh.rotation.y = -elapsedTime * 0.18
      cageMesh.rotation.z = elapsedTime * 0.12

      ring1.rotation.z = elapsedTime * 0.35
      ring2.rotation.x = -elapsedTime * 0.3

      particles.rotation.y = elapsedTime * 0.05

      // Damped interactive mouse rotation
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.06
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.06

      // Gentle floating bob
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
      renderer.dispose()
      coreGeo.dispose()
      coreMat.dispose()
      wireGeo.dispose()
      wireMat.dispose()
      cageGeo.dispose()
      cageMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[540px] flex items-center justify-center select-none"
    >
      {/* Three.js Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Modern Tech Badges (Clyde Accent Theme) */}
      <div className="absolute top-10 -left-2 sm:left-4 bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2.5 animate-float z-30">
        <div className="w-8 h-8 rounded-lg bg-[#a1a480]/20 flex items-center justify-center text-[#787c53]">
          <Code2 className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] tracking-wider uppercase text-gray-500 font-semibold">Specialization</p>
          <p className="text-[12px] font-bold text-gray-900 leading-tight">Full Stack Developer</p>
        </div>
      </div>

      <div className="absolute bottom-12 -right-1 sm:right-6 bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-lg px-3.5 py-2 rounded-xl flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-[#22262b] flex items-center justify-center text-[#a1a480]">
          <Cpu className="w-4 h-4" />
        </div>
        <div className="text-left">
          <p className="text-[10px] tracking-wider uppercase text-gray-500 font-semibold">Architecture</p>
          <p className="text-[12px] font-bold text-gray-900 leading-tight">React &bull; Node &bull; TypeScript</p>
        </div>
      </div>

      <div className="absolute top-1/2 -right-4 sm:-right-2 bg-white/85 backdrop-blur-md border border-gray-200/70 shadow-md px-3 py-1.5 rounded-lg hidden sm:flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[11px] font-semibold text-gray-700">60 FPS WebGL</span>
      </div>
    </div>
  )
}

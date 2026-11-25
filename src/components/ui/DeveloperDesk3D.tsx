import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Sparkles, Terminal, Laptop } from 'lucide-react'

export const DeveloperDesk3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    // Scene
    const scene = new THREE.Scene()

    // Camera (Isometric 3/4 perspective)
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(4.8, 3.8, 5.2)
    camera.lookAt(0, 0.35, 0)

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.35

    // Main Desk Pivot Group
    const deskGroup = new THREE.Group()
    scene.add(deskGroup)

    // -------------------------------------------------------------
    // 1. DESK TABLE
    // -------------------------------------------------------------
    // Table Top (Rich Matte Charcoal / Walnut)
    const topGeo = new THREE.BoxGeometry(3.6, 0.1, 2.0)
    const topMat = new THREE.MeshStandardMaterial({
      color: 0x22262e,
      roughness: 0.45,
      metalness: 0.15
    })
    const tableTop = new THREE.Mesh(topGeo, topMat)
    tableTop.position.y = 0
    tableTop.receiveShadow = true
    tableTop.castShadow = true
    deskGroup.add(tableTop)

    // Table Legs (Brushed Steel Frame)
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x14181f,
      roughness: 0.3,
      metalness: 0.8
    })

    const legPositions = [
      [-1.65, -0.75, 0.85],
      [1.65, -0.75, 0.85],
      [-1.65, -0.75, -0.85],
      [1.65, -0.75, -0.85]
    ]

    legPositions.forEach(([x, y, z]) => {
      const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.4, 16)
      const leg = new THREE.Mesh(legGeo, legMat)
      leg.position.set(x, y, z)
      leg.castShadow = true
      deskGroup.add(leg)
    })

    // Desk Mat / Mousepad
    const matGeo = new THREE.BoxGeometry(2.3, 0.015, 1.2)
    const matMat = new THREE.MeshStandardMaterial({
      color: 0x1b2029,
      roughness: 0.85
    })
    const deskMat = new THREE.Mesh(matGeo, matMat)
    deskMat.position.set(0, 0.055, 0.1)
    deskMat.receiveShadow = true
    deskGroup.add(deskMat)

    // -------------------------------------------------------------
    // 2. ULTRA-WIDE MONITOR WITH LIVE CODE CANVAS TEXTURE
    // -------------------------------------------------------------
    // Monitor Screen Canvas Texture
    const codeCanvas = document.createElement('canvas')
    codeCanvas.width = 1024
    codeCanvas.height = 512
    const ctx = codeCanvas.getContext('2d')
    if (ctx) {
      // Dark IDE Background
      ctx.fillStyle = '#0d1117'
      ctx.fillRect(0, 0, 1024, 512)

      // Header Bar
      ctx.fillStyle = '#161b22'
      ctx.fillRect(0, 0, 1024, 45)

      // macOS Dots
      ctx.fillStyle = '#ff5f56'
      ctx.beginPath()
      ctx.arc(30, 22, 10, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#ffbd2e'
      ctx.beginPath()
      ctx.arc(60, 22, 10, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = '#27c93f'
      ctx.beginPath()
      ctx.arc(90, 22, 10, 0, Math.PI * 2)
      ctx.fill()

      // Header File Title
      ctx.fillStyle = '#8b949e'
      ctx.font = 'bold 20px monospace'
      ctx.fillText('infant.tsx — Software Engineer', 140, 28)

      // Code Lines
      ctx.font = '22px monospace'
      ctx.fillStyle = '#58a6ff'
      ctx.fillText('import { Developer } from "@infant/core";', 50, 95)

      ctx.fillStyle = '#8b949e'
      ctx.fillText('// ⚡ Creative Full Stack Engineer', 50, 135)

      ctx.fillStyle = '#ff7b72'
      ctx.fillText('export const profile: Developer = {', 50, 180)

      ctx.fillStyle = '#79c0ff'
      ctx.fillText('  name: "Infant Rojar",', 70, 225)

      ctx.fillStyle = '#a1a480'
      ctx.fillText('  role: "Creative Software Developer",', 70, 270)

      ctx.fillStyle = '#7ee787'
      ctx.fillText('  stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],', 70, 315)

      ctx.fillStyle = '#d2a8ff'
      ctx.fillText('  status: "Available for High-Impact Projects",', 70, 360)

      ctx.fillStyle = '#ff7b72'
      ctx.fillText('};', 50, 405)

      // Status Bar at bottom
      ctx.fillStyle = '#161b22'
      ctx.fillRect(0, 470, 1024, 42)
      ctx.fillStyle = '#7ee787'
      ctx.fillText('● Ready — 0 errors • UTF-8 • 60 FPS', 50, 498)
    }

    const screenTexture = new THREE.CanvasTexture(codeCanvas)
    screenTexture.anisotropy = 8

    // Curved Ultra-Wide Screen (Subtle curved box or angled)
    const screenGeo = new THREE.BoxGeometry(2.0, 0.95, 0.04)
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture,
      roughness: 0.3,
      metalness: 0.2,
      emissive: 0xffffff,
      emissiveMap: screenTexture,
      emissiveIntensity: 0.4
    })
    const monitor = new THREE.Mesh(screenGeo, screenMat)
    monitor.position.set(0, 0.85, -0.45)
    monitor.castShadow = true
    deskGroup.add(monitor)

    // Monitor Bezel & Stand
    const bezelGeo = new THREE.BoxGeometry(2.04, 0.99, 0.05)
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x0f1318,
      roughness: 0.4,
      metalness: 0.8
    })
    const bezel = new THREE.Mesh(bezelGeo, bezelMat)
    bezel.position.set(0, 0.85, -0.47)
    deskGroup.add(bezel)

    // Monitor Arm / Stand
    const standPillarGeo = new THREE.CylinderGeometry(0.045, 0.045, 0.6, 16)
    const standMat = new THREE.MeshStandardMaterial({
      color: 0x2d3440,
      roughness: 0.2,
      metalness: 0.85
    })
    const standPillar = new THREE.Mesh(standPillarGeo, standMat)
    standPillar.position.set(0, 0.35, -0.55)
    standPillar.castShadow = true
    deskGroup.add(standPillar)

    const standBaseGeo = new THREE.BoxGeometry(0.45, 0.02, 0.35)
    const standBase = new THREE.Mesh(standBaseGeo, standMat)
    standBase.position.set(0, 0.06, -0.55)
    standBase.receiveShadow = true
    deskGroup.add(standBase)

    // Monitor Lightbar (Casts warm light down on the desk)
    const barGeo = new THREE.CylinderGeometry(0.02, 0.02, 1.2, 16)
    const barMat = new THREE.MeshStandardMaterial({
      color: 0x1c212a,
      roughness: 0.3,
      metalness: 0.9
    })
    const lightBar = new THREE.Mesh(barGeo, barMat)
    lightBar.rotation.z = Math.PI / 2
    lightBar.position.set(0, 1.38, -0.42)
    deskGroup.add(lightBar)

    // Lightbar Spotlight Downward
    const deskSpotlight = new THREE.SpotLight(0xfff6e6, 3.5, 4, Math.PI / 3, 0.4)
    deskSpotlight.position.set(0, 1.35, -0.38)
    deskSpotlight.target.position.set(0, 0.05, 0.1)
    deskGroup.add(deskSpotlight)
    deskGroup.add(deskSpotlight.target)

    // -------------------------------------------------------------
    // 3. MECHANICAL KEYBOARD & MOUSE
    // -------------------------------------------------------------
    // Keyboard Body
    const kbGeo = new THREE.BoxGeometry(0.72, 0.035, 0.28)
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x14181f,
      roughness: 0.5,
      metalness: 0.4
    })
    const keyboard = new THREE.Mesh(kbGeo, kbMat)
    keyboard.position.set(-0.15, 0.075, 0.25)
    keyboard.castShadow = true
    deskGroup.add(keyboard)

    // Keycaps Row Grid (Sage & Charcoal Accent Keys)
    const keyGeo = new THREE.BoxGeometry(0.68, 0.02, 0.24)
    const keyMat = new THREE.MeshStandardMaterial({
      color: 0xa1a480,
      roughness: 0.35,
      metalness: 0.3
    })
    const keys = new THREE.Mesh(keyGeo, keyMat)
    keys.position.set(-0.15, 0.09, 0.25)
    deskGroup.add(keys)

    // Ergonomic Mouse
    const mouseGeo = new THREE.BoxGeometry(0.12, 0.035, 0.2)
    const mouseMat = new THREE.MeshStandardMaterial({
      color: 0x222731,
      roughness: 0.3,
      metalness: 0.6
    })
    const mouse = new THREE.Mesh(mouseGeo, mouseMat)
    mouse.position.set(0.48, 0.075, 0.25)
    mouse.rotation.y = -0.08
    mouse.castShadow = true
    deskGroup.add(mouse)

    // -------------------------------------------------------------
    // 4. SECONDARY LAPTOP (PROPPED OPEN AT AN ANGLE)
    // -------------------------------------------------------------
    const laptopGroup = new THREE.Group()
    laptopGroup.position.set(-1.18, 0.06, -0.08)
    laptopGroup.rotation.y = Math.PI / 6
    deskGroup.add(laptopGroup)

    // Laptop Base
    const ltBaseGeo = new THREE.BoxGeometry(0.65, 0.015, 0.48)
    const ltMat = new THREE.MeshStandardMaterial({
      color: 0x2d3440,
      roughness: 0.25,
      metalness: 0.85
    })
    const ltBase = new THREE.Mesh(ltBaseGeo, ltMat)
    ltBase.castShadow = true
    laptopGroup.add(ltBase)

    // Laptop Screen
    const ltScreenGeo = new THREE.BoxGeometry(0.65, 0.44, 0.015)
    const ltScreenMat = new THREE.MeshStandardMaterial({
      color: 0x0d1117,
      emissive: 0x1f293d,
      emissiveIntensity: 0.6,
      roughness: 0.2
    })
    const ltScreen = new THREE.Mesh(ltScreenGeo, ltScreenMat)
    ltScreen.position.set(0, 0.21, -0.23)
    ltScreen.rotation.x = -Math.PI / 14
    laptopGroup.add(ltScreen)

    // -------------------------------------------------------------
    // 5. CERAMIC COFFEE MUG
    // -------------------------------------------------------------
    const mugGeo = new THREE.CylinderGeometry(0.085, 0.075, 0.18, 20)
    const mugMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      roughness: 0.2,
      metalness: 0.1
    })
    const mug = new THREE.Mesh(mugGeo, mugMat)
    mug.position.set(0.85, 0.14, 0.3)
    mug.castShadow = true
    deskGroup.add(mug)

    // Mug Accent Stripe (Clyde Sage)
    const stripeGeo = new THREE.CylinderGeometry(0.087, 0.087, 0.035, 20)
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0xa1a480,
      roughness: 0.3
    })
    const stripe = new THREE.Mesh(stripeGeo, stripeMat)
    stripe.position.set(0.85, 0.17, 0.3)
    deskGroup.add(stripe)

    // -------------------------------------------------------------
    // 6. MINI SUCCULENT PLANT IN GEOMETRIC POT
    // -------------------------------------------------------------
    const potGeo = new THREE.CylinderGeometry(0.12, 0.08, 0.16, 8)
    const potMat = new THREE.MeshStandardMaterial({
      color: 0xe2e5e9,
      roughness: 0.5
    })
    const pot = new THREE.Mesh(potGeo, potMat)
    pot.position.set(1.28, 0.13, -0.35)
    pot.castShadow = true
    deskGroup.add(pot)

    // Green Foliage
    const plantGeo = new THREE.DodecahedronGeometry(0.13, 0)
    const plantMat = new THREE.MeshStandardMaterial({
      color: 0x5a7a50,
      roughness: 0.6
    })
    const plant = new THREE.Mesh(plantGeo, plantMat)
    plant.position.set(1.28, 0.27, -0.35)
    deskGroup.add(plant)

    // -------------------------------------------------------------
    // 7. LIGHTING SETUP
    // -------------------------------------------------------------
    // Soft Ambient Light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
    scene.add(ambientLight)

    // Key Directional Sun / Studio Light
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.8)
    dirLight.position.set(5, 7, 4)
    dirLight.castShadow = true
    dirLight.shadow.mapSize.width = 1024
    dirLight.shadow.mapSize.height = 1024
    dirLight.shadow.camera.near = 0.5
    dirLight.shadow.camera.far = 20
    dirLight.shadow.bias = -0.0005
    scene.add(dirLight)

    // Soft Rim Light from back
    const backLight = new THREE.DirectionalLight(0xa1a480, 1.1)
    backLight.position.set(-4, 3, -4)
    scene.add(backLight)

    // Screen Glow onto keyboard
    const screenGlow = new THREE.PointLight(0x79c0ff, 1.8, 2.5)
    screenGlow.position.set(0, 0.6, -0.15)
    deskGroup.add(screenGlow)

    // -------------------------------------------------------------
    // 8. INTERACTIVE MOUSE PARALLAX & DRAG ROTATION
    // -------------------------------------------------------------
    let targetRotY = -0.22
    let targetRotX = 0.08
    let isDragging = false
    let prevMouseX = 0
    let prevMouseY = 0

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevMouseX
        const deltaY = e.clientY - prevMouseY
        targetRotY += deltaX * 0.008
        targetRotX += deltaY * 0.005
        prevMouseX = e.clientX
        prevMouseY = e.clientY
      } else {
        const rect = container.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        targetRotY = -0.22 + x * 0.6
        targetRotX = 0.08 + y * 0.35
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true
      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const handleMouseUp = () => {
      isDragging = false
    }

    container.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('mousemove', handleMouseMove)

    // Resize Handler
    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationId: number
    let clock = new THREE.Clock()

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const elapsed = clock.getElapsedTime()

      // Smooth damping toward target rotation
      deskGroup.rotation.y += (targetRotY - deskGroup.rotation.y) * 0.07
      deskGroup.rotation.x += (targetRotX - deskGroup.rotation.x) * 0.07

      // Subtle breathing float
      deskGroup.position.y = Math.sin(elapsed * 1.4) * 0.04

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      container.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      screenTexture.dispose()
      topGeo.dispose()
      topMat.dispose()
      legMat.dispose()
      screenGeo.dispose()
      screenMat.dispose()
      bezelGeo.dispose()
      bezelMat.dispose()
      kbGeo.dispose()
      kbMat.dispose()
      keyGeo.dispose()
      keyMat.dispose()
      mouseGeo.dispose()
      mouseMat.dispose()
      mugGeo.dispose()
      mugMat.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[440px] sm:h-[490px] lg:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
    >
      {/* Three.js 3D Desk Canvas */}
      <canvas ref={canvasRef} className="w-full h-full" />

      {/* Floating Interactive Badge: Drag Prompt */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-200/80 shadow-md px-3.5 py-1.5 rounded-full flex items-center gap-2 pointer-events-none z-30">
        <Sparkles className="w-3.5 h-3.5 text-[#787c53]" />
        <span className="text-[11px] font-semibold text-gray-700">3D Interactive • Drag or hover to inspect</span>
      </div>

      {/* Floating Info Tag: Workspace Details */}
      <div className="absolute top-8 left-2 sm:left-4 bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-lg px-3 py-1.5 rounded-xl flex items-center gap-2 z-30 pointer-events-none hidden sm:flex">
        <Terminal className="w-4 h-4 text-[#a1a480]" />
        <div className="text-left">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Dev Setup</p>
          <p className="text-[11px] font-bold text-gray-900 leading-tight">Ultra-wide &bull; TypeScript &bull; React</p>
        </div>
      </div>

      <div className="absolute top-10 right-2 sm:right-4 bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-lg px-3 py-1.5 rounded-xl flex items-center gap-2 z-30 pointer-events-none hidden sm:flex">
        <Laptop className="w-4 h-4 text-emerald-600" />
        <div className="text-left">
          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Station</p>
          <p className="text-[11px] font-bold text-emerald-700 leading-tight">Active &bull; Coding</p>
        </div>
      </div>
    </div>
  )
}

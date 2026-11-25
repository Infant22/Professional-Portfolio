import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

export const Character3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    // Scene
    const scene = new THREE.Scene()

    // Camera: Elevated 3/4 perspective, centered on the robot & laptop
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0.45, 5.4)
    camera.lookAt(0, -0.05, 0)

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
    renderer.toneMappingExposure = 1.3

    // Main Robot Root — Centered with ample top and bottom margins
    const robotGroup = new THREE.Group()
    robotGroup.position.set(0, -0.15, 0)
    scene.add(robotGroup)

    // ============================================================
    // MATERIALS
    // ============================================================
    const whiteChassisMat = new THREE.MeshStandardMaterial({
      color: 0xfbfcfe,
      roughness: 0.22,
      metalness: 0.1
    })

    // Visor: Smooth satin-matte dark obsidian (NO harsh specular white glare dot!)
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x090c12,
      roughness: 0.45,
      metalness: 0.2
    })

    const accentMat = new THREE.MeshStandardMaterial({
      color: 0xa1a480,
      roughness: 0.3,
      metalness: 0.35
    })

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xd8dde6,
      roughness: 0.2,
      metalness: 0.85
    })

    const darkMetalMat = new THREE.MeshStandardMaterial({
      color: 0x161a22,
      roughness: 0.5,
      metalness: 0.4
    })

    const ledCyanMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8
    })

    const ledGlowWhite = new THREE.MeshBasicMaterial({
      color: 0xffffff
    })

    // ============================================================
    // 1. HEAD & PERFECTED FACE (NO UNWANTED DOTS, PROPER PROPORTIONS)
    // ============================================================
    const headGroup = new THREE.Group()
    headGroup.position.set(0, 0.55, 0)
    robotGroup.add(headGroup)

    // White Helmet Shell
    const helmetGeo = new THREE.SphereGeometry(0.56, 36, 36)
    helmetGeo.scale(1.06, 1, 0.96)
    const helmet = new THREE.Mesh(helmetGeo, whiteChassisMat)
    helmet.castShadow = true
    headGroup.add(helmet)

    // BALANCED BLACK VISOR (Not too small, not too big — perfectly proportioned)
    const visorGeo = new THREE.SphereGeometry(0.53, 36, 36)
    visorGeo.scale(0.92, 0.74, 0.88)
    const visor = new THREE.Mesh(visorGeo, visorMat)
    visor.position.set(0, -0.01, 0.13)
    headGroup.add(visor)

    // Face Elements Group (Eyes, Blush, Mouth)
    const faceDisplayGroup = new THREE.Group()
    faceDisplayGroup.position.set(0, 0, 0.58)
    headGroup.add(faceDisplayGroup)

    // Left Eye
    const leftEyeGroup = new THREE.Group()
    leftEyeGroup.position.set(-0.18, 0.05, 0)
    faceDisplayGroup.add(leftEyeGroup)

    const eyeGeo = new THREE.SphereGeometry(0.075, 22, 22)
    eyeGeo.scale(0.85, 1.25, 0.4)
    const leftEyeMesh = new THREE.Mesh(eyeGeo, ledCyanMat)
    leftEyeGroup.add(leftEyeMesh)

    // Pupil Sparkle Highlight
    const leftHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), ledGlowWhite)
    leftHighlight.position.set(0.015, 0.025, 0.024)
    leftEyeGroup.add(leftHighlight)

    // Right Eye
    const rightEyeGroup = new THREE.Group()
    rightEyeGroup.position.set(0.18, 0.05, 0)
    faceDisplayGroup.add(rightEyeGroup)

    const rightEyeMesh = new THREE.Mesh(eyeGeo, ledCyanMat)
    rightEyeGroup.add(rightEyeMesh)

    const rightHighlight = new THREE.Mesh(new THREE.SphereGeometry(0.022, 12, 12), ledGlowWhite)
    rightHighlight.position.set(0.015, 0.025, 0.024)
    rightEyeGroup.add(rightHighlight)

    // Cute Smile / Mouth (Centered and clearly visible)
    const mouthGeo = new THREE.TorusGeometry(0.062, 0.012, 12, 24, Math.PI * 0.75)
    const mouthMesh = new THREE.Mesh(mouthGeo, ledCyanMat)
    mouthMesh.rotation.z = Math.PI * 1.125
    mouthMesh.position.set(0, -0.11, 0)
    faceDisplayGroup.add(mouthMesh)

    // Cute Pink Blush (Warm rosy pink, position kept exactly at perfect chin/cheek level)
    const cheekMat = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.65
    })
    const cheekGeo = new THREE.SphereGeometry(0.028, 16, 16)

    const leftCheek = new THREE.Mesh(cheekGeo, cheekMat)
    leftCheek.position.set(-0.25, -0.11, 0.01)
    faceDisplayGroup.add(leftCheek)

    const rightCheek = new THREE.Mesh(cheekGeo, cheekMat)
    rightCheek.position.set(0.25, -0.11, 0.01)
    faceDisplayGroup.add(rightCheek)

    // Headphones & Antenna
    const bandGeo = new THREE.TorusGeometry(0.62, 0.032, 16, 36, Math.PI * 0.9)
    const band = new THREE.Mesh(bandGeo, darkMetalMat)
    band.rotation.z = Math.PI * 0.95
    band.position.set(0, 0.1, 0)
    headGroup.add(band)

    const podGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 24)
    const ringGeo = new THREE.TorusGeometry(0.14, 0.015, 16, 24)

    const leftPod = new THREE.Mesh(podGeo, accentMat)
    leftPod.rotation.z = Math.PI / 2
    leftPod.position.set(-0.65, 0.04, 0)
    headGroup.add(leftPod)

    const leftRing = new THREE.Mesh(ringGeo, ledCyanMat)
    leftRing.rotation.y = Math.PI / 2
    leftRing.position.set(-0.695, 0.04, 0)
    headGroup.add(leftRing)

    const rightPod = new THREE.Mesh(podGeo, accentMat)
    rightPod.rotation.z = Math.PI / 2
    rightPod.position.set(0.65, 0.04, 0)
    headGroup.add(rightPod)

    const rightRing = new THREE.Mesh(ringGeo, ledCyanMat)
    rightRing.rotation.y = Math.PI / 2
    rightRing.position.set(0.695, 0.04, 0)
    headGroup.add(rightRing)

    const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.015, 0.22, 12), chromeMat)
    antennaStem.position.set(0, 0.65, 0)
    headGroup.add(antennaStem)

    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), ledCyanMat)
    antennaTip.position.set(0, 0.77, 0)
    headGroup.add(antennaTip)

    // ============================================================
    // 2. ROBOT BODY & CUTE LEGS
    // ============================================================
    const bodyGroup = new THREE.Group()
    robotGroup.add(bodyGroup)

    // Smooth White Ceramic Torso (Clean, no weird circles)
    const bodyGeo = new THREE.SphereGeometry(0.48, 32, 32)
    bodyGeo.scale(1, 1.05, 0.92)
    const body = new THREE.Mesh(bodyGeo, whiteChassisMat)
    body.position.set(0, -0.12, 0)
    body.castShadow = true
    bodyGroup.add(body)

    // Cute Small Robot Legs & Foot Pads
    const legGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.26, 16)
    const footGeo = new THREE.SphereGeometry(0.11, 16, 16)
    footGeo.scale(1, 0.65, 1.3)

    // Left Leg
    const leftLeg = new THREE.Mesh(legGeo, whiteChassisMat)
    leftLeg.position.set(-0.22, -0.62, 0.06)
    leftLeg.rotation.x = Math.PI / 12
    leftLeg.rotation.z = Math.PI / 16
    bodyGroup.add(leftLeg)

    const leftFoot = new THREE.Mesh(footGeo, darkMetalMat)
    leftFoot.position.set(-0.24, -0.74, 0.12)
    bodyGroup.add(leftFoot)

    // Right Leg
    const rightLeg = new THREE.Mesh(legGeo, whiteChassisMat)
    rightLeg.position.set(0.22, -0.62, 0.06)
    rightLeg.rotation.x = Math.PI / 12
    rightLeg.rotation.z = -Math.PI / 16
    bodyGroup.add(rightLeg)

    const rightFoot = new THREE.Mesh(footGeo, darkMetalMat)
    rightFoot.position.set(0.24, -0.74, 0.12)
    bodyGroup.add(rightFoot)

    // ============================================================
    // 3. AUTHENTIC APPLE MACBOOK (LOWERED DOWN — FULL FACE VISIBILITY!)
    // ============================================================
    // Positioned down at waist/lap level so his ENTIRE face and smile are 100% visible!
    const laptopGroup = new THREE.Group()
    laptopGroup.position.set(0, -0.38, 0.46)
    robotGroup.add(laptopGroup)

    // Create 1024x1024 High-Res Canvas Texture for MacBook Lid with Official Apple Logo
    const appleCanvas = document.createElement('canvas')
    appleCanvas.width = 1024
    appleCanvas.height = 700
    const actx = appleCanvas.getContext('2d')
    if (actx) {
      // Aluminum MacBook Silver Base
      actx.fillStyle = '#c8ced8'
      actx.fillRect(0, 0, 1024, 700)

      // Subtle metallic bevel shadow
      actx.strokeStyle = '#b0b6c2'
      actx.lineWidth = 14
      actx.strokeRect(7, 7, 1010, 686)

      // Official Apple Logo (Drawn with SVG vector path in crisp white/cyan glow)
      actx.save()
      actx.translate(512, 350)
      actx.scale(7.5, 7.5)
      actx.translate(-12, -12)

      const applePath = new Path2D(
        'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.67-.82 1.13-1.96.99-3.11-1.01.04-2.23.68-2.95 1.51-.64.74-1.2 1.91-1.05 3.03 1.12.09 2.27-.58 3.01-1.43'
      )

      actx.fillStyle = '#ffffff'
      actx.shadowColor = 'rgba(56, 189, 248, 0.8)'
      actx.shadowBlur = 20
      actx.fill(applePath)
      actx.restore()
    }

    const macbookTexture = new THREE.CanvasTexture(appleCanvas)
    macbookTexture.anisotropy = 8

    // 1. Laptop Base / Keyboard (Resting on lap where his hands reach)
    const lpBaseGeo = new THREE.BoxGeometry(0.88, 0.026, 0.54)
    const lpBaseMat = new THREE.MeshStandardMaterial({
      color: 0xc8ced8,
      roughness: 0.25,
      metalness: 0.85
    })
    const lpBase = new THREE.Mesh(lpBaseGeo, lpBaseMat)
    lpBase.position.set(0, 0, -0.12)
    lpBase.castShadow = true
    laptopGroup.add(lpBase)

    // Keyboard Keybed
    const kbGeo = new THREE.BoxGeometry(0.78, 0.012, 0.32)
    const kb = new THREE.Mesh(kbGeo, darkMetalMat)
    kb.position.set(0, 0.015, -0.13)
    laptopGroup.add(kb)

    // Trackpad
    const trackpadGeo = new THREE.BoxGeometry(0.28, 0.008, 0.14)
    const trackpad = new THREE.Mesh(trackpadGeo, chromeMat)
    trackpad.position.set(0, 0.015, 0.08)
    laptopGroup.add(trackpad)

    // 2. Laptop Lid with Authentic Apple Logo (STANDING UPRIGHT, BACK FACING CAMERA)
    // Scaled & positioned so it NEVER covers his face or mouth!
    const screenLidGeo = new THREE.BoxGeometry(0.88, 0.54, 0.024)
    const screenLidMat = new THREE.MeshStandardMaterial({
      map: macbookTexture,
      roughness: 0.25,
      metalness: 0.75
    })
    const screenLid = new THREE.Mesh(screenLidGeo, screenLidMat)
    screenLid.position.set(0, 0.24, 0.12)
    screenLid.rotation.x = -Math.PI / 14
    screenLid.castShadow = true
    laptopGroup.add(screenLid)

    // Inner Glowing Screen (Facing the robot)
    const innerScreenGeo = new THREE.PlaneGeometry(0.82, 0.48)
    const innerScreenMat = new THREE.MeshStandardMaterial({
      color: 0x080e18,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.8,
      roughness: 0.2
    })
    const innerScreen = new THREE.Mesh(innerScreenGeo, innerScreenMat)
    innerScreen.position.set(0, 0.24, 0.106)
    innerScreen.rotation.y = Math.PI
    innerScreen.rotation.x = Math.PI / 14
    laptopGroup.add(innerScreen)

    // Soft Blue Screen Glow illuminating his lap and chest
    const screenGlowLight = new THREE.PointLight(0x38bdf8, 1.8, 2.0)
    screenGlowLight.position.set(0, 0.02, 0.25)
    robotGroup.add(screenGlowLight)

    // ============================================================
    // 4. ROBOT ARMS & HANDS (TYPING PROMINENTLY ON KEYBOARD)
    // ============================================================
    const armGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.42, 16)
    const handGeo = new THREE.SphereGeometry(0.075, 16, 16)

    // Left Arm reaching onto keyboard
    const leftArm = new THREE.Mesh(armGeo, whiteChassisMat)
    leftArm.position.set(-0.44, -0.18, 0.16)
    leftArm.rotation.x = Math.PI / 2.8
    leftArm.rotation.z = -Math.PI / 5
    bodyGroup.add(leftArm)

    const leftHand = new THREE.Mesh(handGeo, chromeMat)
    leftHand.position.set(-0.24, -0.34, 0.36)
    bodyGroup.add(leftHand)

    // Right Arm reaching onto keyboard
    const rightArm = new THREE.Mesh(armGeo, whiteChassisMat)
    rightArm.position.set(0.44, -0.18, 0.16)
    rightArm.rotation.x = Math.PI / 2.8
    rightArm.rotation.z = Math.PI / 5
    bodyGroup.add(rightArm)

    const rightHand = new THREE.Mesh(handGeo, chromeMat)
    rightHand.position.set(0.24, -0.34, 0.36)
    bodyGroup.add(rightHand)

    // ============================================================
    // 5. STUDIO LIGHTING (DIFFUSED, NO RANDOM WHITE BLEMISH DOTS!)
    // ============================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    // Soft Key Light positioned higher and broader so no glare hits the visor
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(3, 7, 5)
    keyLight.castShadow = true
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xdbe0e8, 1.1)
    fillLight.position.set(-4, 2, 3)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xa1a480, 1.8)
    rimLight.position.set(0, 3, -4)
    scene.add(rimLight)

    // ============================================================
    // 6. 360° MOUSE EYE TRACKING & BLINK
    // ============================================================
    let mouseNormX = 0
    let mouseNormY = 0

    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = -(event.clientY / window.innerHeight) * 2 + 1
      mouseNormX = x
      mouseNormY = y
    }

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches && event.touches.length > 0) {
        const touch = event.touches[0]
        const x = (touch.clientX / window.innerWidth) * 2 - 1
        const y = -(touch.clientY / window.innerHeight) * 2 + 1
        mouseNormX = x
        mouseNormY = y
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    const handleResize = () => {
      if (!container) return
      const w = container.clientWidth
      const h = container.clientHeight
      camera.aspect = w / h

      // Desktop uses the exact original approved camera (5.4)
      // Only small mobile phones (window.innerWidth < 650) adapt camera distance
      if (typeof window !== 'undefined' && window.innerWidth < 650) {
        camera.position.set(0, 0.42, 5.5)
        camera.fov = 36
      } else {
        camera.position.set(0, 0.45, 5.4)
        camera.fov = 36
      }

      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    // Animation Loop
    let animationId: number
    let clock = new THREE.Clock()
    let blinkTimer = 0
    let isBlinking = false

    const maxEyeShiftX = 0.05
    const maxEyeShiftY = 0.035

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      // Target Eye Tracking (Left, Right, Up, Down)
      const targetEyeX = THREE.MathUtils.clamp(mouseNormX * maxEyeShiftX, -maxEyeShiftX, maxEyeShiftX)
      const targetEyeY = THREE.MathUtils.clamp(mouseNormY * maxEyeShiftY, -maxEyeShiftY, maxEyeShiftY)

      leftEyeGroup.position.x += (-0.18 + targetEyeX - leftEyeGroup.position.x) * 0.16
      leftEyeGroup.position.y += (0.05 + targetEyeY - leftEyeGroup.position.y) * 0.16

      rightEyeGroup.position.x += (0.18 + targetEyeX - rightEyeGroup.position.x) * 0.16
      rightEyeGroup.position.y += (0.05 + targetEyeY - rightEyeGroup.position.y) * 0.16

      mouthMesh.position.x += (targetEyeX * 0.35 - mouthMesh.position.x) * 0.12
      mouthMesh.position.y += (-0.11 + targetEyeY * 0.25 - mouthMesh.position.y) * 0.12

      // Head turns smoothly toward mouse
      headGroup.rotation.y += (mouseNormX * 0.2 - headGroup.rotation.y) * 0.08
      headGroup.rotation.x += (-mouseNormY * 0.15 - headGroup.rotation.x) * 0.08

      // Body gentle floating bob
      robotGroup.position.y = -0.15 + Math.sin(elapsed * 1.8) * 0.035

      // Gentle typing hands animation
      leftHand.position.z = 0.36 + Math.sin(elapsed * 7) * 0.015
      rightHand.position.z = 0.36 + Math.cos(elapsed * 7) * 0.015

      // Gentle cute leg wiggle
      leftLeg.rotation.x = Math.PI / 12 + Math.sin(elapsed * 2) * 0.05
      rightLeg.rotation.x = Math.PI / 12 - Math.sin(elapsed * 2) * 0.05

      // Digital Blink
      blinkTimer += delta
      if (blinkTimer > 3.6 && !isBlinking) {
        isBlinking = true
        leftEyeGroup.scale.y = 0.08
        rightEyeGroup.scale.y = 0.08

        setTimeout(() => {
          leftEyeGroup.scale.y = 1
          rightEyeGroup.scale.y = 1
          isBlinking = false
          blinkTimer = 0
        }, 120)
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      macbookTexture.dispose()
      whiteChassisMat.dispose()
      visorMat.dispose()
      accentMat.dispose()
      chromeMat.dispose()
      darkMetalMat.dispose()
      ledCyanMat.dispose()
      ledGlowWhite.dispose()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[240px] xs:h-[260px] sm:h-[300px] md:h-[480px] lg:h-[580px] flex items-center justify-center select-none pointer-events-none mt-0"
    >
      {/* 3D Robot Canvas - touchAction pan-y preserves seamless mobile scrolling */}
      <canvas
        ref={canvasRef}
        className="w-full h-full pointer-events-auto"
        style={{ touchAction: 'pan-y' }}
      />
    </div>
  )
}

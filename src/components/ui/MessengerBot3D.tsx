import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface MessengerBot3DProps {
  isDelivering?: boolean
}

export const MessengerBot3D: React.FC<MessengerBot3DProps> = ({ isDelivering = false }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const isDeliveringRef = useRef(isDelivering)

  useEffect(() => {
    isDeliveringRef.current = isDelivering
  }, [isDelivering])

  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return

    const container = containerRef.current
    const canvas = canvasRef.current

    // Scene
    const scene = new THREE.Scene()

    // Camera: Framed specifically for the Messenger Bot and Letter
    const camera = new THREE.PerspectiveCamera(
      34,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    )
    camera.position.set(0, 0.35, 4.8)
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
    renderer.toneMappingExposure = 1.25

    // Main Robot Root
    const robotGroup = new THREE.Group()
    robotGroup.position.set(0, -0.15, 0)
    scene.add(robotGroup)

    // ============================================================
    // MATERIALS (Matching Hero Robot identity)
    // ============================================================
    const whiteChassisMat = new THREE.MeshStandardMaterial({
      color: 0xfbfcfe,
      roughness: 0.22,
      metalness: 0.1
    })

    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x090c12,
      roughness: 0.45,
      metalness: 0.2
    })

    const accentOliveMat = new THREE.MeshStandardMaterial({
      color: 0xa1a480, // Olive accent matching portfolio
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

    const cheekMat = new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      transparent: true,
      opacity: 0.65
    })

    // Envelope Materials
    const envelopePaperMat = new THREE.MeshStandardMaterial({
      color: 0xfafbfc,
      roughness: 0.35,
      metalness: 0.1
    })

    const envelopeFlapMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.4,
      metalness: 0.1
    })

    const sealMat = new THREE.MeshStandardMaterial({
      color: 0xa1a480, // Olive green wax stamp
      roughness: 0.25,
      metalness: 0.45
    })

    // ============================================================
    // 1. HEAD & VISOR
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

    // Obsidian Visor
    const visorGeo = new THREE.SphereGeometry(0.53, 36, 36)
    visorGeo.scale(0.92, 0.74, 0.88)
    const visor = new THREE.Mesh(visorGeo, visorMat)
    visor.position.set(0, -0.01, 0.13)
    headGroup.add(visor)

    // Face Elements Group
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

    // Smile / Mouth
    const mouthGeo = new THREE.TorusGeometry(0.062, 0.012, 12, 24, Math.PI * 0.75)
    const mouthMesh = new THREE.Mesh(mouthGeo, ledCyanMat)
    mouthMesh.rotation.z = Math.PI * 1.125
    mouthMesh.position.set(0, -0.11, 0)
    faceDisplayGroup.add(mouthMesh)

    // Rosy Cheeks
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

    const leftPod = new THREE.Mesh(podGeo, accentOliveMat)
    leftPod.rotation.z = Math.PI / 2
    leftPod.position.set(-0.65, 0.04, 0)
    headGroup.add(leftPod)

    const leftRing = new THREE.Mesh(ringGeo, ledCyanMat)
    leftRing.rotation.y = Math.PI / 2
    leftRing.position.set(-0.695, 0.04, 0)
    headGroup.add(leftRing)

    const rightPod = new THREE.Mesh(podGeo, accentOliveMat)
    rightPod.rotation.z = Math.PI / 2
    rightPod.position.set(0.65, 0.04, 0)
    headGroup.add(rightPod)

    const rightRing = new THREE.Mesh(ringGeo, ledCyanMat)
    rightRing.rotation.y = Math.PI / 2
    rightRing.position.set(0.695, 0.04, 0)
    headGroup.add(rightRing)

    // Antenna
    const antennaStem = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.015, 0.22, 12), chromeMat)
    antennaStem.position.set(0, 0.65, 0)
    headGroup.add(antennaStem)

    const antennaTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 16, 16), ledCyanMat)
    antennaTip.position.set(0, 0.77, 0)
    headGroup.add(antennaTip)

    // ============================================================
    // 2. ROBOT BODY & LEGS
    // ============================================================
    const bodyGroup = new THREE.Group()
    robotGroup.add(bodyGroup)

    const bodyGeo = new THREE.SphereGeometry(0.48, 32, 32)
    bodyGeo.scale(1, 1.05, 0.92)
    const body = new THREE.Mesh(bodyGeo, whiteChassisMat)
    body.position.set(0, -0.12, 0)
    body.castShadow = true
    bodyGroup.add(body)

    // Legs
    const legGeo = new THREE.CylinderGeometry(0.075, 0.065, 0.26, 16)
    const footGeo = new THREE.SphereGeometry(0.11, 16, 16)
    footGeo.scale(1, 0.65, 1.3)

    const leftLeg = new THREE.Mesh(legGeo, whiteChassisMat)
    leftLeg.position.set(-0.22, -0.62, 0.06)
    leftLeg.rotation.x = Math.PI / 12
    leftLeg.rotation.z = Math.PI / 16
    bodyGroup.add(leftLeg)

    const leftFoot = new THREE.Mesh(footGeo, darkMetalMat)
    leftFoot.position.set(-0.24, -0.74, 0.12)
    bodyGroup.add(leftFoot)

    const rightLeg = new THREE.Mesh(legGeo, whiteChassisMat)
    rightLeg.position.set(0.22, -0.62, 0.06)
    rightLeg.rotation.x = Math.PI / 12
    rightLeg.rotation.z = -Math.PI / 16
    bodyGroup.add(rightLeg)

    const rightFoot = new THREE.Mesh(footGeo, darkMetalMat)
    rightFoot.position.set(0.24, -0.74, 0.12)
    bodyGroup.add(rightFoot)

    // ============================================================
    // 3. 3D ENVELOPE (HELD FORWARD WITH ELEGANT WAX SEAL)
    // ============================================================
    const envelopeGroup = new THREE.Group()
    envelopeGroup.position.set(0, -0.22, 0.44)
    robotGroup.add(envelopeGroup)

    // Envelope Base Body
    const envBodyGeo = new THREE.BoxGeometry(0.68, 0.46, 0.028)
    const envBody = new THREE.Mesh(envBodyGeo, envelopePaperMat)
    envBody.castShadow = true
    envelopeGroup.add(envBody)

    // Envelope Top Triangular Flap
    const flapGeo = new THREE.ConeGeometry(0.36, 0.22, 4)
    flapGeo.rotateY(Math.PI / 4)
    flapGeo.scale(1.28, 1, 0.14)
    const flap = new THREE.Mesh(flapGeo, envelopeFlapMat)
    flap.position.set(0, 0.04, 0.016)
    flap.rotation.z = Math.PI
    envelopeGroup.add(flap)

    // Olive-Green Premium Seal
    const sealGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.018, 24)
    sealGeo.rotateX(Math.PI / 2)
    const seal = new THREE.Mesh(sealGeo, sealMat)
    seal.position.set(0, -0.04, 0.025)
    envelopeGroup.add(seal)

    // ============================================================
    // 4. ROBOT ARMS & HANDS
    // ============================================================
    const armGeo = new THREE.CylinderGeometry(0.07, 0.06, 0.38, 16)
    const handGeo = new THREE.SphereGeometry(0.07, 16, 16)

    // Left Arm: Holds the envelope on the left edge
    const leftArmGroup = new THREE.Group()
    leftArmGroup.position.set(-0.42, -0.08, 0)
    bodyGroup.add(leftArmGroup)

    const leftArm = new THREE.Mesh(armGeo, whiteChassisMat)
    leftArm.position.set(0.06, -0.15, 0.18)
    leftArm.rotation.x = Math.PI / 3.4
    leftArm.rotation.z = -Math.PI / 6
    leftArmGroup.add(leftArm)

    const leftHand = new THREE.Mesh(handGeo, chromeMat)
    leftHand.position.set(0.12, -0.26, 0.36)
    leftArmGroup.add(leftHand)

    // Right Arm: Friendly waving / presenting hand
    const rightArmGroup = new THREE.Group()
    rightArmGroup.position.set(0.42, -0.06, 0)
    bodyGroup.add(rightArmGroup)

    const rightArm = new THREE.Mesh(armGeo, whiteChassisMat)
    rightArm.position.set(0.08, 0.12, 0.12)
    rightArm.rotation.x = -Math.PI / 8
    rightArm.rotation.z = -Math.PI / 4.5
    rightArmGroup.add(rightArm)

    const rightHand = new THREE.Mesh(handGeo, chromeMat)
    rightHand.position.set(0.16, 0.26, 0.18)
    rightArmGroup.add(rightHand)

    // ============================================================
    // 5. LIGHTING
    // ============================================================
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4)
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8)
    keyLight.position.set(3, 6, 5)
    keyLight.castShadow = true
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xdbe0e8, 1.1)
    fillLight.position.set(-4, 2, 3)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0xa1a480, 1.6)
    rimLight.position.set(0, 3, -4)
    scene.add(rimLight)

    // Soft glow near envelope
    const envelopePointLight = new THREE.PointLight(0xa1a480, 1.2, 1.8)
    envelopePointLight.position.set(0, -0.2, 0.6)
    robotGroup.add(envelopePointLight)

    // ============================================================
    // 6. MOUSE TRACKING & ANIMATION
    // ============================================================
    let mouseNormX = 0
    let mouseNormY = 0

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      // Dampen if cursor is outside canvas
      mouseNormX = THREE.MathUtils.clamp(x, -1.2, 1.2)
      mouseNormY = THREE.MathUtils.clamp(y, -1.2, 1.2)
    }

    window.addEventListener('mousemove', handleMouseMove)

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
    const clock = new THREE.Clock()
    let blinkTimer = 0
    let isBlinking = false
    let deliveryProgress = 0

    const maxEyeShiftX = 0.05
    const maxEyeShiftY = 0.035

    const animate = () => {
      animationId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      const elapsed = clock.getElapsedTime()

      // Target Eye Tracking
      const targetEyeX = THREE.MathUtils.clamp(mouseNormX * maxEyeShiftX, -maxEyeShiftX, maxEyeShiftX)
      const targetEyeY = THREE.MathUtils.clamp(mouseNormY * maxEyeShiftY, -maxEyeShiftY, maxEyeShiftY)

      leftEyeGroup.position.x += (-0.18 + targetEyeX - leftEyeGroup.position.x) * 0.16
      leftEyeGroup.position.y += (0.05 + targetEyeY - leftEyeGroup.position.y) * 0.16

      rightEyeGroup.position.x += (0.18 + targetEyeX - rightEyeGroup.position.x) * 0.16
      rightEyeGroup.position.y += (0.05 + targetEyeY - rightEyeGroup.position.y) * 0.16

      mouthMesh.position.x += (targetEyeX * 0.35 - mouthMesh.position.x) * 0.12
      mouthMesh.position.y += (-0.11 + targetEyeY * 0.25 - mouthMesh.position.y) * 0.12

      // Head turns smoothly toward mouse
      headGroup.rotation.y += (mouseNormX * 0.25 - headGroup.rotation.y) * 0.08
      headGroup.rotation.x += (-mouseNormY * 0.18 - headGroup.rotation.x) * 0.08

      // Body gentle floating bob
      const floatingY = -0.15 + Math.sin(elapsed * 1.8) * 0.035
      robotGroup.position.y = floatingY

      // Legs gentle counter-balance
      leftLeg.rotation.x = Math.PI / 12 + Math.sin(elapsed * 1.8) * 0.04
      rightLeg.rotation.x = Math.PI / 12 - Math.sin(elapsed * 1.8) * 0.04

      // Gentle Waving Right Hand (when not delivering)
      if (!isDeliveringRef.current) {
        // Natural friendly wave
        rightArmGroup.rotation.z = Math.sin(elapsed * 3.2) * 0.18
        rightHand.rotation.z = Math.cos(elapsed * 4.5) * 0.22

        // Envelope resting gently in hands
        envelopeGroup.position.y = -0.22 + Math.sin(elapsed * 1.8) * 0.015
        envelopeGroup.position.z = 0.44
        envelopeGroup.position.x = 0
        envelopeGroup.rotation.x = Math.PI / 14 + Math.sin(elapsed * 1.2) * 0.02
        envelopeGroup.rotation.y = 0
        envelopeGroup.rotation.z = Math.sin(elapsed * 1.5) * 0.02
        envelopeGroup.scale.set(1, 1, 1)

        deliveryProgress = 0
      } else {
        // DELIVERY ANIMATION: Robot dispatches envelope forward and upward!
        deliveryProgress += delta * 1.2
        const p = Math.min(deliveryProgress, 2.5)

        // Envelope swooshes up, forward, and spins slightly into the digital dispatch
        envelopeGroup.position.y = -0.22 + p * 0.75
        envelopeGroup.position.z = 0.44 + p * 1.2
        envelopeGroup.rotation.x = Math.PI / 14 - p * 0.8
        envelopeGroup.rotation.z = p * 0.4
        const scaleVal = Math.max(1 - p * 0.35, 0.01)
        envelopeGroup.scale.set(scaleVal, scaleVal, scaleVal)

        // Robot celebrates! Both arms wave joyfully
        rightArmGroup.rotation.z = Math.sin(elapsed * 8) * 0.35 - 0.2
        leftArmGroup.rotation.z = -Math.sin(elapsed * 8) * 0.35 + 0.2
        headGroup.rotation.z = Math.sin(elapsed * 4) * 0.08
      }

      // Digital Blink
      blinkTimer += delta
      if (blinkTimer > 3.4 && !isBlinking) {
        isBlinking = true
        leftEyeGroup.scale.y = 0.08
        rightEyeGroup.scale.y = 0.08

        setTimeout(() => {
          leftEyeGroup.scale.y = 1
          rightEyeGroup.scale.y = 1
          isBlinking = false
          blinkTimer = 0
        }, 130)
      }

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationId)
      renderer.dispose()
      whiteChassisMat.dispose()
      visorMat.dispose()
      accentOliveMat.dispose()
      chromeMat.dispose()
      darkMetalMat.dispose()
      ledCyanMat.dispose()
      ledGlowWhite.dispose()
      cheekMat.dispose()
      envelopePaperMat.dispose()
      envelopeFlapMat.dispose()
      sealMat.dispose()
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[320px] sm:h-[360px] lg:h-[400px] flex items-center justify-center select-none"
    >
      {/* 3D Robot Canvas */}
      <canvas ref={canvasRef} className="w-full h-full pointer-events-auto cursor-grab active:cursor-grabbing" />
    </div>
  )
}

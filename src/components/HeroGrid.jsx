import { useEffect, useRef } from 'react'

// Soft dot grid that brightens and swells around the cursor. Pure canvas, no deps.
// Draws only while the pointer is moving nearby, and stays static for reduced-motion users.
export default function HeroGrid({ gap = 26, radius = 160 }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches
    let w = 0
    let h = 0
    let frame = 0
    const target = { x: -9999, y: -9999 }
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    function draw() {
      const dark = document.documentElement.classList.contains('dark')
      const base = dark ? '148,163,184' : '100,116,139'
      const glow = dark ? '147,176,255' : '79,107,245'
      ctx.clearRect(0, 0, w, h)
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const t = Math.max(0, 1 - Math.hypot(dx, dy) / radius) // 1 at cursor, 0 at radius
          const e = t * t
          // Nudge dots slightly away from the cursor.
          const px = x + dx * e * 0.12
          const py = y + dy * e * 0.12
          ctx.beginPath()
          ctx.arc(px, py, 1 + e * 1.8, 0, Math.PI * 2)
          ctx.fillStyle = e > 0.01 ? `rgba(${glow},${0.25 + e * 0.75})` : `rgba(${base},0.28)`
          ctx.fill()
        }
      }
    }

    // Ease the glow toward the pointer so it trails smoothly.
    const tick = () => {
      mouse.x += (target.x - mouse.x) * 0.18
      mouse.y += (target.y - mouse.y) * 0.18
      draw()
      frame = Math.abs(target.x - mouse.x) + Math.abs(target.y - mouse.y) > 0.5 ? requestAnimationFrame(tick) : 0
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x > -radius && y > -radius && x < w + radius && y < h + radius
      target.x = inside ? x : -9999
      target.y = inside ? y : -9999
      if (mouse.x < -999) {
        mouse.x = target.x
        mouse.y = target.y
      }
      if (!frame) frame = requestAnimationFrame(tick)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const themeObserver = new MutationObserver(draw)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    if (!still) window.addEventListener('pointermove', onMove, { passive: true })

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [gap, radius])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute -inset-x-4 -inset-y-12 -z-10 h-[calc(100%+6rem)] w-[calc(100%+2rem)] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_80%)] sm:-inset-x-10 sm:w-[calc(100%+5rem)]"
    />
  )
}

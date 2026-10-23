import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

// Full-screen image viewer. `images` is a list of URLs; `index` is the open one (null = closed).
export default function Lightbox({ images, index, onChange, onClose, caption }) {
  const open = index !== null && images?.length > 0
  const count = images?.length ?? 0
  const prev = () => onChange((index - 1 + count) % count)
  const next = () => onChange((index + 1) % count)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKey)
    }
  })

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={caption ? `${caption} photos` : 'Photos'}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          >
            <X size={20} />
          </button>

          {count > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prev()
              }}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:left-6"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={caption ? `${caption}, photo ${index + 1}` : `Photo ${index + 1}`}
                className="max-h-[80vh] max-w-[92vw] rounded-xl object-contain shadow-2xl sm:max-w-[80vw]"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                drag={count > 1 ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) next()
                  else if (info.offset.x > 60) prev()
                }}
              />
            </AnimatePresence>
            <figcaption className="mt-3 text-center text-sm text-slate-300">
              {caption}
              {count > 1 && <span className="ml-2 text-slate-400">{index + 1} / {count}</span>}
            </figcaption>
          </figure>

          {count > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                next()
              }}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 sm:right-6"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}

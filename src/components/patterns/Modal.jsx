import { createPortal } from 'react-dom'
import { useEffect } from 'react'

function Modal({ isOpen, onClose, title, children }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  // createPortal(jsx, domNode)
  // React tree stays the same — DOM placement changes
  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={onClose}   // click backdrop to close
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal content */}
      <div
        className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-4 z-10"
        onClick={(e) => e.stopPropagation()}  // don't close when clicking inside
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>,
    document.getElementById('portal-root')  // renders here in DOM
  )
}

export default Modal
import { motion } from 'framer-motion'

/**
 * Netflix-style "Lost your way?" screen, shown when the URL path isn't the
 * site root (this is a single-page app — everything lives at `/`).
 */
export default function NotFound() {
  return (
    <motion.div
      className="not-found"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="not-found__code">404</div>
      <h1 className="not-found__title">Lost your way?</h1>
      <p className="not-found__desc">
        That title isn't in our catalog. Let's get you back to the browsing screen.
      </p>
      <a className="nf-btn nf-btn--play" href="/">
        Back to Home
      </a>
    </motion.div>
  )
}

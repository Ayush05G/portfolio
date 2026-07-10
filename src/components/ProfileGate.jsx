import { motion } from 'framer-motion'
import { profiles } from '../data.js'

/**
 * The "Who's watching?" Netflix profile selection screen.
 * Selecting any profile calls onSelect() and enters the site.
 */
export default function ProfileGate({ onSelect }) {
  return (
    <motion.div
      className="gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h1 className="gate__title">Who's watching?</h1>
      <div className="gate__grid">
        {profiles.map((p, i) => (
          <motion.button
            key={p.id}
            className="gate__profile"
            onClick={() => onSelect(p)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
          >
            <span className="gate__avatar" style={{ background: p.color }}>
              {p.avatar ? (
                <img className="gate__avatar-img" src={p.avatar} alt={p.name} />
              ) : (
                p.name[0]
              )}
            </span>
            <span className="gate__name">{p.name}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

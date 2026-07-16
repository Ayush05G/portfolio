import type { CSSProperties } from 'react'
import { motion } from 'framer-motion'
import type { Skill } from '../../data.ts'

interface Props {
  item: Skill
}

export default function SkillCard({ item }: Props) {
  return (
    <div
      className="card"
      style={{ '--card-accent': '#1f1f1f' } as CSSProperties}
      tabIndex={0}
      role="group"
      aria-label={item.name}
    >
      <div className="card__art">
        <span className="card__tag">{item.tag}</span>
        {item.logo && <img className="skill-logo" src={item.logo} alt={`${item.name} logo`} loading="lazy" />}
        <span className="card__label">{item.name}</span>
        <div className="card__bar">
          <motion.div
            className="card__fill"
            initial={{ width: 0 }}
            whileInView={{ width: `${item.level}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
        </div>
        <span className="card__sub" style={{ marginTop: 6 }}>
          {item.level}% fluency
        </span>
      </div>
    </div>
  )
}

import type { Skill } from '../../data.ts'
export default function SkillCard({ item }: { item: Skill }) {
  return (
    <div className="skill-evidence">
      <span className="skill-evidence__name">
        {item.logo && <img src={item.logo} alt="" loading="lazy" />}
        <strong>{item.name}</strong>
      </span>
      <p>{item.evidence || `Part of my ${item.tag.toLowerCase()} toolkit.`}</p>
    </div>
  )
}

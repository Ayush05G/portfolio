import { Home, Document } from '../icons.tsx'
interface Props {
  onOpenResume: () => void
  onOpenMore: () => void
}
export default function BottomTabBar({ onOpenResume, onOpenMore }: Props) {
  return (
    <nav className="tabbar" aria-label="Quick navigation">
      <a className="tabbar__item" href="#projects">
        <span className="tabbar__icon">{Home}</span>
        <span>Work</span>
      </a>
      <button className="tabbar__item" onClick={onOpenResume}>
        <span className="tabbar__icon">{Document}</span>
        <span>Resume</span>
      </button>
      <a className="tabbar__item" href="#contact">
        <span className="tabbar__icon" aria-hidden>
          ↗
        </span>
        <span>Contact</span>
      </a>
      <button className="tabbar__item" onClick={onOpenMore} aria-haspopup="dialog">
        <span className="tabbar__icon" aria-hidden>
          •••
        </span>
        <span>More</span>
      </button>
    </nav>
  )
}

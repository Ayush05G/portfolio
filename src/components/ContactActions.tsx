import { useState } from 'react'
import { track } from '@vercel/analytics'
import { profile, socials } from '../data.ts'

export default function ContactActions({ location = 'contact' }: { location?: string }) {
  const [copied, setCopied] = useState(false)
  const [failed, setFailed] = useState(false)
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setFailed(false)
      track('email_copied', { location })
    } catch {
      setFailed(true)
    }
  }
  return (
    <div className="contact-actions">
      <a
        href={`mailto:${profile.email}`}
        onClick={() => track('contact_clicked', { location, method: 'email' })}
      >
        Email me ↗
      </a>
      <button onClick={copy}>{copied ? 'Email copied ✓' : 'Copy email'}</button>
      <a
        href={socials.find((s) => s.label === 'LinkedIn')?.url}
        target="_blank"
        rel="noreferrer"
        onClick={() => track('contact_clicked', { location, method: 'linkedin' })}
      >
        LinkedIn ↗
      </a>
      <span role="status" className={failed ? 'copy-fallback' : 'sr-only'}>
        {failed ? `Copy this address: ${profile.email}` : copied ? 'Email address copied to clipboard.' : ''}
      </span>
    </div>
  )
}

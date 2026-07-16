import { useState } from 'react'
import { profile, contact } from '../data.js'

/**
 * "Get in touch" form. If a Web3Forms access key is configured it POSTs there
 * (real email, no backend); otherwise it gracefully falls back to opening the
 * visitor's email client pre-filled.
 */
export default function ContactForm() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const name = data.get('name')
    const email = data.get('email')
    const message = data.get('message')

    // No key configured → mailto fallback.
    if (!contact.web3formsKey) {
      const subject = encodeURIComponent(`Portfolio message from ${name}`)
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`)
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
      setStatus('sent')
      return
    }

    setStatus('sending')
    setError('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: contact.web3formsKey,
          subject: `Portfolio message from ${name}`,
          from_name: name,
          name,
          email,
          message,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
        setError(json.message || 'Something went wrong. Please email me directly.')
      }
    } catch {
      setStatus('error')
      setError('Network error. Please email me directly.')
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form contact-form--done">
        <div className="contact-form__check">✓</div>
        <h3>Message on its way</h3>
        <p>
          {contact.web3formsKey
            ? "Thanks for reaching out — I'll get back to you soon."
            : 'Your email client should have opened, pre-filled and ready to send.'}
        </p>
        <button className="nf-btn nf-btn--info" onClick={() => setStatus('idle')}>
          Send another
        </button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__row">
        <label>
          <span>Name</span>
          <input name="name" type="text" required placeholder="Your name" />
        </label>
        <label>
          <span>Email</span>
          <input name="email" type="email" required placeholder="you@email.com" />
        </label>
      </div>
      <label>
        <span>Message</span>
        <textarea name="message" rows="4" required placeholder="What's on your mind?" />
      </label>
      {status === 'error' && <p className="contact-form__error">{error}</p>}
      <button className="nf-btn nf-btn--play" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}

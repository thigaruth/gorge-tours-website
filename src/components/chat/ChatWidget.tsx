'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, X, Send, Sparkles } from 'lucide-react'
import { FormEvent, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

type ChatState = {
  open: boolean
  loading: boolean
  success: string | null
  error: string | null
}

const quickMessages = [
  'Best safari month for migration?',
  'Need a family-friendly package',
  'Can you include a balloon safari?',
]

export default function ChatWidget() {
  const [state, setState] = useState<ChatState>({
    open: false,
    loading: false,
    success: null,
    error: null,
  })

  const [draft, setDraft] = useState({
    fullName: '',
    email: '',
    message: '',
  })

  async function submitMessage(event: FormEvent) {
    event.preventDefault()

    setState((prev) => ({ ...prev, loading: true, success: null, error: null }))

    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: draft.fullName,
        email: draft.email,
        subject: 'Chat Concierge Request',
        message: draft.message,
        preferredContact: 'whatsapp',
        newsletterOptIn: false,
      }),
    })

    const json = await response.json().catch(() => ({}))

    if (!response.ok) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: json?.error ?? 'Could not send your message.',
      }))
      return
    }

    setState((prev) => ({
      ...prev,
      loading: false,
      success: `Sent. Ref: ${json?.data?.id ?? 'pending'}`,
      error: null,
    }))
    setDraft({ fullName: '', email: '', message: '' })
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <AnimatePresence>
        {state.open && (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="mb-3 w-[min(92vw,360px)] overflow-hidden rounded-3xl border border-border bg-card shadow-safari"
          >
            <div className="border-b border-border bg-[linear-gradient(120deg,rgba(40,82,52,0.93),rgba(24,53,37,0.98))] p-4 text-stone-100">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-300">Live Concierge</p>
              <p className="mt-1 text-lg font-semibold">Safari Chat Assistant</p>
              <p className="text-xs text-stone-300">Replies routed to our planner desk.</p>
            </div>

            <div className="space-y-3 p-4">
              <div className="grid gap-2">
                {quickMessages.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="rounded-xl border border-border bg-background px-3 py-2 text-left text-xs text-muted-foreground transition-colors hover:bg-secondary"
                    onClick={() => setDraft((prev) => ({ ...prev, message: item }))}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <form className="grid gap-2" onSubmit={submitMessage}>
                <Input
                  placeholder="Your name"
                  value={draft.fullName}
                  onChange={(event) => setDraft((prev) => ({ ...prev, fullName: event.target.value }))}
                  required
                />
                <Input
                  type="email"
                  placeholder="Your email"
                  value={draft.email}
                  onChange={(event) => setDraft((prev) => ({ ...prev, email: event.target.value }))}
                  required
                />
                <Textarea
                  rows={3}
                  placeholder="Ask us anything about routes, lodges, migration timing..."
                  value={draft.message}
                  onChange={(event) => setDraft((prev) => ({ ...prev, message: event.target.value }))}
                  required
                />
                <Button type="submit" className="gap-2" disabled={state.loading}>
                  <Send size={16} />
                  {state.loading ? 'Sending...' : 'Send Message'}
                </Button>
              </form>

              {state.success && <p className="text-xs text-emerald-700">{state.success}</p>}
              {state.error && <p className="text-xs text-destructive">{state.error}</p>}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-safari transition-transform hover:scale-105"
        onClick={() => setState((prev) => ({ ...prev, open: !prev.open }))}
      >
        {state.open ? <X size={18} /> : <MessageCircle size={18} />}
        {state.open ? 'Close Chat' : 'Safari Chat'}
        <Sparkles size={14} className="opacity-80" />
      </button>
    </div>
  )
}

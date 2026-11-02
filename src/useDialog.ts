import { useId, useLayoutEffect, useRef, type RefObject } from 'react'

interface DialogEntry {
  element: HTMLElement
  returnFocus: HTMLElement | null
  lastFocus: HTMLElement | null
  close: () => void
}

const dialogs: DialogEntry[] = []
const inertElements = new Map<HTMLElement, boolean>()
let stopIsolation: (() => void) | undefined

function focusableElements(element: HTMLElement) {
  return Array.from(
    element.querySelectorAll<HTMLElement>(
      'a[href], area[href], button, input, select, textarea, iframe, summary, [tabindex], [contenteditable="true"]',
    ),
  )
    .filter(
      (node) =>
        node.tabIndex >= 0 &&
        !node.matches(':disabled') &&
        !node.closest('[inert], [hidden]') &&
        node.getClientRects().length > 0 &&
        getComputedStyle(node).visibility !== 'hidden',
    )
    .sort((a, b) => (a.tabIndex || Infinity) - (b.tabIndex || Infinity))
}

function focusInside(entry: DialogEntry) {
  const previous = entry.lastFocus
  const target =
    previous?.isConnected &&
    entry.element.contains(previous) &&
    !previous.closest('[inert], [hidden]') &&
    previous.getClientRects().length
      ? previous
      : focusableElements(entry.element)[0] || entry.element
  target.focus({ preventScroll: true })
}

// Inert sibling branches along the active dialog's ancestry. This also works
// without portals: no ancestor of the active dialog is made inert.
function isolateTopDialog() {
  inertElements.forEach((wasInert, node) => {
    node.inert = wasInert
  })
  inertElements.clear()
  const top = dialogs[dialogs.length - 1]
  if (!top) return
  let branch: HTMLElement = top.element
  while (branch.parentElement) {
    const parent = branch.parentElement
    for (const sibling of parent.children) {
      if (sibling !== branch && sibling instanceof HTMLElement) {
        inertElements.set(sibling, sibling.inert)
        sibling.inert = true
      }
    }
    if (parent === document.body) break
    branch = parent
  }
}

function startIsolation() {
  const overflow = [document.body, document.documentElement].map((element) => ({
    element,
    value: element.style.getPropertyValue('overflow'),
    priority: element.style.getPropertyPriority('overflow'),
  }))
  overflow.forEach(({ element }) => element.style.setProperty('overflow', 'hidden'))

  function onKeyDown(event: KeyboardEvent) {
    const top = dialogs[dialogs.length - 1]
    if (!top || event.isComposing) return
    if (event.key === 'Escape') {
      event.preventDefault()
      event.stopImmediatePropagation()
      top.close()
    } else if (event.key === 'Tab') {
      const elements = focusableElements(top.element)
      const index = elements.indexOf(document.activeElement as HTMLElement)
      // Move explicitly so programmatically focused headings and empty dialogs
      // get the same wrapping behavior as dialogs with interactive controls.
      const next = event.shiftKey
        ? index <= 0
          ? elements.length - 1
          : index - 1
        : (index + 1) % elements.length
      event.preventDefault()
      event.stopImmediatePropagation()
      ;(elements[next] || top.element).focus({ preventScroll: true })
    }
  }

  function onFocusIn(event: FocusEvent) {
    const top = dialogs[dialogs.length - 1]
    if (!top || !(event.target instanceof HTMLElement)) return
    if (top.element.contains(event.target)) top.lastFocus = event.target
    else focusInside(top)
  }

  document.addEventListener('keydown', onKeyDown, true)
  document.addEventListener('focusin', onFocusIn, true)
  const observer = new MutationObserver(isolateTopDialog)
  observer.observe(document.body, { childList: true, subtree: true })
  return () => {
    observer.disconnect()
    document.removeEventListener('keydown', onKeyDown, true)
    document.removeEventListener('focusin', onFocusIn, true)
    overflow.forEach(({ element, value, priority }) => {
      if (value) element.style.setProperty('overflow', value, priority)
      else element.style.removeProperty('overflow')
    })
  }
}

interface DialogOptions {
  open: boolean
  onClose: () => void
  initialFocusRef?: RefObject<HTMLElement>
}

/** Shared modal lifecycle; put dialogRef on a labelled, tabIndex={-1} panel. */
export default function useDialog({ open, onClose, initialFocusRef }: DialogOptions) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef(onClose)
  const titleId = useId()

  useLayoutEffect(() => {
    closeRef.current = onClose
  }, [onClose])

  useLayoutEffect(() => {
    const element = dialogRef.current
    if (!open || !element) return
    const entry: DialogEntry = {
      element,
      returnFocus: document.activeElement instanceof HTMLElement ? document.activeElement : null,
      lastFocus: null,
      close: () => closeRef.current(),
    }
    if (!dialogs.length) stopIsolation = startIsolation()
    dialogs.push(entry)
    isolateTopDialog()
    const initial =
      initialFocusRef?.current || element.querySelector<HTMLElement>('[data-dialog-initial-focus]')
    if (initial && element.contains(initial)) initial.focus({ preventScroll: true })
    else focusInside(entry)

    return () => {
      const index = dialogs.indexOf(entry)
      const wasTop = index === dialogs.length - 1
      dialogs.splice(index, 1)
      // If a lower dialog disappears first, preserve the original trigger for
      // its surviving child instead of restoring into a disconnected overlay.
      for (const dialog of dialogs) {
        if (dialog.returnFocus && element.contains(dialog.returnFocus)) {
          dialog.returnFocus = entry.returnFocus
        }
      }
      isolateTopDialog()
      if (!dialogs.length) {
        stopIsolation?.()
        stopIsolation = undefined
      }
      if (!wasTop) return
      const top = dialogs[dialogs.length - 1]
      const trigger = entry.returnFocus
      if (
        trigger?.isConnected &&
        !trigger.closest('[inert], [hidden]') &&
        (!top || top.element.contains(trigger))
      ) {
        trigger.focus({ preventScroll: true })
      }
      if (top && !top.element.contains(document.activeElement)) focusInside(top)
    }
  }, [open, initialFocusRef])

  return { dialogRef, titleId }
}

import { toast as sonnerToast } from 'sonner'

type ToastOptions = {
  title?: string
  description?: string
}

export function useToast() {
  function toast({ title, description }: ToastOptions) {
    const message = [title, description].filter(Boolean).join('\n')
    sonnerToast(message)
  }

  return { toast }
}

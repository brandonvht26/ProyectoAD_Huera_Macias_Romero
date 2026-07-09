import { useNodeStore } from '@/stores/node-store'

export function NodeIndicator() {
  const servedBy = useNodeStore((state) => state.servedBy)
  
  return (
    <div className="fixed bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg z-50 font-semibold text-sm">
      Atendido por: {servedBy}
    </div>
  )
}

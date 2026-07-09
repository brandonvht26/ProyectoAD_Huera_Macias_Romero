import { create } from 'zustand'

interface NodeState {
  servedBy: string
  setServedBy: (node: string) => void
}

export const useNodeStore = create<NodeState>((set) => ({
  servedBy: 'Desconocido',
  setServedBy: (node) => set({ servedBy: node }),
}))

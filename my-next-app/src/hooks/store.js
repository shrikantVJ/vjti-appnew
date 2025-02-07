import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const usePromptStore = create(
  persist(
    (set) => ({
      prompts: [],
      addPrompt: (prompt) => set((state) => ({ prompts: [prompt, ...state.prompts] })),
      removePrompt: (id) => set((state) => ({ prompts: state.prompts.filter((p) => p.id !== id) })),
      clearHistory: () => set({ prompts: [] }),
    }),
    {
      name: 'prompt-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

export default usePromptStore

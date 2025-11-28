import { create } from 'zustand';
import { createJSONStorage, persist, PersistOptions } from 'zustand/middleware';


interface AuthState {
    token: string
    userId: string

    setAuthData: (data: Partial<AuthState>) => void
    clearAuthData: () => void
}

type AuthPersist = PersistOptions<AuthState>


export const useAuth = create(
    persist<AuthState>((set) => ({ 
        token: "",
        userId: "",

        setAuthData: (data) =>
            set((state) => ({
                ...state,
                ...data,
            })),

        clearAuthData: () => set({
                token: "",
                userId: ""
            }
        ),
    }), {
        name: "auth-storage",
        storage: createJSONStorage(() => localStorage),
    } as AuthPersist)
)
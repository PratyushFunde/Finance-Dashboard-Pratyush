import { create } from "zustand";


export type Role = "viewer" | "admin" | "editor";

interface AuthState{
    role:Role,
    setRole:(role:Role)=>void;
}

export const useAuthStore=create<AuthState>((set)=>({
    role:"viewer",
    setRole:(role)=>set({role})
}))


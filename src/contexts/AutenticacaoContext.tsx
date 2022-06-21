import api from "../services/request";
import { useRouter } from "next/router";
import { createContext, ReactNode, useState } from "react";
import { setCookie } from "nookies";


interface InterDados {
    email: string;
    senha: string;
}

interface InterAutenticacaoContext {
    logar(dados: InterDados): Promise<void>;
}

export const AutenticacaoContext = createContext({} as InterAutenticacaoContext);

interface InterProviderProps {
    children: ReactNode;
}

export function AutenticacaoProvider({children}: InterProviderProps) {

    const router = useRouter();

    async function logar(dados: InterDados) {
        try {
            let resultado = await api.post('/login', dados)

            console.log(resultado)
            setCookie(
                undefined,
                'painel-token',
                resultado.data.access_token
            )
            router.push('/dashboard');

        } catch (error) {

            console.log(error)
        }
    }

    return (
        <AutenticacaoContext.Provider value={{logar}}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

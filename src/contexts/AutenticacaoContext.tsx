import api from "../services/request";
import { useRouter } from "next/router";
import { createContext, ReactNode, useState } from "react";
import { setCookie } from "nookies";
import Swal from "sweetalert2";


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

            if(resultado.data.access_token !== undefined){

            setCookie(
                undefined,
                'painel-token',
                resultado.data.access_token
            )
            router.push('/dashboard');
            }
        } catch (error) {
            Swal.fire({
                title: 'Erro!',
                text: 'Email ou senha incorretos',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.log(error)
        }
    }

    return (
        <AutenticacaoContext.Provider value={{logar}}>
            {children}
        </AutenticacaoContext.Provider>
    )
}

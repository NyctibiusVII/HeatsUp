/* Import ---------------------------------------------------------------------- */ // - x70

import {
    createContext,
    ReactNode
} from 'react'

import { useToasts } from 'react-toast-notifications'

/* ---------------------------------------------------------------------- */

type ToastFunctionContextType = {
    context: string
}
type ToastContextType = {
    successToast: ({ context }: ToastFunctionContextType) => void
    warningToast: ({ context }: ToastFunctionContextType) => void
    errorToast:   ({ context }: ToastFunctionContextType) => void
}
type ToastContextProviderProps = {
    children: ReactNode
}

export const ToastContext = createContext({} as ToastContextType)

export function ToastContextProvider({ children }: ToastContextProviderProps) {
    const { addToast } = useToasts()

    function successToast({ context }: ToastFunctionContextType) {
        switch (context) {
            case 'signIn':
                addToast('Bem-vindo ao HeatsUp 🔥', {
                    appearance: 'success',
                    autoDismissTimeout: 4000
                })
                break
            case 'signOut':
                addToast(`Logout 🎈👋`, {
                    appearance: 'success',
                    autoDismissTimeout: 4000
                })
                break
            case 'message':
                addToast(`Mensagem enviada com sucesso!`, {
                    appearance: 'success',
                    autoDismissTimeout: 4000
                })
                break

            default:
                errorToast({ context: 'errorFunctionToast' })
                break
        }
    }
    function warningToast({ context }: ToastFunctionContextType) {
        switch (context) {
            case 'message':
                addToast('Não enviado! 😕 \n\nMensagem bloqueada por conter palavras proibidas pelo sistema.', {
                    appearance: 'warning',
                    autoDismissTimeout: 5000
                })
                break;

            default:
                errorToast({ context: 'errorFunctionToast' })
                break;
        }
    }
    function errorToast({ context }: ToastFunctionContextType) {
        switch (context) {
            case 'errorFunctionToast':
                addToast('Erro! 😕 \n\nToast principal com erro de execução...', {
                    appearance: 'error',
                    autoDismissTimeout: 7000
                })
                break

            default:
                alert('ERRO NO SISTEMA!!!')
                break
        }
    }

    return (
        <ToastContext.Provider
            value={{
                successToast,
                warningToast,
                errorToast
            }}
        >
            {children}
        </ToastContext.Provider>
    )
}
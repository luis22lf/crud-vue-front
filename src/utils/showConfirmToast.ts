// Aqui ficam arquivos para lógica dos componentes

import { useToast } from 'vue-toastification'
import ConfirmToast from '@/components/ConfirmToast.vue'

export function showConfirmToast(message: string): Promise<boolean> 
{
  return new Promise((resolve) => 
    {
        const toast = useToast()

        toast
        (
            {
                component: ConfirmToast,
                props: 
                {
                    message,
                    onConfirm: () =>
                        {
                            resolve(true) //clicou em Sim
                            toast.clear()
                        },
                    onCancel: () => 
                        {
                            resolve(false) //clicou em Não
                            toast.clear()
                        },
                },
            },
            {
                timeout: false,
                closeOnClick: false,
                draggable: false,
                hideProgressBar: true,
                toastClassName: 'confirm-toast-container',
            }
        )
  })
}

// Aqui ficam arquivos para lógica dos componentes

import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useToast } from "vue-toastification";

export function useAuthActions() 
{
    const router = useRouter();
    const auth = useAuthStore();
    const toast = useToast();

    const handleSair = () => 
    {
    console.log('clicked');
    localStorage.removeItem('token'); // Remove o token do localStorage
    console.log('token-front-end:', localStorage.getItem('token'));
    auth.logout() // Altera o estado global
    toast.clear();//encerra qualquer toast que esteja aberto
    router.push('/');
    }

    return { handleSair };
}
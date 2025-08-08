import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // Importa o Pinia (gerenciador de estado)
import Toast, { type PluginOptions, POSITION } from "vue-toastification"; //(Importa o Toast para notificações)
import './assets/toast.css'//estilização personalizada do toast
import 'vue-toastification/dist/index.css'//estilização do toast da propria lib

const app = createApp(App)
const pinia = createPinia() // Crie uma instância do Pinia

// Configuração globais do Toast
const options: PluginOptions = 
{
    // You can set your default options here
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    draggablePercent: 0.4,
    closeButton: false,
    hideProgressBar: false,
    toastClassName: 'custom-toast',
    bodyClassName: 'custom-toast-body',
    icon: true,
};

app.use(Toast, options);// Usa o Toast no app
app.use(router)
app.use(pinia) // Use o Pinia no app

app.mount('#app')



/*
Meu entendimento do código:

*env.d.ts
declaração dos tipos das variáveis de ambiente
ao usar typescript pode dar problema de não conseguir identificar o tipo, para variaveis de ambiente, é esse arquivo onde se declara

*types/index.ts
declaração dos tipos de variáveis usadas no código
variáveis que usadas várias vez podem ser declaradas nesse arquivo para não precisar falar o tipo dela sempre que usada

*api.ts
arquivo criado pela IA para fazer comunicação com o backend através do axios
está comentado pois está sendo feito o fetch que comunica com os endpoints diretamente nas página Cadastras.vue e Buscar.vue

*stores/auth.ts
uso do pinia para definição de estados globais

*router/index.ts
definição das rotas para acessar componentes(paginas)

*/
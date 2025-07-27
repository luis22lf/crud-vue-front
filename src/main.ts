import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // Importe o Pinia

const app = createApp(App)
const pinia = createPinia() // Crie uma instância do Pinia

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
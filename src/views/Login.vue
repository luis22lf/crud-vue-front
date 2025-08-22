<!-- src/views/Login.vue -->
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useToast } from "vue-toastification";

const auth = useAuthStore();
const router = useRouter();
const username = ref('');
const password = ref('');


async function enviaLogin(login: string, senha: string){
  const toast = useToast();
  try{
    const response = await fetch('http://localhost:3000/api/users/Login',
    {
      method: 'POST', //método
      headers: 
      {
          'Content-Type': 'application/json' //tipo de conteudo que será enviado (json)
      },
      body: JSON.stringify //converte javascript para json
      ({
          //conteudo convertido a ser enviado...
          login: login,
          senha: senha
      })
    });
    if (!response.ok) //se deu erro
    {
      const err = await response.json();
      throw new Error(err.error || 'Erro desconhecido');
    }

    const data = await response.json();
    console.log("Login realizado com sucesso:", data);
    auth.login(); // Altera o estado global
    router.push('/cadastro');// Redireciona para a página de cadastro
  }
  catch (error) {
    toast.error("Erro ao logar: " + (error as Error).message);
  }
}

function validaEmail(email: string): boolean 
{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const borderColorEmail = ref('#030303');
const borderColorSenha = ref('#030303');

const handleLogin = () => {
 
  if (!validaEmail(username.value)) 
  {
    borderColorEmail.value = '#fa0303';
    alert('Por favor, insira um email válido.');
    return;
  }
  else
  {
    borderColorEmail.value = '#030303'; // Reseta a cor se o email for válido
  }
  if (password.value.length < 6) 
  {
    borderColorSenha.value = '#fa0303';
    alert('A senha deve ter pelo menos 6 caracteres.');
    return;
  }
  else
  {
    borderColorSenha.value = '#030303'; // Reseta a cor se a senha for válida
  }

  enviaLogin(username.value, password.value);
};
</script>

<template>
  <div class="page-container">
    <div class="login-container">
      <h1>Login</h1>
      <!-- @submit -> Quando o formulário for enviado, faça algo.-->
      <!--.prevent → Não recarregue a página-->
      <!--handleLogin -> chama a função handleLogin-->
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Usuário:</label>
          <input :style="{ '--border-color-email': borderColorEmail }" id="username" v-model="username" type="text" required>
        </div>
        <div>
          <label for="password">Senha:</label>
          <input :style="{ '--border-color-senha': borderColorSenha }" id="password" v-model="password" type="password" required>
        </div>
        <button type="submit">Entrar</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}
.page-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5; /* Opcional: fundo cinza claro */
}
.login-container {
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  text-align: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: auto;
}
h1 {
  margin-bottom: 1.5rem;
  color: #333;
}
form div {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
}
#username {
  border-color: var(--border-color-email);
}
#password {
  border-color: var(--border-color-senha);
}
button {
  padding: 0.5rem 1rem;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
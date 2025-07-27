<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'

const router = useRouter();
const auth = useAuthStore();

const handleSair = () => 
{
  console.log('clicked');
  auth.logout() // Altera o estado global
  router.push('/');
}

</script>

<template>
  <div class="sair">
    <button v-on:click="handleSair">Sair</button>
  </div>
</template>

<style scoped>
.sair {
  display: flex;
  justify-content: flex-end; /* Alinha o botão à direita */
  width: 100%;
  margin-bottom: 10px;
}

button {
  padding: 3% 2%;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: auto; /* Remove largura fixa */
  max-width: 100%; /* Garante que não ultrapasse o container */
  margin-left: 85%;
}
</style>

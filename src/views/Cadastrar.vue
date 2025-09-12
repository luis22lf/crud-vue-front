<template>
  <div class="container">
    <Sair />
    <h2>Cadastro</h2>
    <div class="form-group">
        <label for="aparelho">Aparelho:</label>
        <br>
        <!-- v-model (comando vue para bidirecionalidade, modificações aqui, são vistas no script e vice-versa) -->
        <input type="text" id="aparelho" v-model="aparelho.nome" name="aparelho" placeholder="Digite o Aparelho..." required>
    </div>

    <label for="situacao">Selecione a situação do aparelho</label>
    <br>
    <select name="aparelho-situacao" id="situacao" v-model="aparelho.situacao">
    <option value="ndef">---</option>
    <option value="funcional">Funcional</option>
    <option value="quebrado">Quebrado</option>
    <option value="uso-exclusivo">Uso exclusivo</option>
    </select>
    <br>
    <button v-on:click="Cadastrar">Cadastrar</button>
    

    

    <div>
      <span class="cadastros">
          Cadastros:
      </span>
      <ul id="ListaCadastro">
          <!--aqui serão inseridos novos cadastros-->
      </ul>
    </div>
      

    <div class="form-group">
      <label for="saida">Dados cadastrados:</label>
      <!--chaves duplas para exibir variavel-->
      <textarea id="saida" readonly rows="6" cols="40">{{ saida }}</textarea>
    </div>
  </div>
</template>


<script setup lang="ts">
  import Sair from '../components/Sair.vue'//importa botão sair
  import { useToast } from "vue-toastification";
  import { useRouter } from 'vue-router';
  import { renovarToken } from '@/utils/renovarToken' // Importa a função de renovar token
  const toast = useToast();
  const router = useRouter();

  // Composição para usar variaveis reativas
  //Ref para variaveis, reactive para objetos
  import { ref, reactive } from 'vue';

  // Define objeto reativo aparelho
  const aparelho = reactive({
      nome: '',
      situacao: ''
  });



  // Texto que exibe os dados cadastrados
  const saida = ref<string>('');
  // ------ Fim da composição -----------------

  // Cadastrar

  const Cadastrar = async () => 
  {
    if (aparelho.nome.trim() && aparelho.situacao.trim()) //verifica se os campos não estão vazios e trim() remove compos vazios no início e fim da string
    {
      try 
      {
        const token = localStorage.getItem('token'); //pega token do local storage
        const response = await fetch('http://localhost:3000/api/equipamentos/Cadastro', //requisição
        {
          method: 'POST', //método
          headers: 
          {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' //tipo de conteudo que será enviado (json)
          },
          body: JSON.stringify //converte javascript para json
          ({
              //conteudo convertido a ser enviado...
              nome: aparelho.nome,
              situacao: aparelho.situacao
          })
        });

        if (!response.ok) //se deu erro
        {
          const err = await response.json();
          throw new Error(err.error || 'Erro desconhecido');
        }

        const data = await response.json();//resposta do servidor

        saida.value += `Aparelho: ${data.data.nome} | Situação: ${data.data.situacao}\n`;

        //injetando <li> no html com dados cadastrados
            let listaCadastro = document.getElementById("ListaCadastro");
            let cadastroNovo = document.createElement("li");

            const novoCadastro = `Aparelho: ${aparelho.nome} | Situação: ${aparelho.situacao}`;
            cadastroNovo.textContent = novoCadastro;
            listaCadastro?.appendChild(cadastroNovo);

        aparelho.nome = '';
        aparelho.situacao = '';

      } catch (error) 
      {
        if ((error as Error).message == 'Token expirado')
        {
          toast.warning("Credenciais expiradas. Gerando novo token...");

          try{
            const newToken = await renovarToken();

            if (newToken) 
            {
              toast.success("Token renovado com sucesso!");
            } 
            else 
            {
              throw new Error('Falha ao renovar token');
            }
          }
          catch(error)
          {
            toast.error("Falha ao renovar token: " + (error as Error).message);
            console.log("error.message da funcao: " + (error as Error).message);
            if((error as Error).message == 'Falha ao renovar token')
            {
              router.push('/');
            }
          }
        }
        toast.error("Erro ao cadastrar: " + (error as Error).message);
      }
    } 
    else 
    {
      toast.warning("Preencha todos os campos.");
      //alert('Preencha todos os campos.');
    }
  };

</script>






<style scoped>
.container {
  max-width: 90vh;
  width: 100%; /* Garante que não ultrapasse a largura máxima */
  margin: 0 auto;
  padding: 2vh;
  margin-top: 5vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(122, 45, 45, 0.1);
  box-sizing: border-box;
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1vh;
  font-size: clamp(1.5rem, 5vw, 2rem);
}

.form-group {
  margin-bottom: 9vh;
  margin-top: 0px;
}

label {
  display: block;
  font-weight: 500;
  color: #34495e;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 1.5vh 1vh;
  margin: 0.1vh 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 2vh;
  transition: border-color 0.3s;
}

input[type="text"]:focus,
select:focus,
textarea:focus {
  border-color: #3498db;
  outline: none;
  box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

select {
  height: 5.5vh;
  background-color: white;
  cursor: pointer;
}

button {
  background-color: #3498db;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  margin: 5vh 0;
  width: 100%;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2980b9;
}

textarea {
  resize: vertical;
  min-height: 120px;
}

.cadastros {
  font-weight: 600;
  color: #34495e;
  display: block;
  margin: 20px 0 10px;
}

ul#ListaCadastro {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border-radius: 4px;
  padding: 15px;
  border: 1px solid #eee;
}

ul#ListaCadastro li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

ul#ListaCadastro li:last-child {
  border-bottom: none;
}

/* Espaçamento adicional para melhor organização */
br {
  margin-bottom: 10px;
  display: block;
  content: "";
}
</style>
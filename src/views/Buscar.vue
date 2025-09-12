<template>
  <div class="container">
    <Sair />
    <h2>Busca</h2>
      <div class="form-group">
          <input type="search" id="search" v-model="searchText" placeholder="buscar..." />
      </div>
      
    <ul id="ListaCadastro">
          <!--aqui serão inseridos novos cadastros-->
        <li v-for="aparelho in buscaFiltrada" :key="aparelho.id">
          <label class="campo">
            ID:
            <span class="readonly">{{ aparelho.id }}</span>
          </label>

          <label class="campo">
            Aparelho:
            <input class="info-aparelho" type="text" name="nome" v-model="aparelho.nome" />
          </label>

          <label class="campo">
            Situação:
            <input class="info-aparelho" type="text" name="situacao" v-model="aparelho.situacao"/>
          </label>
        
          <div class="aparelho-imagens">  
            <!-- Ícone de editar -->
            <img 
              src="@/images/edit.png" 
              alt="Editar" 
              class="aparelho-editar"
              :id="`aparelho-${aparelho.id}`"
              @click="confirmaEdicao(aparelho.id)"
            />
            <!-- Ícone de lixeira -->
            <img 
              src="@/images/garbage.png" 
              alt="Excluir" 
              class="aparelho-excluir"
              :id="`aparelho-${aparelho.id}`"
              @click="excluirAparelho(aparelho.id)"
            />
          </div>
        </li>
    </ul>
  </div>
</template>




<script setup lang="ts">// Importações necessárias
import Sair from '../components/Sair.vue'
import { ref, reactive, computed, onMounted } from 'vue';
import { useToast } from "vue-toastification";
import { showConfirmToast } from '@/utils/showConfirmToast'
import { useRouter } from 'vue-router';
import { renovarToken } from '@/utils/renovarToken' // Importa a função de renovar token
const toast = useToast(); // Inicializa o toast para exibir mensagens
const router = useRouter();

//----------------- Filtro -------------------------
const searchText = ref('');//variavel bidirecional para armazenar o termo de busca

// filtrar os resultados com base no termo de busca
const buscaFiltrada = computed(() => {//computed vai executar a função sempre que houver uma mudança no termo de busca ou nos resultados
  const termo = searchText.value.toLowerCase();
  return results.value.filter(aparelho =>
    aparelho.nome.toLowerCase().includes(termo) ||
    aparelho.situacao.toLowerCase().includes(termo) ||
    aparelho.id.toString().includes(termo)
  );
});
//----------------- fim Filtro -------------------------

//construção da estrutura do objeto aparelho
const aparelho = reactive({
    id: 0,
    nome: '',
    situacao: ''
});

//array com todos aparelhos do banco de dados
//foi feito com ref mas poderia ter sido reactive também
//ambos são iguais com dif. que ref suporta qualquer tipo e reactive apenas objetos
const results = ref<Array<{id: number, nome: string, situacao: string}>>([]);


const token = localStorage.getItem('token');
const refreshToken = localStorage.getItem('refreshToken');


// Função para buscar aparelhos
// Essa função faz uma requisição GET para o servidor para buscar todos os aparelhos cadastrados
// e exibe os resultados na lista.
const Buscar = async () => 
{
  try 
  {
    const response = await fetch('http://localhost:3000/api/equipamentos/Allaparelhos', //requisição
    {
      method: 'GET', //método
      headers: 
      {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json' //tipo de conteudo que será enviado (json)
      }
    });

    if (!response.ok) //se deu erro
    {
      const err = await response.json();
      throw new Error(err.error || 'Erro desconhecido');
    }

    const data = await response.json();//resposta do servidor
    
    console.log('Dados recebidos convertidos em json:', data); //exibe no console os dados recebidos
    results.value = data; //armazena os dados recebidos na variável results
  }
  catch (error) 
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
    toast.error("Erro ao buscar aparelhos: " + (error as Error).message);
  }
};




// Função Buscar é chamada quando o componente é montado
// Isso garante que os aparelhos sejam carregados assim que a página for acessada.
// O onMounted é um hook do Vue que executa a função quando o componente é montado
onMounted(() => 
{
  Buscar();// Chama a função Buscar quando o componente é montado
});







//**************Delete*********************** */

//função disparada no evento de clique no ícone de excluir em cada aparelho
//exclui item no banco de dados
const excluirAparelho = async (aparelhoId: number) => 
{
  const resposta = await(showConfirmToast("Deseja excluir este item ?"));

  if (resposta)
  {
    try 
    {
      const response = await fetch(`http://localhost:3000/api/equipamentos/Deletar/${aparelhoId}`, {
        method: 'DELETE', // Método DELETE para excluir o aparelho
        headers: 
        {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Tipo de conteúdo JSON
        }
      });

      console.log('Aparelho excluído com sucesso:', aparelhoId);

      if (!response.ok) 
      {
        const err = await response.json();
        throw new Error(err.error || 'Erro desconhecido');
      }

      // Atualiza a lista de aparelhos após a exclusão
      Buscar();
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
      toast.error('Erro ao excluir aparelho: ' + (error as Error).message);
    }
  }
  else
  {
    console.log("clicou em cancelar");
  }
};




//**************PUT*********************** */

const confirmaEdicao = async (aparelhoId: number) => 
{
  const resposta = await(showConfirmToast("Deseja editar este item ?"));

  if (resposta)
  {
    console.log("clicou em ok");

    const aparelhoEditado = buscaFiltrada.value.find(element => element.id === aparelhoId);//para cada elemento em buscaFiltrada busca o id do item
    if (aparelhoEditado) 
    {
      console.log("Valores editados:", 
      {
        id: aparelhoId,
        nome: aparelhoEditado.nome,
        situacao: aparelhoEditado.situacao
      });

      // Lógica para enviar ao servidor
      try 
      {
        const response = await fetch(`http://localhost:3000/api/equipamentos/Editar/${aparelhoId}`, 
        {
          method: 'PUT', // Método PUT para editar o aparelho
          headers: 
          {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' // Tipo de conteúdo JSON
          },
          body: JSON.stringify //converte javascript para json
          ({
              //conteudo convertido a ser enviado...
              nome: aparelhoEditado.nome,
              situacao: aparelhoEditado.situacao
          })
        });

        if (!response.ok) 
        {
          const err = await response.json();
          throw new Error(err.error || 'Erro desconhecido');
        }

        console.log("editado com sucesso");
        
        //Atualiza dados de aparelhos na tela
        Buscar();
      }
      catch (error) 
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
        toast.error('Erro ao excluir aparelho: ' + (error as Error).message);
      }
    }
      
  }
  else
  {
    console.log("clicou em cancelar");
  }
};

</script>

<style scoped>

.container {
  max-width: 100vh;
  margin: 0 auto;
  padding: 2vh;
  margin-top: 5vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #2c3e50;
  text-align: center;
  margin-bottom: 1vh;
  font-size: 5vh;
}

/*div de pesquisa */
.form-group {
  margin-bottom: 3vh;
}

/*campo de busca */
#search {
  height: 5vh;
  width: 14VW;
  border-radius: 0.3vh;
  margin-left: 2vh;
}





/*ul que compõe itens do banco de dados*/
ul#ListaCadastro {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: white;
  border-radius: 0.5vh;
  padding: 4vw;
  border: 1px solid #eee;
}

/*Itens do banco de dados */
ul#ListaCadastro li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;

  display: flex; /* Ativa flexbox */
  justify-content: space-between; /* Espaço entre texto e ícone */
  align-items: center; /* Alinha verticalmente */
}

/* Estilo dos rótulos */
label {
  color: #333;
}

/*input de informações do aparelho */
.info-aparelho {
  height: 5vh;
  width: 70%;
  border-radius: 0.3vh;
  margin-left: 2vh;
}

/* Icone excluir e editar */
.aparelho-excluir, .aparelho-editar{
  width: 3vh !important;
  height: 3vh !important;
  margin-left: 2vh; /* Espaçamento entre texto e ícones */
  cursor: pointer;

  transition: all 0.5s ease;
  filter: invert(0%);/*começa com cor original*/
}

/* Efeito quando o mouse passa por cima */
.aparelho-excluir:hover, .aparelho-editar:hover {
  transform: scale(1.1); /* Aumenta o tamanho */
  filter: invert(27%) sepia(51%) saturate(2878%) hue-rotate(346deg) brightness(104%) contrast(97%); /* Torna vermelho */
}
</style>

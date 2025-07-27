//*NÃO ESTÁ SENDO UTILIZADO NO MOMENTO POIS ESTÁ SENDO FEITO O FETCH QUE SE COMUNICA COM O BACKEND DIRETAMENTE NAS PAGINAS DE CASTRAR E BUSCAR.VUE

// import axios from 'axios';
// import type { Aparelho } from '@/types';

// const api = axios.create({
//   baseURL: 'http://localhost:3000/api/equipamentos', // ajuste conforme necessário
// });

// export default {
//   // Métodos para aparelhos
//   getAparelhos() {
//     return api.get('/Allaparelhos');
//   },
//   cadastrarAparelho(aparelho:Aparelho) {
//     return api.post('/Cadastro', aparelho);
//   },
//   editarAparelho(id:number, aparelho:Aparelho) {
//     return api.put(`/Editar/${id}`, aparelho);
//   },
//   deletarAparelho(id:number) {
//     return api.delete(`/Deletar/${id}`);
//   }
// };
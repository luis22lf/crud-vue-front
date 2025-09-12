export const renovarToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch('http://localhost:3000/api/users/RenovarToken', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Falha ao renovar token');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); // Armazena o novo token
  return data.token; // Retorna o novo token
};
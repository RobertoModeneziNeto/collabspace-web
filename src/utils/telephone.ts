function formatarTelefone(telefone: string): string {
  // Remove caracteres não numéricos
  const telefoneNumerico = telefone.replace(/\D/g, "");

  // Verifica se o número de telefone possui a quantidade correta de dígitos
  if (telefoneNumerico.length !== 11) {
    // Número de telefone inválido, retorna o valor original
    return telefone;
  }

  // Formata o número de telefone com o padrão (XX) 9XXXX-XXXX
  const telefoneFormatado = `(${telefoneNumerico.substring(
    0,
    2,
  )}) ${telefoneNumerico.substring(2, 3)}${telefoneNumerico.substring(
    3,
    7,
  )}-${telefoneNumerico.substring(7)}`;

  return telefoneFormatado;
}

export { formatarTelefone };

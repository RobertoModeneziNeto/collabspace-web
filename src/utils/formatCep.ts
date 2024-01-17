function formatarCEP(cep: string): string {
  // Remove caracteres não numéricos
  const cepNumerico = cep.replace(/\D/g, "");

  // Verifica se o CEP possui a quantidade correta de dígitos
  if (cepNumerico.length !== 8) {
    // CEP inválido, retorna o valor original
    return cep;
  }

  // Formata o CEP com o padrão XXXXX-XXX
  const cepFormatado = `${cepNumerico.substring(0, 5)}-${cepNumerico.substring(
    5,
  )}`;

  return cepFormatado;
}

export { formatarCEP };

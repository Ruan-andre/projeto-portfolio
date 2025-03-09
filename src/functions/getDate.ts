const GetDate = (
  initialDate: Date,
  type: "Y" | "M" | "D" | "FULL",
  birthDay?: boolean
): string => {
  const hoje = new Date();
  let response = "";

  switch (type) {
    case "Y":
      let idade = hoje.getFullYear() - initialDate.getFullYear();

      // Verificar se o aniversário já passou no ano atual
      const mesNascimento = initialDate.getMonth();
      const diaNascimento = initialDate.getDate();
      const mesAtual = hoje.getMonth();
      const diaAtual = hoje.getDate();

      if (birthDay) {
        if (
          mesAtual < mesNascimento ||
          (mesAtual === mesNascimento && diaAtual < diaNascimento)
        ) {
          idade--;
        }
      }

      response = idade.toString();
      break;

    case "M":
      let diffMeses =
        (hoje.getFullYear() - initialDate.getFullYear()) * 12 +
        (hoje.getMonth() - initialDate.getMonth());

      if (hoje.getDate() < initialDate.getDate()) {
        diffMeses--;
      }

      response = diffMeses.toString();
      break;

    case "D":
      const diffMs = hoje.getTime() - initialDate.getTime();
      const diffDias = Math.floor(diffMs / (1000 * 3600 * 24)); // Convertendo de milissegundos para dias
      response = diffDias.toString();
      break;

    case "FULL":
      response = hoje.toISOString().split("T")[0];
      break;

    default:
      response = "Invalid type";
      break;
  }

  return response;
};

export default GetDate;

export const getStatusDescription = (status: string) => {
  switch (status) {
    case "PENDING":
      return "Pendente";
    case "ACCEPTED":
      return "Aceita";
    case "REFUSED":
      return "Recusada";
    case "CANCELED":
      return "Cancelada";
    case "COMPLETED":
      return "Concluída";
    case "IN_PROGRESS":
      return "Em andamento";
    default:
      return "Status desconhecido";
  }
};
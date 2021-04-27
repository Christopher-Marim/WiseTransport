export default VeiculesSchema = {
    name: "Veicules",
    primaryKey: "id",
    properties: {
      id: { type: "int", indexed: true },
      tipoVeiculo: "string",
      placa: "string"
    },
  };
  
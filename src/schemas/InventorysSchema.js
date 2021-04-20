export default InventorysSchema = {
  name: "Inventorys",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    nome: "string",
    dateAt: "date",
    check:{ type: "bool",optional:true},
    idGet:{type:"int" ,indexed:true, optional: true},
    itens: "ItensInventory[]",
    qtdItens:{type:"int" ,indexed:true, optional: true},
  },
};

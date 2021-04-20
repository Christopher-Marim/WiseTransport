export default ItensInventorySchema = {
  name: 'ItensInventory',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    idCod: 'int',
    cod: 'string',
    qtd: 'string',
    desc: 'string',
    value: 'string?',
    info1: 'string?',
    info2: 'string?',
    info3: 'string?',
    info4: 'string?',
    system_user_id: 'string',
    system_unit_id: 'string',
  },
};

export default StorageProducts = {
  name: 'StorageProducts',
  primaryKey: 'id',
  properties: {
    id: {type: 'int', indexed: true},
    cod: 'string',
    desc: 'string',
    info1: 'string?',
    info2: 'string?',
    info3: 'string?',
    info4: 'string?',
    system_user_id: 'string',
    system_unit_id: 'string',
  },
};

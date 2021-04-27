export default JourneySchema = {
  name: "Journey",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    operator: "string",
    dateAt: "date",
    hours:"string",
    veicule:"string",
    check:{ type: "bool",optional:true},
    idGet:{type:"int" ,indexed:true, optional: true},
    occurrences: "Occurrence[]",
  },
};

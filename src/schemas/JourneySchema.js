export default JourneySchema = {
  name: "Journey",
  primaryKey: "id",
  properties: {
    id: { type: "int", indexed: true },
    operator: "string",
    dateStart: "date",
    dateFinish: "date?",
    veicule_id:"int",
    kmInicial:'string',
    kmFinal:'string?',
    latitudeInicial:'int',
    latitudeFinal:'int?',
    longitudeInicial:'int',
    longitudeFinal:'int?',
    check:{ type: "bool",optional:true},
    systemUnitId:'int',
    systemUserId:'int',
    occurrences: "Occurrence[]",
  },
};

export default OccurrenceListSchema = {
    name: "OccurrenceList",
    primaryKey: "id",
    properties: {
      id: { type: "int", indexed: true },
      occurrence_id:'int',
      occurrence: "string",
      dataInicio:'date',
      dataFim:'date?',
      latitude:'string',
      longitude:'string',
      peso: "int?"
    },
  };
  
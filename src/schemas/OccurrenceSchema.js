export default OccurrenceSchema = {
    name: "Occurrence",
    primaryKey: "id",
    properties: {
      id: { type: "int", indexed: true },
      occurrence: "string",
      peso: "int?"
    },
  };
  
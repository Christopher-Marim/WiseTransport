

const inicialState = {
  noticias: [],
};

const reducer = (state = inicialState, action) => {

  switch (action.type) {
    case "ADD_NOTICIA":
      const noticia = {
        id: action.payload[0],
        subject: action.payload[1],
        message: action.payload[2],
        data: action.payload[3],
        lido: action.payload[4]
      };
      let indexCollectToRemove = state.noticias.find(
        (x) => x.id == action.payload[0]
      )
      
      return (
        {
        ...state,
        noticias: [...state.noticias, noticia],
      });

      case "CLEAN_NOTICIAS":
        state.noticias = []
      return {...state}

    default:
      return state;
  }
};

export default reducer;

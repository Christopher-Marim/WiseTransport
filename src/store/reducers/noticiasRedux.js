

const inicialState = {
  refresh: false,
  currentID: null,
  currentIDitem: null,
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
     {/* 
    case "DEL_INVENTORY":
      let indexCollectToRemove = state.inventorys.findIndex(
        (x) => x.id == action.payload[0]
      );
      state.inventorys.splice(indexCollectToRemove, 1);
      return { ...state, inventorys: [...state.inventorys]};

    case "EDIT_INVENTORY":
      return {
        ...state,
        inventorys: [
          ...state.inventorys.map((item, index) => {
            if (index === action.payload[0]) {
              return {
                ...item,
                nome: action.payload[1],
              };
            }
            return item;
          }),
        ],
      };

    case "CURRENT_ID_INVENTORY":
      
      return {
        ...state,
        currentID: action.payload[0],
      };
    case "CHANGE_STATUS_INVENTORY":
      
      return {
        ...state,
        changeInventory: action.payload[0],
      };
    case "CURRENT_ID_ITEM_INVENTORY":
      
      return {
        ...state,
        currentIDitem: action.payload[0],
      };
    case "ADD_ITEM_INVENTORY":
        const item = {
          id: Math.random(),
          numberCollect: action.payload[1],
          numberEquipament: action.payload[2],
          element: action.payload[3],
          value:action.payload[4]
        };
        let auxinventorys = [...state.inventorys];
        auxinventorys[state.currentID].itens.push(item)

        return {
          ...state,
          inventorys: [...auxinventorys] 
        };


    case "REFRESH_INVENTORY":
      return {
        ...state,
        refresh: action.payload[0],
      };
      case "DEL_ITEM_INVENTORY":
        let indexItemToRemove = state.inventorys[state.currentID].itens.findIndex(
          (x) => x.id == action.payload[0]
        );
       let delItem = state.inventorys[state.currentID].itens.splice(indexItemToRemove, 1);
        return { ...state,  ...state.inventorys[state.currentID], itens: [...delItem] };
    case "EDT_ITEM_INVENTORY":
     state.inventorys[state.currentID].itens[state.currentIDitem].value = action.payload;
        return { ...state, inventorys: [...state.inventorys] };*/}

    default:
      return state;
  }
};

export default reducer;

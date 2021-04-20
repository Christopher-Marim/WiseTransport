const inicialState = {
  CheckBoxCollect: false,
  CheckBoxEquipament: false,
  CheckBoxElement: false,
  barcode:null,
  callback:false


};

const reducer = (state = inicialState, action) => {
  switch (action.type) {
    case 'CHECKBOX_COLLECT_TRUE':
      return {
        ...state,
        CheckBoxCollect: true,
      };
    case 'CHECKBOX_COLLECT_FALSE':
      return {
        ...state,
        CheckBoxCollect: false,
      };
      case 'CHECKBOX_EQUIPAMENT_TRUE':
      return {
        ...state,
        CheckBoxEquipament: true,
      };
    case 'CHECKBOX_EQUIPAMENT_FALSE':
      return {
        ...state,
        CheckBoxEquipament: false,
      };
      case 'CHECKBOX_ELEMENT_TRUE':
      return {
        ...state,
        CheckBoxElement: true,
      };
    case 'CHECKBOX_ELEMENT_FALSE':
      return {
        ...state,
        CheckBoxElement: false,
      };
      case 'SET_BARCODE':
      return {
        ...state,
        barcode: action.payload[0],
      };
    case 'CALLBACK_CONDITION_TRUE':
      return {
        ...state,
        callback: true,
      };
    case 'CALLBACK_CONDITION_FALSE':
      return {
        ...state,
        callback: false,
      };
  
        

    default:
      return state;
  }
};

export default reducer;

const inicialState = {
  showModalADDCOLLECT: false,
  showModalADDITEM: false,
  showModalEDTCOLLECT: false,
  showModalEDTITEM: false,
  showModalELLIPSIS: false,
  showModalFILTERCOLLECT: false,
  showModalEDTAPI:false,
  //inventory
  showModalADDINVENTORY: false,
  showModalADDITEM_INVENTORY: false,
  showModalEDTINVENTORY: false,
  showModalEDTITEM_INVENTORY: false,
  showModalELLIPSIS_INVENTORY: false,
  showModalFILTERINVENTORY: false,

};

const reducer = (state = inicialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL_ADDCOLLECT_ON':
      return {
        ...state,
        showModalADDCOLLECT: true,
      };
    case 'SHOW_MODAL_ADDCOLLECT_OFF':
      return {
        ...state,
        showModalADDCOLLECT: false,
      };
    case 'SHOW_MODAL_EDTCOLLECT_ON':
      return {
        ...state,
        showModalEDTCOLLECT: true,
      };
    case 'SHOW_MODAL_EDTCOLLECT_OFF':
      return {
        ...state,
        showModalEDTCOLLECT: false,
      };
    case 'SHOW_MODAL_EDTITEM_ON':
      return {
        ...state,
        showModalEDTITEM: true,
      };
    case 'SHOW_MODAL_EDTITEM_OFF':
      return {
        ...state,
        showModalEDTITEM: false,
      };
    case 'SHOW_MODAL_EDTAPI_ON':
      return {
        ...state,
        showModalEDTAPI: true,
      };
    case 'SHOW_MODAL_EDTAPI_OFF':
      return {
        ...state,
        showModalEDTAPI: false,
      };
      case 'SHOW_MODAL_ADDITEM_ON':
        return {
          ...state,
          showModalADDITEM: true,
        };
      case 'SHOW_MODAL_ADDITEM_OFF':
        return {
          ...state,
          showModalADDITEM: false,
        };
      case 'SHOW_MODAL_ELLIPSIS_ON':
        return {
          ...state,
          showModalELLIPSIS: true,
        };
      case 'SHOW_MODAL_ELLIPSIS_OFF':
        return {
          ...state,
          showModalELLIPSIS: false,
        };
      case 'SHOW_MODAL_FILTER_COLLECT_ON':
        return {
          ...state,
          showModalFILTERCOLLECT: true,
        };
      case 'SHOW_MODAL_FILTER_COLLECT_OFF':
        return {
          ...state,
          showModalFILTERCOLLECT: false,
        };
//////////////////////////////////////////INVENTORY
        case 'SHOW_MODAL_ADDINVENTORY_ON':
      return {
        ...state,
        showModalADDINVENTORY: true,
      };
    case 'SHOW_MODAL_ADDINVENTORY_OFF':
      return {
        ...state,
        showModalADDINVENTORY: false,
      };
    case 'SHOW_MODAL_EDTINVENTORY_ON':
      return {
        ...state,
        showModalEDTINVENTORY: true,
      };
    case 'SHOW_MODAL_EDTINVENTORY_OFF':
      return {
        ...state,
        showModalEDTINVENTORY: false,
      };
    case 'SHOW_MODAL_EDTITEM_INVENTORY_ON':
      return {
        ...state,
        showModalEDTITEM_INVENTORY: true,
      };
    case 'SHOW_MODAL_EDTITEM_INVENTORY_OFF':
      return {
        ...state,
        showModalEDTITEM_INVENTORY: false,
      };
    
      case 'SHOW_MODAL_ADDITEM_INVENTORY_ON':
        return {
          ...state,
          showModalADDITEM_INVENTORY: true,
        };
      case 'SHOW_MODAL_ADDITEM_INVENTORY_OFF':
        return {
          ...state,
          showModalADDITEM_INVENTORY: false,
        };
      case 'SHOW_MODAL_ELLIPSIS_INVENTORY_ON':
        return {
          ...state,
          showModalELLIPSIS_INVENTORY: true,
        };
      case 'SHOW_MODAL_ELLIPSIS_INVENTORY_OFF':
        return {
          ...state,
          showModalELLIPSIS_INVENTORY: false,
        };
      case 'SHOW_MODAL_FILTER_INVENTORY_ON':
        return {
          ...state,
          showModalFILTERINVENTORY: true,
        };
      case 'SHOW_MODAL_FILTER_INVENTORY_OFF':
        return {
          ...state,
          showModalFILTERINVENTORY: false,
        };
        

    default:
      return state;
  }
};

export default reducer;

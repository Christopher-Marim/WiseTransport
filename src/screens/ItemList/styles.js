import commonStyles from '../../commonStyles';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#ebebed'
      },
      headerView: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: commonStyles.color.InventoryPrincipal,
        alignItems: 'center',
        justifyContent: 'space-between',
        height:Dimensions.get('window').height*0.08
      },
      itemList: {
        flex: 8,
        padding: 5,
      },
      text: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
        fontSize: 25,
        color: commonStyles.color.secondary,
        borderBottomWidth: 2,
        borderBottomColor: '#FFF',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
      },
      buttonGoBack: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonOpenEllipsis: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      addButton: {
        position: 'absolute',
        right: 30,
        bottom: 80,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonStyles.color.InventoryPrincipal,
      },
      addButtonCenter: {
        position: 'absolute',
        width: 200,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonStyles.color.InventoryPrincipal,
      },
      textButton: {
        fontSize: 20,
        fontWeight: commonStyles.fontWeight,
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.color.secondary,
      },
      textBusca: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
      },
      textInputQtd: {
        backgroundColor: 'white',
        width: 40,
        borderRadius: 5,
      },
      textInputCod: {
        borderRadius: 5,
        backgroundColor: 'white',
        width: '100%',
        marginRight: 15,
      },
      containerAdd: {
        backgroundColor: '#cdc8cf',
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
}})
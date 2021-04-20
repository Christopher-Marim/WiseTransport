import commonStyles from '../../commonStyles';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e3e3e3',
      },
      headerView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: commonStyles.color.InventoryPrincipal,
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      Text: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
        fontSize: 25,
        color: 'white',
      },
      TextInformation: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
        fontSize: 18,
        marginBottom: 5,
      },
    
      addButtonCenter: {
        position: 'absolute',
        width: Dimensions.get('window').width / 1.5,
        height: 50,
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: commonStyles.color.InventoryPrincipal,
      },
      Button: {
        height: 50,
        width: 100,
        backgroundColor: commonStyles.color.InventoryPrincipal,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal:10,
        padding:5
      },
      TextButton: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
        fontSize: 18,
        color: 'white',
      },
})
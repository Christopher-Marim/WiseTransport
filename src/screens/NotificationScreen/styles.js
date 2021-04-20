import commonStyles from '../../commonStyles';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    headerView: {
        flexDirection: 'row',
        paddingHorizontal:10,
        alignItems: 'center',
        height:Dimensions.get('window').height*0.1
      },
      buttonOpenDrawer: {
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
      },
      Text: {
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
        fontSize: 25,
        color: commonStyles.color.headers,
        marginRight:90,
        marginLeft:10
      },
      collectList: {
        padding: 12,
      },
})
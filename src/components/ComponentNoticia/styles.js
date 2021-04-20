import commonStyles from '../../commonStyles';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    Button:{
        padding:10, 
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:10,
        borderColor:commonStyles.color.contrastante,
        borderWidth:1.5
    },
    titulo:{
        fontSize:15,
        fontWeight:"bold",
        width:300
    },
    subText:{
        padding:10,
        color:'grey',
        width:300,
        fontSize:15
    },
    containerLogo:{
        flexDirection: 'row',
        padding:5,
        alignItems:'center'
    },
    containerTexts:{
        paddingHorizontal:10,
    },
    timeText:{
        color:'grey'
    },
    left1: {
        backgroundColor: '#4287f5',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10,
        borderWidth:1.5,
        borderColor:commonStyles.color.contrastante,
        flex:1
      },
     
      containerSwipeable: {
        flex:1
      },
      right: {
        backgroundColor: '#bf1f1f',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingHorizontal: 20,
        borderRadius: 0,
        borderBottomRightRadius: 10,
        borderTopRightRadius: 10,
        flex:1,
      },
})
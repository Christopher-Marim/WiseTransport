import {StyleSheet} from 'react-native';
import commonStyles from "../../commonStyles";


export default  StyleSheet.create({
    container: {
        flex:11,
        flexDirection: 'column',
        backgroundColor: '#fff',        
        alignItems: 'stretch',
        justifyContent: 'flex-start',
      },
      
      action:{
        backgroundColor:'white',
        paddingHorizontal:15,
        height: 55,
        width:'100%',
        justifyContent:'center',
        alignItems:"baseline",
        borderBottomWidth:2,
        borderBottomColor:'#D3D4D8',
        
      },
      actionText:{
        paddingLeft:20,
        color:'#9c9c9c',
        fontSize:15,
        fontFamily: commonStyles.fontFamily,
        fontWeight: commonStyles.fontWeight,
      },
      buttonGoBack: {
        
        paddingRight:35
      },
    
      headerView: {
        flex: 1,
        flexDirection:'row',
        paddingHorizontal:20,
        backgroundColor: commonStyles.color.principal,
        alignItems: "center",
      },
      text: {
        fontSize: 25,
        color: commonStyles.color.secondary,

      },
})
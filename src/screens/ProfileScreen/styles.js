import commonStyles from '../../commonStyles';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    header: {
        flex:1,
        paddingTop: 30,
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: commonStyles.color.principal,
        
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: 'white',
        marginBottom: 10,
        alignSelf: 'center',
        position: 'absolute',
        marginTop: 35,
        backgroundColor:commonStyles.color.principal
      },
      name: {
        fontSize: 22,
        color: '#FFFFFF',
        fontWeight: '600',
      },
      body: {
        flex:8,
        marginTop: 80,
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
      },
      name: {
        fontSize: 28,
        color: '#696969',
        fontWeight: '600',
      },
    
      buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: '#222222',
      },
      buttonGoBack: {
        justifyContent: 'center',
        paddingBottom:25
      },
      
    
      headerView: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 20,
        backgroundColor: commonStyles.color.principal,
        alignItems: 'center',
      },
      text: {
        fontSize: 25,
        color: commonStyles.color.secondary,
      },
      containerInfos: {
        flex:9,
        paddingTop: 40,
        paddingHorizontal: 50,
      },
      textInfo: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'arial',
        color:'black',
    
      },
      containerButtons:{
      paddingTop:30,
        },
        button:{
          flexDirection:'row',
          alignItems: 'center'
        },
        texts:{
          padding:10
        },
        subText:{
          fontWeight:'bold'
        },
        textSalvar:{
          fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'arial',
        color:commonStyles.color.secondary,
        },
        buttonSalvar:{ 
          marginHorizontal:50,padding:10, marginTop:20, justifyContent:'center', alignItems:'center', borderWidth:2, borderRadius:10, backgroundColor:commonStyles.color.principal 
        }
})
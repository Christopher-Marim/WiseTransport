import {Dimensions, StyleSheet} from 'react-native';
import commonStyles from '../../../commonStyles';

export default StyleSheet.create({
  overlay: {
    width: '100%',
    flex: 1,
  },
  container: {
    maxHeight:"80%",
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: commonStyles.color.contrastante,
  },
  titulo: {
    paddingTop:20,
    fontSize: 20,
    fontFamily: commonStyles.fontFamily,
    fontWeight:commonStyles.fontWeight,
    marginHorizontal:20,
    
  },
  subText:{
    fontSize:16,
    fontFamily:commonStyles.fontFamily,
    padding:10,

  },
  containerSubText:{
    borderWidth:1,
    borderColor:commonStyles.color.contrastante,
    borderRadius:10,
    margin:10,
    maxHeight:'80%'
  },
  button:{
    width:100,
    height:50,
    backgroundColor:commonStyles.color.contrastante,
    borderRadius:20,
    justifyContent:'center',
    alignItems:'center',
    
  },
  textButton:{
    color:'white',
    fontSize:15,
    fontFamily:commonStyles.fontFamily,
    fontWeight:commonStyles.fontWeight,
  },
  containerButtons:{
    alignItems:'flex-end',
    paddingHorizontal:10,
    paddingBottom:10
  },
  dateAndHours:{
    color:'grey',
    marginHorizontal:20,
  },
  buttonClose:{
    backgroundColor:'white',
    width:40,
    height:40,
    alignItems:'flex-end',
    justifyContent:'center',
    
  }
});

import commonStyles from '../../commonStyles';

import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.color.page,
  },
  container2: {
    flex: 1,
    backgroundColor: '#ebebed',
    padding:20
  },
  headerView: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    alignItems: 'center',
    height:Dimensions.get('window').height*0.1
  },
  collectList: {
    padding: 12,
    
  },
  Text: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: 25,
    color: commonStyles.color.headers,
    paddingLeft:10
  },
  TextButtonCenter: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: 25,
    color: commonStyles.color.headers,
    paddingLeft:10
  },
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonStyles.color.headers,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  addButtonCenter: {
    position: 'absolute',
    width: Dimensions.get('window').width / 1.5,
    height: 50,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: commonStyles.color.page,
    borderWidth:2,
    borderColor:commonStyles.color.headers,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  buttonOpenDrawer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonFilter: {
    padding: 5,
    borderRadius:5,
    position:'absolute',
    right:10,
  },
  subTitle:{
    fontSize:20,
    fontWeight:'bold'
  },
  group:{
    padding:10,
    paddingHorizontal:15,
    borderRadius:10,
    backgroundColor:'#FFF'
  },
  wrapper:{
    marginTop:10,
    padding:10,
    borderRadius:10,
    borderWidth:3,
    borderColor:commonStyles.color.headers
  },
  buttonInfos:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center', 
  },
  TextOccurrence:{
    fontSize:15,
    fontWeight:'bold',
    color:commonStyles.color.principal,
    fontFamily:commonStyles.fontFamily
  },
  TextButtonFinish:{
    fontSize:15
  }
});

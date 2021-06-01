import commonStyles from '../../commonStyles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.color.page,
  },
  container2: {
    flex: 1,
    backgroundColor: '#dbdbdb',
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
    fontSize: hp('3%'),
    color: commonStyles.color.headers,
    paddingLeft:10
  },
  TextButtonCenter: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: hp('3%'),
    color: commonStyles.color.headers,
    paddingLeft:10
  },
  addButtonCenter: {
    position: 'absolute',
    width: wp('70%'),
    height: hp('6%'),
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
    fontSize:hp('2.4%'),
    fontWeight:'bold'
  },
  group:{
    padding:hp('1%'),
    paddingHorizontal:hp('1.5%'),
    borderRadius:10,
    backgroundColor:'#FFF',
    borderWidth:2
  },
  wrapper:{
    marginTop:5,
    borderRadius:10,
    borderColor:commonStyles.color.headers
  },
  buttonInfos:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center', 
  },
  TextOccurrence:{
    borderBottomWidth:1,
    borderBottomColor:'grey',
    fontSize:hp('1.8%'),
    fontWeight:'bold',
    color:commonStyles.color.principal,
    fontFamily:commonStyles.fontFamily
  },
  TextButtonFinish:{
    fontSize:hp('1.8%')
  }
});

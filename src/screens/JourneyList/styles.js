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
 
  Text: {
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    fontSize: hp('3%'),
    color: commonStyles.color.headers,
    paddingLeft:10
  },
  buttonOpenDrawer: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
 
  buttonInfos:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center', 
  },
  TextOccurrence:{
    paddingBottom:3,
    borderBottomWidth:1,
    borderBottomColor:'grey',
    fontSize: hp('1.8%'),
    fontWeight:'bold',
    color:commonStyles.color.principal,
    fontFamily:commonStyles.fontFamily,
  },
  
  buttonPost:{
    position:'absolute',
    bottom:0,
    right:-5,
    borderWidth:1.3,
    padding:5,
    paddingHorizontal:10,
    borderRadius:5,
    borderColor:'#b50000'
  }
});

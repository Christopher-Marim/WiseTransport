import commonStyles from '../../commonStyles';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
  header: {
    flex: 1,
    paddingTop: 30,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: commonStyles.color.principal,
  },
  avatar: {
    width: hp('15.6%'),
    height: hp('15.6%'),
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 35,
    backgroundColor: commonStyles.color.principal,
  },
  body: {
    flex: 8,
    marginTop: 80,
  },
  bodyContent: {
    flex: 1,
    alignItems: 'center',
    padding: 30,
  },
  name: {
    fontSize: hp('3.4%'),
    color: '#696969',
    fontWeight: '600',
  },

  buttonContainer: {
    marginTop: 10,
    height: hp('5.4%'),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: wp('58.95'),
    borderRadius: 30,
    backgroundColor: '#222222',
  },
  buttonGoBack: {
    justifyContent: 'center',
    paddingBottom: 25,
  },

  headerView: {
    flex: 1,
    flexDirection: 'row',
    paddingHorizontal: 20,
    backgroundColor: commonStyles.color.principal,
    alignItems: 'center',
  },
  text: {
    fontSize: hp('3%'),
    color: commonStyles.color.secondary,
  },
  containerInfos: {
    flex: 9,
    paddingTop: hp('4%'),
    paddingHorizontal: 50,
  },
  textInfo: {
    fontSize: hp('2.36%'),
    fontWeight: 'bold',
    fontFamily: 'arial',
    color: 'black',
  },
  containerButtons: {
    paddingTop:hp('3%'),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texts: {
    padding: hp('1.5%'),
  },
  subText: {
    fontWeight: 'bold',
  },
  textSalvar: {
    fontSize: hp('2.36%'),
    fontWeight: 'bold',
    fontFamily: 'arial',
    color: commonStyles.color.secondary,
  },
  buttonSalvar: {
    marginHorizontal: 50,
    padding: hp('1%'),
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 10,
    backgroundColor: commonStyles.color.principal,
  },
});

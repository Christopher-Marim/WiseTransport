import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#001e42',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    justifyContent:'center',
    backgroundColor: '#FFF',
    marginBottom: 15,
    color: '#222',
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#055c82',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  submitText: {
    color: '#FFF',
    fontSize: 18,
  },
  btnSolicit: {
    marginTop: 10,
  },
  solicitText: {
    color: '#FFF',
    borderBottomWidth:1,
    borderColor:'white'
  },
  textInputSenha:{
    flexDirection:'row'
  },
  buttonEye:{
    position:'absolute',
    right:7,
  }
});

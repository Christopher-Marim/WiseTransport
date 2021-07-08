import {Dimensions, StyleSheet} from 'react-native';
import commonStyles from '../../../commonStyles';

export default StyleSheet.create({
  overlay: {
    width: '100%',
    flex: 1,
  },
  container: {
    maxHeight: '80%',
    backgroundColor: 'white',
    width: '95%',
    borderRadius: 10,
    padding: 5,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: commonStyles.color.contrastante,
  },
  titulo: {
    paddingTop: 10,
    marginRight:30,
    fontSize: 20,
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    borderBottomWidth: 1,
  },
  subtitulo: {
    paddingTop: 10,
    marginRight:30,
    fontSize: 18,
    fontFamily: commonStyles.fontFamily,
    fontWeight: commonStyles.fontWeight,
    
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
    top: 5,
  },
});

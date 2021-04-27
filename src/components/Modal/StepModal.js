import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import Modal from 'react-native-modal';
import Carousel from 'react-native-snap-carousel';

import PageControl from 'react-native-page-control';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../screens/LoginScreen/styles';
import commonStyles from '../../commonStyles';

const {width, height} = Dimensions.get('window');

export default class StepModal extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage: 0, isVisible: props.statusModal};
  }

  _renderNextButton() {
    const nextIndex = this.state.currentPage + 1;
    return (
      <View
        style={{
          marginRight: 10,
        }}>
        <TouchableOpacity
          disabled={!this.props.next}
          style={[customStyles.nextButton, !this.props.next&&{backgroundColor:'grey'}]}
          onPress={() => {
            this.setState({currentPage: nextIndex});
            this.carousel.snapToItem(nextIndex);
            this.props.callback();
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            {' '}
            Próximo{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderBackButton() {
    const nextIndex = this.state.currentPage - 1;
    return (
      <View
        style={{
          marginLeft: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.setState({currentPage: nextIndex});
            this.carousel.snapToItem(nextIndex);
          }}>
          <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 16}}>
            {' '}
            Voltar{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderFinishButton() {
    return (
      <View
        style={{
          marginRight: 10,
        }}>
        <TouchableOpacity
          style={{backgroundColor: '#001e42', borderRadius: 6, padding: 5}}
          s
          onPress={() => {
            this.props.closemodal();
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
            {' '}
            Iniciar Jornada{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderSkipButton() {
    return (
      <View
        style={{
          marginLeft: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            this.props.closemodal();
          }}>
          <Text style={{color: 'grey', fontWeight: 'bold', fontSize: 14}}>
            {' '}
            Skip{' '}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  isLastStep() {
    return this.props.stepComponents.length - 1 === this.state.currentPage;
  }

  changeIndex = index => {
    this.setState({currentPage: index});
  };

  render() {
    let stepComponents = this.props.stepComponents;

    return (
      <View>
        <Modal isVisible={this.state.isVisible}>
          <ScrollView style={customStyles.modal}>
            <View
              style={{
                flex: 1,
                marginTop: 17,
                backgroundColor: '#ffffff',
                marginLeft: 10,
                marginRight: 10,
                alignItems: 'center',
                justifyContent: 'center',
                height: height / 1.22,
              }}>
              <TouchableOpacity
                style={customStyles.buttonClose}
                onPress={() => {
                  this.props.closemodal();
                }}>
                <MaterialCommunityIcons name="close-box-outline" size={30} />
              </TouchableOpacity>
              <Text style={customStyles.title}>Nova Jornada</Text>
              <Carousel
                data={stepComponents}
                renderItem={({item}) => item}
                itemWidth={width / 1.2}
                sliderWidth={width / 1.2}
                scrollEnabled={false}
                ref={ref => (this.carousel = ref)}
                onSnapToItem={this.changeIndex}
              />
              <PageControl
                numberOfPages={stepComponents.length}
                currentPage={this.state.currentPage}
                hidesForSinglePage
                pageIndicatorTintColor="#d3d3d3"
                currentPageIndicatorTintColor="#001e42"
                indicatorStyle={{borderRadius: 7}}
                currentIndicatorStyle={{borderRadius: 5}}
                indicatorSize={{width: 13, height: 13}}
                onPageIndicatorPress={this.onItemTap}
              />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              {this.isLastStep() ? this._renderBackButton() : <View />}

              {this.isLastStep()
                ? this._renderFinishButton()
                : this._renderNextButton()}
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const customStyles = StyleSheet.create({
  centerAlignDiv: {
    // flex:1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  card: {
    width: 145,
    height: 138,
    marginTop: 30,
    marginBottom: 30,
    // paddingBottom:30,
    // paddingTop:30,
    backgroundColor: '#25355b',
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#596582',
    borderRadius: 4,
  },
  notificationText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 16,
    color: '#ffffff',
  },
  blueColorText: {
    color: '#435270',
  },
  circularImage: {
    height: 36,
    width: 36,
    borderRadius: 18,
  },
  button: {
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#60bca5',
    paddingTop: 13,
    paddingBottom: 13,
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    backgroundColor: 'transparent',
  },
  infoBox: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 18,
  },
  itemView: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 5,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
    flexDirection: 'row',
    borderColor: '#ececec',
    borderWidth: 1,
  },
  itemViewSelected: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 5,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#d0021b',
  },
  item: {
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
    borderColor: '#ececec',
    borderWidth: 1,
  },
  itemSelected: {
    backgroundColor: '#ffffff',
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    borderRadius: 4,
    marginLeft: 12,
    marginRight: 12,
    borderColor: '#d0021b',
    borderWidth: 1,
  },
  itemTextIndent: {
    textAlign: 'left',
    marginLeft: 10,
  },
  itemText: {
    textAlign: 'left',
    marginLeft: 15,
  },
  modal: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingBottom: 10,
    paddingTop: 10,
    height: '100%',
    width: '100%',
  },
  buttonClose: {
    height: 35,
    width: 35,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: -10,
    right: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: commonStyles.color.headers,
  },
  nextButton: {
    backgroundColor: '#001e42',
    borderRadius: 6,
    padding: 5,
  },
});

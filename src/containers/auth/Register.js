'use strict';
import React, { Component } from 'react';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

import ButtonComponent from 'react-native-button-component';

import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  LayoutAnimation
} from 'react-native';

import { Input, Button } from './../../components/common';

const dismissKeyboard = require('dismissKeyboard')

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      buttonState: 'signUp'
    };

    this.buttonStates = {
      signUp: {
        text: 'SIGN UP',
        onPress: () => {
          this.setState({ buttonState: 'loading' });
          this.processRegister();
        },
      },
      loading: {
        spinner: true,
        text: 'SIGNING USER UP'
      }
    };
  }

  componentWillReceiveProps(nextProps) {
    this.processAuth(nextProps);
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  processRegister() {
    const { email, password } = this.state;
    this.props.registerUser(email, password);
  }

  processAuth(props) {
    if(props.auth.user != null) {
      if(props.auth.user.uid) {
        console.log('Register successful')
        this.setState({ email: '', password: '' });
        Alert.alert('Alert', 'Welcome aboard!', [{text: 'Ok', onPress: () => Actions.pop()}]);
      }
    }
    if(props.auth.error)  {
      this.setState({ email: '', password: '', buttonState: 'signUp' });
      Alert.alert('Alert', props.auth.error);
    }
  }

  render() {
    const {
      centerEverything, container, upperContainer, title, middleContainer,
      inputContainer, bottomContainer, terms, termsText, buttonStyle
    } = styles;

    return(
      <TouchableWithoutFeedback onPress={()=> dismissKeyboard()}>
        <View style={[container]}>
          <View style={[upperContainer, centerEverything]}>
            <View style={[centerEverything, { paddingTop: 150 }]}>
              <Text style={title}>CREATE NEW</Text>
              <Text style={title}>ACCOUNT</Text>
            </View>
          </View>
          <View style={[middleContainer, centerEverything]}>
            <View style={[centerEverything]}>
              <Input
                placeholder="Email Address"
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email} />
              <Input
                placeholder="Password"
                onChangeText={(password) => this.setState({ password })}
                value={this.state.password}
                secureTextEntry />
              <View style={[terms, centerEverything]}>
                <Text style={termsText}>By tapping "Sign Up" you agree</Text>
                <Text style={termsText}>to the terms & conditions</Text>
              </View>
            </View>
          </View>
          <View style={[bottomContainer, centerEverything]}>
            {/* <Button buttonText="CREATE NEW ACCOUNT" onPress={this.processRegister.bind(this)}/> */}
            <ButtonComponent
              style={buttonStyle}
              type='primary'
              shape='reactangle'
              buttonState={this.state.buttonState}
              states={this.buttonStates}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  helvMedium: {
    fontFamily: 'HelveticaNeue-Medium',
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  upperContainer: {
    flex: 2,
  },
  middleContainer: {
    flex: 5,
  },
  bottomContainer: {
    flex: 3,
  },
  title: {
    color: '#5B5A5A',
    fontSize: 20,
    letterSpacing: 5,
    fontWeight: '400',
  },
  terms: {
    paddingTop: 10
  },
  termsText: {
    color: '#5B5A5A',
    fontFamily: 'HelveticaNeue-Medium',
    fontWeight: '400'
  },
  buttonStyle: {
    backgroundColor: '#129793',
    height: 40,
    width: deviceWidth*0.7,
    borderRadius: 20,
    shadowColor: '#129793',
    shadowOpacity: 1,
    shadowRadius: 5
  },
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, actions)(Register);

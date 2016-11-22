import _ from 'lodash';
import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './../../actions';

const deviceWidth = require('Dimensions').get('window').width;
const deviceHeight = require('Dimensions').get('window').height;

class Search extends Component {

  render() {
    const { skeleton, centerEverything, container, listViewContainer, makeItTop,
    textContainer, titleContainer, descContainer, title, desc, listContainer } = styles;

    return(
      <View style={[container]}>
        <View style={[centerEverything, textContainer]}>
          <View style={titleContainer}>
            <Text style={[title]}>Search Event 🚀</Text>
          </View>
          <View style={descContainer}>
            <Text style={[desc]}>Below are the terms tech advocates search most</Text>
          </View>
        </View>
      </View>
    )
  }
}

const styles = {
  skeleton: {
    borderWidth: 1,
    borderColor: 'red'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F6F7',
  },
  listContainer: {
    flex: 8,
    padding: 10
  },
  listViewContainer: {
    paddingTop: 20
  },
  makeItTop: {
    position: 'absolute',
    top: 65,
    left: 20
  },
  textContainer: {
    flex: 2
  },
  titleContainer: {
    width: deviceWidth*0.8,
  },
  descContainer: {
    width: deviceWidth*0.6,
  },
  title: {
    fontSize: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
    textAlign: 'center'
  },
  desc: {
    color: 'grey',
    fontSize: 15,
    fontFamily: 'Helvetica Neue',
    fontWeight: '300',
    textAlign: 'center'
  },
}


export default (Search);

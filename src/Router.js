'use strict'
import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Scene, Router, Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import * as actions from './actions';

import SplashScreen from './containers/SplashScreen';
import LoadingScreen from './containers/LoadingScreen';

import Login from './containers/auth/Login';
import Register from './containers/auth/Register';
import ResetPassword from './containers/auth/ResetPassword';

import Home from './containers/tabContainers/Home';
import Search from './containers/tabContainers/Search';
import Profile from './containers/tabContainers/Profile';
import EventItemDetail from './containers/tabContainers/EventItemDetail';

const TabIcon = ({ selected, title}) => {
  return(
    <Text style={{
        color: '#5B5A5A',
        fontWeight: selected ? '600' : '200'
    }}>{title}</Text>
  );
};

class RouterComponent extends Component {

  componentWillMount() {
    this.props.listenToUser();
  }

  render() {
    const { sceneStyle, navigationBarStyle, titleStyle } = styles;
    return(
      <View style={{ flex: 1 }}>
        <Router
          sceneStyle={sceneStyle}
          navigationBarStyle={navigationBarStyle}
          titleStyle={titleStyle}>
          <Scene key="auth" initial hideNavBar>
            <Scene key="splash" component={SplashScreen} initial />
            <Scene key="login" component={Login} />
            <Scene key="register" component={Register} />
            <Scene key="resetPassword" component={ResetPassword}  />
          </Scene>
          <Scene key="main">
            <Scene key="tabbar" tabs tabBarStyle={styles.tabBarStyle} >
              <Scene key="homeTab" title="Home" icon={TabIcon}  initial>
                <Scene key="home" component={Home} title="Home Screen" initial />
              </Scene>
              <Scene key="searchTab" component={Search} title="Search" icon={TabIcon} />
              <Scene key="profileTab" component={Profile} title="Profile" icon={TabIcon} />
            </Scene>
            <Scene key="eventItemDetail" component={EventItemDetail} title="Event Screen" hideNavBar/>
          </Scene>
        </Router>
      </View>
    )
  }
}

const styles = {
  tabBarStyle: {
    position: 'absolute',
    top: 60,
  },
  sceneStyle: {
    backgroundColor: '#F5F6F7'
  },
  navigationBarStyle: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  },
  titleStyle: {
    fontFamily: 'HelveticaNeue-Medium',
    color: '#5B5A5A',
    letterSpacing: 4,
    fontWeight: '400'
  }
}

export default connect(null, actions)(RouterComponent);

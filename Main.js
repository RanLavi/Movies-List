import React, {Component} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';

class Main extends Component {
  state = {userInfo: {}};

  componentDidMount() {
    GoogleSignin.configure();
  }

  // componentWillUnmount() {
  //   LoginManager.logout();
  // }

  /* Facebook Functions */

  getUserInfo = (token) => {
    const PROFILE_PARAMS = {
      fields: {
        string: 'name, picture',
      },
    };

    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_PARAMS},
      (error, result) => {
        if (error) {
          console.warn('Getting login params ended with an error', error);
        } else {
          // setUserInfo(result);
          this.setState({userInfo: result});
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  /* Google Functions */

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      console.warn('Getting only to here');
      const result = await GoogleSignin.signIn();
      console.warn('Not getting here');
      this.setState({userInfo: result});
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn('in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn('play services not available or outdated');
      } else {
        console.warn('some other error happened');
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({userInfo: {}});
    } catch (error) {
      console.error(error);
    }
  };

  /* Popular Movies Functions */

  showButton() {
    return (
      <>
        <TouchableOpacity
          style={styles.popularMoviesButton}
          onPress={() => this.getPopularMovies()}>
          <Text>Popular Movies List</Text>
        </TouchableOpacity>
      </>
    );
  }

  getPopularMovies() {
    this.props.navigation.navigate('PopularMovies');
  }

  render() {
    return (
      <>
        {!(Object.keys(this.state.userInfo).length === 0) && this.showButton()}

        <View style={styles.middleContainer}>
          {Object.keys(this.state.userInfo).length === 0 ? (
            <>
              <Text style={styles.sectionTitle}>Welcome Stranger!</Text>
              <Image
                source={require('./assets/user22.png')}
                style={styles.profilePicture}
              />
              <Text style={styles.sectionDescription}>
                Please login to continue
                {'\n'}to the awesomeness
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.sectionTitle}>
                Welcome {this.state.userInfo.name}
              </Text>
              <Image
                source={{uri: this.state.userInfo.picture.data.url}}
                style={styles.profilePicture}
              />
              <Text style={styles.sectionDescription}>
                Let's start making
                {'\n'}your movies list
              </Text>
            </>
          )}
        </View>
        <View style={styles.buttons}>
          <LoginButton
            style={{width: 175, height: 30}}
            onLoginFinished={(error, result) => {
              if (error) {
                console.warn('login has error: ' + result.error);
              } else if (result.isCancelled) {
                console.warn('login is cancelled.');
              } else {
                AccessToken.getCurrentAccessToken().then((data) => {
                  const accessToken = data.accessToken.toString();
                  this.getUserInfo(accessToken);
                });
              }
            }}
            onLogoutFinished={() => this.setState({userInfo: {}})}
          />
          <GoogleSigninButton
            style={{width: 175, height: 35}}
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Light}
            onPress={this.signIn}
            disabled={this.state.isSigninInProgress}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  popularMoviesButton: {
    position: 'absolute',
    top: 24,
    alignSelf: 'center',
    backgroundColor: '#ff7f50',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  middleContainer: {
    top: 200,
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  profilePicture: {
    marginTop: 8,
    height: 128,
    width: 128,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
    textAlign: 'center',
  },
  buttons: {
    marginTop: 360,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Main;

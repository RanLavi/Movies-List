import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
class Movie extends Component {
  state = {runtime: ''};
  componentDidMount() {
    const id = this.props.route.params.id;
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=9cdac80be2c1e1a848e45e7dfc1aca4a`,
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({runtime: data.runtime});
      });
  }
  render() {
    const {poster, title, rating, overview} = this.props.route.params;
    return (
      <View>
        {poster == null ? (
          <Image
            source={{
              uri:
                'https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg',
            }}
            style={{width: '100%', height: 360}}
          />
        ) : (
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/w185${poster}`,
            }}
            // alt="Card image cap"
            style={{width: '100%', height: 360}}
          />
        )}
        <View style={styles.bottomHalfContainer}>
          <View style={styles.titleVoteContainer}>
            <Text style={styles.title}>Title: {title}</Text>
            <Text>Rating: {rating}</Text>
          </View>
          <Text>Runtime: {this.state.runtime} minutes</Text>
          <Text>Overview: {overview}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottomHalfContainer: {
    margin: 10,
  },
  titleVoteContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    width: '70%',
  },
});

export default Movie;

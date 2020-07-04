import React, {useState, Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

class PopularMovies extends Component {
  state = {movies: [], totalResults: 0, currentPage: 1, modalVisible: false};

  componentDidMount() {
    fetch(
      'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9cdac80be2c1e1a848e45e7dfc1aca4a',
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({movies: [...data.results]});
      });
  }

  showMovies = () => {
    return this.state.movies.map((movie, _i) => {
      return (
        <TouchableOpacity
          key={movie.id}
          onPress={() => {
            // this.setModalVisible(true);
            this.props.navigation.navigate('Movie', {
              poster: movie.poster_path,
              title: movie.title,
              rating: movie.vote_average,
              id: movie.id,
              overview: movie.overview,
            });
          }}>
          <Image
            source={{
              uri: `http://image.tmdb.org/t/p/w185${movie.poster_path}`,
            }}
            style={styles.moviesPoster}
          />
        </TouchableOpacity>
      );
    });
  };

  nextPage = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=9cdac80be2c1e1a848e45e7dfc1aca4a&language=en-US&page=${pageNumber}`,
    )
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          movies: [...data.results],
          totalResults: data.total_results,
          currentPage: pageNumber,
        });
      });
  };

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  };

  render() {
    const {modalVisible} = this.state;
    let numberPages = Math.floor(this.state.totalResults / 20);
    return (
      <>
        <ScrollView>
          <View style={styles.moviesGrid}>{this.showMovies()}</View>
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Movie Details Placeholder</Text>

                <TouchableOpacity
                  style={{...styles.openButton, backgroundColor: '#2196F3'}}
                  onPress={() => {
                    this.setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}

          {/* {this.state.totalResults > 20 && this.state.currentMovie == null ? (
             this.props.navigation.navigate('Pagination', {
              pages: numberPages, nextPage: this.nextPage, currentPage: this.state.currentPage,
            });
          ) : (
            ''
          )} */}
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  moviesGrid: {
    marginHorizontal: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  moviesPoster: {
    margin: 5,
    width: 106,
    height: 159,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});

export default PopularMovies;

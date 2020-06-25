import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, View, Text, FlatList, Image, TouchableOpacity, Button, Linking} from 'react-native';

function DetailsPage( { route , navigation}) {
    const [isLoading, setLoading] = useState(true);
    const [dataMovie, setDataMovie] = useState([]);
    const [dataPopular, setDataPopular] = useState([]);
    const [dataVideo, setDataVideo] = useState([]);

    const pressHandlerBrowse = () => {
      Linking.openURL('https://www.youtube.com/watch?v=' + dataVideo.key);
    };

    useEffect(() => {
      // fetch Movie Details
      fetch('https://api.themoviedb.org/3/movie/' + route.params?.id +'?api_key=7546d8fd702134117b50900677d11f59')
        .then((response) => response.json())
        .then((json) => setDataMovie(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      
      // fetch Popular movies
      fetch('https://api.themoviedb.org/3/movie/popular?api_key=7546d8fd702134117b50900677d11f59')
        .then((response) => response.json())
        .then((json) => setDataPopular(json.results))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      }, []);

      // fetch Movie video trailer key
      fetch('https://api.themoviedb.org/3/movie/' + route.params?.id + '/videos?api_key=7546d8fd702134117b50900677d11f59')
        .then((response) => response.json())
        .then((json) => setDataVideo(json.results[0]))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
    return(
      <>
      <ScrollView>
        <View>
          {isLoading ? <ActivityIndicator/> : (
          <View style={styles.container}>
            <View style={styles.mainImage}>
              <Image source={{uri: 'https://image.tmdb.org/t/p/original' + dataMovie.backdrop_path , cache: 'only-if-cached'}} style={{width: 390, height: 300}} />
            </View>
            <View style={styles.header}>
              <Text style={styles.headerText}>{dataMovie.title}</Text>
            </View>
            <Text style={styles.headerTagline}>"{dataMovie.tagline}"</Text>
            <Text style={styles.paragraph}> "{dataMovie.overview}"</Text>
            <Text style={styles.releaseDate}>{dataMovie.status}, {dataMovie.release_date}</Text>
            <View style={styles.button}>
              <Button title='Play Movie Trailer' color='teal' onPress={pressHandlerBrowse}/>
            </View>
            <View style={styles.button}>
              <Button title='Add to Library' disabled/>
            </View>
          </View>
          )}
        </View>

        {/* Other movies */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Other movies</Text>
        </View>
        <View style={styles.container}>
          <ScrollView>
            {isLoading ? <ActivityIndicator/> : (
              <FlatList
                data={dataPopular}
                horizontal
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <View style={styles.movies}>
                  <TouchableOpacity onPress={() => navigation.push('DetailsPage', item)}>
                    <View style={styles.image}>
                      <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path , cache: 'only-if-cached'}} style={{width: 300, height: 180}} />
                    </View>
                    <Text style={styles.imageTitle}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}/>
            )}
          </ScrollView>
        </View>
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  mainImage: {
    paddingTop: 10,
  },
  header: {
    paddingTop: 10,
    borderBottomColor: 'teal',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 20,
    color: 'teal',
  },
  headerTagline: {
    color: 'grey',
    textAlign: 'center',
    fontStyle: 'italic'
  },
  paragraph: {
    textAlign: 'justify',
    lineHeight: 18,
    paddingHorizontal: 10,
    paddingTop: 5,
  },
  releaseDate: {
    padding: 10,
    color: 'teal'
  },
  movies: {
    paddingRight: 10,
  },
  image: {
    width: 300, 
    height: 180,
    paddingTop: 10,
  },
  imageTitle:{
    paddingTop: 10,
  },
  button: {
    paddingBottom: 5,
    paddingHorizontal: 10,
  }
})

export default DetailsPage;
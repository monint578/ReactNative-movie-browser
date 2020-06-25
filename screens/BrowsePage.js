import React, { useEffect, useState } from 'react';
import {ScrollView, StyleSheet, ActivityIndicator, View, Text, FlatList, Image, TouchableOpacity} from 'react-native';

function getMoviesFromApi( {navigation } ) {
  const [isLoading, setLoading] = useState(true);
  const [dataPopular, setDataPopular] = useState([]);
  const [dataTop, setDataTop] = useState([]);
  const [dataUpcoming, setDataUpcoming] = useState([]);

  useEffect(() => {
    // fetch Popular movies
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=7546d8fd702134117b50900677d11f59')
      .then((response) => response.json())
      .then((json) => setDataPopular(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // fetch Top-rated movies
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=7546d8fd702134117b50900677d11f59')
      .then((response) => response.json())
      .then((json) => setDataTop(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    // fetch Upcoming movies
    fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=7546d8fd702134117b50900677d11f59')
      .then((response) => response.json())
      .then((json) => setDataUpcoming(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
    <ScrollView>
        {/* Popular movies */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Popular movies</Text>
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
                  <TouchableOpacity onPress={() => navigation.navigate('DetailsPage', item)}>
                    <View style={styles.image}>
                      <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path , cache: 'only-if-cached'}} style={{width: 300, height: 180}} />
                    </View>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}/>
            )}
          </ScrollView>
        </View>

        {/* Top rated movies */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Top rated movies</Text>
        </View>
        <View style={styles.container}>
          <ScrollView>
            {isLoading ? <ActivityIndicator/> : (
              <FlatList
                data={dataTop}
                horizontal
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                <View style={styles.movies}>
                  <TouchableOpacity onPress={() => navigation.navigate('DetailsPage', item)}>
                    <View style={styles.image}>
                      <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path , cache: 'only-if-cached'}} style={{width: 300, height: 180}} />
                    </View>
                    <Text>{item.title}</Text>
                  </TouchableOpacity>
                </View>
                )}/>
              )}
          </ScrollView>
        </View>
        
        {/* Upcomming movies */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Upcoming movies</Text>
        </View>
        <View style={styles.container}>
          <ScrollView>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
              data={dataUpcoming}
              horizontal
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => (
              <View style={styles.movies}>
                <TouchableOpacity onPress={() => navigation.navigate('DetailsPage', item)}>
                  <View style={styles.image}>
                    <Image source={{uri: 'https://image.tmdb.org/t/p/w500' + item.backdrop_path , cache: 'only-if-cached'}} style={{width: 300, height: 180}} />
                  </View>
                  <Text>{item.title}</Text>
                </TouchableOpacity> 
              </View>
              )}/>
            )}
          </ScrollView>
        </View>
    </ScrollView>
  </>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingLeft: 10,
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
  movies: {
    paddingRight: 10,
  },
  image: {
    width: 300, 
    height: 180
  }
})

export default getMoviesFromApi;
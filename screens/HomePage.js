import React from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';

function Home( {navigation }) {

    const pressHandlerBrowse = () => {
      navigation.navigate('BrowsePage')
    }

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>ReactSeals presents</Text>
      <View style={styles.button}>
        <Button title='Browse for movies' color='teal' onPress={pressHandlerBrowse}/>
      </View>
      <View style={styles.button}>
        {/* Login button - it could be disable */}
        <Button title='Login' color='mediumaquamarine' disabled/>
      </View>
      <Text style={styles.info}>ReactSeals internship program assignment app</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
    flex: 1,
  },
  titleText: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 240,
    paddingBottom: 80,
  },
  button: {
    paddingHorizontal: 50,
    paddingBottom: 10,
  },
  info: {
    position: 'absolute',
    bottom: 0,
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 10,
    paddingHorizontal: 55,
  }

})

export default Home;

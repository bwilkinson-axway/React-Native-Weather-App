import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, Button, Keyboard } from 'react-native';

class InteractivePart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: '',
      feelsLike: '',
      high: '',
      low: '',
      conditions: '',
    };
  }

  convert = (obj) => {
    this.setState({
      current: ((obj['main']['temp'] * (9/5)) - 459.67).toFixed(0),
      feelsLike: ((obj['main']['feels_like'] * (9/5)) - 459.67).toFixed(0),
      high: ((obj['main']['temp_max'] * (9/5)) - 459.67).toFixed(0),
      low: ((obj['main']['temp_min'] * (9/5)) - 459.67).toFixed(0),
      conditions: obj['weather'][0]['main'],
    });
    Keyboard.dismiss()
  }

  fetchWeather = (zipcode) => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&appid=a8e697a95390d4ae547c8e0dcaadae89`)
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      return JSON.stringify(data)
    })
    .then((string) => {
      this.convert(JSON.parse(string))
    })
  }

  render() {
    return (
      <View style={{padding: 10}}>
      <Text style={styles.instructions}>Enter your zip code:</Text>
      <Zipcode fetchWeather={this.fetchWeather} />
      <Weather current={this.state.current} feelsLike={this.state.feelsLike} high={this.state.high} low={this.state.low} conditions={this.state.conditions} />
      </View>
    );
  }
}

class Weather extends Component {
  render() {
    if (this.props.current === '') {
      return (
        <View></View>
      )
    }else{
    return (
      <View style={{backgroundColor: 'lightgrey'}}>
        <Text style={styles.welcome}>Current Temperature: {this.props.current} </Text>
        <Text style={styles.welcome}>It feels like: {this.props.feelsLike} </Text>
        <Text style={styles.welcome}>Today's High: {this.props.high} </Text>
        <Text style={styles.welcome}>Today's Low: {this.props.low} </Text>
        <Text style={styles.welcome}>Weather Conditions: {this.props.conditions} </Text>
      </View>
    )
  }
  }
}

class Zipcode extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
  }
  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40, textAlign: 'center', backgroundColor: 'white', borderRadius: 5}}
          placeholder="*****"
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button color={'orange'} onPress={() => { this.props.fetchWeather(this.state.text) }} title="Submit" />
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome, {fontSize: 30, color: 'white'}}>Brad's Weather App</Text>
        <InteractivePart />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
});

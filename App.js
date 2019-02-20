import React from 'react';
import { StyleSheet, Text, View, Switch } from 'react-native'

import io from 'socket.io-client'

export default class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      foco1: false,
      foco2: false
    }

    this.io = io('http://192.168.1.136:5050/')
    this.io.on('connect_error', function (e) {
      console.log("Aqui que shor", e);
    })
    this.io.on('first', data => {
      this.setState({foco1 : data.foco1, foco2 : data.foco2})
    })

    this.io.on('everyone', data => {
      this.setState({foco1 : data.foco1, foco2 : data.foco2})
    })
  }

  changeCheck = (val, n) => {
    this.setState({
      ["foco" + n]: val
    }, () => {
      this.changeStatusFocos(n)
    })
  }

  changeStatusFocos = (n) => {
    let foco = n 
    this.io.emit('change focos', n)
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontSize: 25, fontWeight: 'bold' }} >Foco 1</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
          value={this.state.foco1}
          //trackColor={{ false: "#CF7887", true: "#304E76" }}
          onValueChange={(val) => this.changeCheck(val, "1")}

        />
        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Foco 2</Text>
        <Switch
          style={{ transform: [{ scaleX: 1.8 }, { scaleY: 1.8 }] }}
          value={this.state.foco2}
          onValueChange={(val) => this.changeCheck(val, "2")}
        //trackColor={{ false: "#CF7887", true: "#304E76" }} 
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

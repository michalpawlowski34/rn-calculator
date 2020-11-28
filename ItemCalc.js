import React, { Component } from 'react';
import {StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default class ItemCalc extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.pressFunc=this.pressFunc.bind(this)
    this.longPressFunc=this.longPressFunc.bind(this)
  }
  pressFunc(){
      this.props.func(this.props.info)
  }
  longPressFunc(){
    if(this.props.info=='C'){
      this.props.func('AC')
    }
  }
  render() {
    return (
          <TouchableOpacity style={[styles.touchItem,{backgroundColor:this.props.color,opacity:this.opacity}]}onPress={this.pressFunc} onLongPress={this.longPressFunc}>
                <Text style={styles.text}> {this.props.info}</Text>
          </TouchableOpacity>
    );
  }
}
const styles=StyleSheet.create({
    touchItem:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    text:{
        fontSize:40,
        color:'white',
        fontFamily:'Helvetica'
    }
})

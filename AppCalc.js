import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableHighlightBase } from 'react-native';
import Item from './ItemCalc'

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a:'0',
      b:'',
      operator:'',
    };
    this.pressFunction=this.pressFunction.bind(this)
  }
  pressFunction(info){
    if(info!='C'&&info!='AC'&&info!='/'&&info!='*'&&info!='+'&&info!='='&&info!='-'){     //only numerals
      if(this.state.operator==''){
        if(this.state.a=='0'&&info!='.'){
          this.setState({
            a:info
          })
        }
        else if(info=='.'&&this.previousInfo=='.'){}            //multiply dots
        else{
          this.setState({
            a:this.state.a+info
          })
        }
      }
      else{
        if(this.state.b==''&&info=='.'){
          this.setState({
            b:'0.'
          })
        }
        else if(info=='.'&&this.previousInfo=='.'){}    //multiply dots
        else{
          this.setState({
            b:this.state.b+info
          })
        }
      }
    }
    else if(info=='='){
      if(this.state.b!=''){
        this.setState({
          a:eval(this.state.a+this.state.operator+this.state.b),
          b:'',
          operator:''
        })
      }
    }
    else if(info=='C'){
      if(this.state.a!='0'&&this.state.operator==''){                   //clear A
        if(this.state.a.toString().length>1){
          this.setState({
            a:this.state.a.toString().substr(0,this.state.a.toString().length-1)
          })
        }
        else{
          this.setState({
            a:'0'
          })
        }
      }
      else if(this.state.operator!=''&&this.state.b==''){                   //clear operator
        this.setState({
          operator:''
        })
      }
      else{
        if(this.state.b.toString().length!=0){                        //clear B
          this.setState({
            b:this.state.b.toString().substr(0,this.state.b.toString().length-1)
          })
        }
      }
    } 
    else if(info=='AC'){                                    //cleaar all
      this.setState({
        a:'0',
        b:'',
        operator:''
      })
    }
    else{
        this.changeOperator(info)
    }
    this.previousInfo=info
  }
  changeOperator(operator){
    if(this.previousInfo!='/'&&this.previousInfo!='*'&&this.previousInfo!='-'&&this.previousInfo!='+'&&this.previousInfo!='='){       //operator stack bug fix
      if((operator=='-'&&this.state.a=='0')||(operator=='+'&&this.state.a=='0')){                           //possibility of negaative and positive numbers in front
        this.setState({
          a:'',
          operator:operator
        })
      }
      else{
        this.setState({
          a:eval(this.state.a+this.state.operator+this.state.b),
          b:'',
          operator:operator
        })
      }
    }
    else{
      this.setState({
        operator:operator
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.result}>
          <Text adjustsFontSizeToFit minimumFontScale={.4} numberOfLines={1} style={styles.resultText}>{this.state.a}{this.state.operator}{this.state.b}</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.row}>
            <Item info={'7'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'4'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'1'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'.'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
          </View>
          <View style={styles.row}>
            <Item info={'8'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'5'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'2'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'0'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
          </View>
          <View style={styles.row}>
            <Item info={'9'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'6'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'3'} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
            <Item info={'='} color={'rgb(80,80,80)'} func={this.pressFunction}></Item>
          </View>
          <View style={styles.row}>
            <Item info={'C'} color={'orange'} func={this.pressFunction}></Item>
            <Item info={'/'} color={'orange'} func={this.pressFunction}></Item>
            <Item info={'*'} color={'orange'} func={this.pressFunction}></Item>
            <Item info={'-'} color={'orange'} func={this.pressFunction}></Item>
            <Item info={'+'} color={'orange'} func={this.pressFunction}></Item>
          </View>
        </View>
      </View>
    );
  }
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'black'
  },
  result:{
    flex:1,
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center'
  },
  resultText:{
    marginTop:200,
    color:'white',
    fontSize:75
  },
  items:{
    flex:2,
    flexDirection:'row',
    backgroundColor:'black',
  },
  row:{
    flex:1,
    justifyContent:'center',
  },
})

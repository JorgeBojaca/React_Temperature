import React from 'react';
import WebSocket from 'react-websocket';
import './index.css';

class CurrentTemperature extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currtemp: '',
      ip_part_1: '192',
      ip_part_2: '168',
      ip_part_3: '1',
      ip_part_4: '101',
      ip: '192.168.1.101'
    };
    this.changeIp_part_1 = this.changeIp_part_1.bind(this);
    this.changeIp_part_2 = this.changeIp_part_2.bind(this);
    this.changeIp_part_3 = this.changeIp_part_3.bind(this);
    this.changeIp_part_4 = this.changeIp_part_4.bind(this);
    this.changeIp = this.changeIp.bind(this);
  }
  changeIp_part_1(event){
    let newVal = event.target.value;
    console.info(newVal);
    if((newVal > 0) && (newVal < 224)){
    this.setState({
      ip_part_1: newVal
    });
    }else if(!newVal){
      this.setState({
        ip_part_1:''
      });
    }
  }
  changeIp_part_2(event){
    let newVal = event.target.value;
    console.info(newVal);
    if((newVal >= 0) && (newVal < 256)){
    this.setState({
      ip_part_2:newVal
    });
    }else if(!newVal){
      this.setState({
        ip_part_2:''
      });
    }
  }
  changeIp_part_3(event){
     let newVal = event.target.value;
    console.info(newVal);
    if((newVal >= 0) && (newVal < 256)){
    this.setState({
      ip_part_3:newVal
    });
    }else if(!newVal){
      this.setState({
        ip_part_3:''
      });
    }
  }
  changeIp_part_4(event){
     let newVal = event.target.value;
    console.info(newVal);
    if((newVal >= 0) && (newVal < 256)){
    this.setState({
      ip_part_4:newVal
    });
    }else if(!newVal){
      this.setState({
        ip_part_4:''
      });
    }
  }
  changeIp(){
    if(this.state.ip_part_1 && this.state.ip_part_2 && this.state.ip_part_3 && this.state.ip_part_4){
      let newIp = this.state.ip_part_1+'.'+this.state.ip_part_2+'.'+this.state.ip_part_3+'.'+this.state.ip_part_4;
      console.info(newIp);
      this.setState({
        ip: newIp,
        currtemp: ''
      })
    }
  }

  handleData(data) {;
    this.setState({currtemp: parseInt(data)});
  }

  render() {
    return (
      <div className="container">
        <div className="logoEperimentality"></div>
        <div className = "ipContainer">
          <div className="titleIP">Intel Edison IP:</div>
          <div className = "partsIp">
            <input type="number" value={this.state.ip_part_1} onChange={this.changeIp_part_1}></input>
            <input type="number" value={this.state.ip_part_2} onChange={this.changeIp_part_2}></input>
            <input type="number" value={this.state.ip_part_3} onChange={this.changeIp_part_3}></input>
            <input type="number" value={this.state.ip_part_4} onChange={this.changeIp_part_4}></input>
          </div>
        </div>
        {this.state.ip_part_1 && this.state.ip_part_2 && this.state.ip_part_3 && this.state.ip_part_4 ? 
        <button onClick={this.changeIp}>Set IP</button>:null}
         
       {this.state.currtemp ? <div className="temperatureContainer">Current Temperature: <br/>{this.state.currtemp + " °C"}</div>:
       <div className="loader"/>}
        <WebSocket url={'ws://'+this.state.ip+':8888/currentTemperature'}
          onMessage={this.handleData.bind(this)}/>
      </div>
    )
  }
}

export default CurrentTemperature;
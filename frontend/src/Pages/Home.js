import React, { Component } from 'react'
import axios from '../api/axios'
import Canvas from '../Components/Canvas';
import './Home.css'


export default class Home extends Component{
  state ={
    UserProfile: {},
    fullName: {}
  }
 

  
componentDidMount() {

  const config = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
    }
  }
  axios.get('UserProfile', config).then(
    res => {
      this.setState({
        UserProfile: res.data
      });
    },
    err =>{
      console.log(err);
    }
  )
}
logout(){
localStorage.removeItem('token');
}
render(){
  
  if(this.state.UserProfile){
  return (
    <div>
    <Canvas>
      <div className='fin-overview'>

      </div>
      <div className='row-2'>
        <div className='left-home'>

        </div>
        <div className='right-home'>
          
        </div>
      </div>
    </Canvas>
    </div>
    
    )
  }
  

}
}

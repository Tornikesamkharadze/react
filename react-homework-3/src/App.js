import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react'

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      showUsshowUsersList: false,
      users: []
    }
  }
  
  chekIf = () => {
    this.setState({showUsshowUsersList: true})
    this.setState({users: generateUsers})
  }

  removeRandomeName = () => {
      this.setState( (pervState) => {
        console.log(pervState.users.length,"perv")
        const randomIndex = Math.floor(Math.random() * pervState.users.length)
        const usersArray = pervState.users.filter((_, index)=> index !== randomIndex)
        return {users : usersArray}
      })
     
  }
  componentDidUpdate() {
    if(this.state.users.length > 0) document.title= `${this.state.users.length}`
    else document.title= "No users"
  }

  render() {
    return (
      <div>
        <button onClick={this.chekIf}>Show Users</button>
        <>
          {this.state.users.map(user => {
          const {name, id} = user;
          return <p key={id}>{name}</p>
          })}
        </>
        <button onClick={this.removeRandomeName}>Remove Users</button>
      </div>
    )
  }
}

const generateUsers =[
    {name:"თორნიკე",id: 1,},
    {name: "სალომე",id: 2,},
    {name:"ვახო",id: 3,},
    {name:"ირაკლი",id: 4,},
    {name:"ანი",id: 5,},
    {name:"ბექა",id: 6,},
    {name: "გიორგი",id: 7,},
    {name: "ნინი",id: 8,},
    {name:"მაგდა",id: 9,},
    {name:"ოთო",id: 10,}
   ]

   /* მეორე დავალება TaskTwo კომპონენტშია */
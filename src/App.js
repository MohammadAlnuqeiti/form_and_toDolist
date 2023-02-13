// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from "./component/register";
import Header from './component/header';
import Login from './component/login';
import Home from './component/home';
import Todolist from './component/todolist';
import React from 'react';
import { Routes, Route } from 'react-router-dom';


class App extends React.Component{

  constructor(props){
    super(props)
    this.users = [

      {fullName:'ahmed',email:"ahmed@gmail.com",password:"12345678"},
      {fullName:'asad',email:"asad@gmail.com",password:"12345678"},
      {fullName:'abed',email:"abed@gmail.com",password:"12345678"},
  ]
  }
  render(){
    return (
    <div className="App">

      <Header/>
      <Routes>

          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register users={this.users} />} />
          <Route path="/login" element={<Login users={this.users} />} />
          <Route path="/todolist" element={<Todolist />} />
         
       </Routes>


    </div>
  );
  }
}  


export default App;

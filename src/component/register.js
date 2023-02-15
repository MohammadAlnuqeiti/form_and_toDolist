import React from 'react';
import axios from "axios";

import { json } from 'react-router-dom';

const validEmailRegex = 
  RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const validateForm = (errors) => {
    let valid = true;
    Object.values(errors).forEach(
      // if we have an error string set valid to false
      (val) => val.length > 0 && (valid = false)
    );
    return valid;
  }
class Register extends React.Component{


    constructor(props) {
      super(props);
        this.state = {
          fullName: null,
          email: null,
          password: null,
          repassword: null,
          test:"",
          accept:false,
          errors: {
            fullName: '',
            email: '',
            password: '',
            repassword: '',
          }
        };
        this.users =this.props.users
        console.log( this.users);
      }
      handleChange = (event) => {
        console.log(event);
        // event.preventDefault();
        const { name, value } = event.target;
//         let name = event.target.name;
// let value = event.target.value;
        let errors = this.state.errors;
        switch (name) {
          case 'fullName': 
            errors.fullName = 
              value.length < 5
                ? 'Full Name must be 5 characters long!'
                : '';
            break;
          case 'email': 
            errors.email = 
              validEmailRegex.test(value)
                ? ''
                : 'Email is not valid!';
            break;
          case 'password': 
          this.setState({
            test:value
          })
          errors.password = 
          value.length < 8 
          ? 'Password must be 8 characters long!'
          : '';
          break;
          case 'repassword': 
          console.log(this.state.test);
            errors.repassword = 
              value !== this.state.test
                ? 'Confirm Password not match!'
                : '';
            break;
          default:
            break;
        }
      
        this.setState({errors, [name]: value}, ()=> {
            console.log(errors)
        })
      }
      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            accept:true,

        })
        const { fullName, email,password } = this.state;

// 
        let errors = this.state.errors;
        if(fullName === null){
            errors.fullName =  'Name is required'
        }
        if(email=== null){
            errors.email =  'email is required'
        }
        if(password === null){
            errors.password =  'password is required'
        }
 
        this.setState({errors}, ()=> {
            console.log(errors)
        })
// 
        if(validateForm(this.state.errors)) {
          console.info('Valid Form')
          let newUser ={fullName:this.state.fullName,email:this.state.email,password:this.state.password}
          this.users.push(newUser);
          let inputs = {fullName:this.state.fullName,email:this.state.email,phone:this.state.repassword,password:this.state.password}
          axios.post("http://localhost:80/REACT/back_end_react/api/user/save",inputs)
          .then((respone)=>{
              console.log(respone.data);
              window.location.pathname = "/login";
          })
  

          // localStorage.setItem('users',JSON.stringify(this.users))
        }else{
          console.error('Invalid Form')
        }
        console.log( this.users);

      }
    render(){
        const {errors} = this.state;
        return(
                <>
                 <div className='form-wrapper'>
                    <h2>Register</h2>
                    <form onSubmit={this.handleSubmit} noValidate >

                        <div className='fullName'>
                        <label htmlFor="fullName">Full Name</label>
                        <input type='text' name='fullName' onChange={this.handleChange} noValidate />
                        {errors.fullName.length > 0 && this.state.accept && <span className='error'>{errors.fullName}</span>}
                        </div>

                        <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onChange={this.handleChange} noValidate />
                        {errors.email.length > 0 && this.state.accept && <span className='error'>{errors.email}</span>}
                        </div>

                        <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onChange={this.handleChange} noValidate />
                        {errors.password.length > 0 && this.state.accept && <span className='error'>{errors.password}</span>}
                        </div>
                        <div className='password'>
                        <label htmlFor="password">Confirm Password</label>
                        <input type='password' name='repassword' onChange={this.handleChange} noValidate />
                        {errors.repassword.length > 0 && this.state.accept && <span className='error'>{errors.repassword}</span>}
                        </div>

                        <div className='info'>
                        <small>Password must be eight characters in length.</small>
                        </div>

                        <div className='submit'>
                        <button>Create</button>
                        </div>
                    </form>
                </div>
                </>
        )
    }
}

export default Register
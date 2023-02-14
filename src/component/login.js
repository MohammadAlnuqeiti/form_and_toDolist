import React, { Component } from 'react'

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
        }
        this.users =this.props.users
        console.log( this.users);
    }

    handleBlur = (event)=>{

    const {name , value}=event.target;

if(name==="email"){
    this.setState({
        email:value,
    })
    
}else if(name==="password"){
    this.setState({
        password:value,
    })
    
}
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (this.state.email==="" || this.state.password==="" ){
            document.getElementById("err").style.display = 'block'
            document.getElementById("err").innerHTML = "**please inter your email and password"
        }
        this.users.map((ele)=>{
        if (ele.email!==this.state.email && ele.password!==this.state.password){
            document.getElementById("err").style.display = 'block'
            document.getElementById("err").innerHTML = "**please inter correct your email and password"
        }
    })
        this.users.map((ele)=>{
            if(ele.email===this.state.email && ele.password===this.state.password && this.state.email!=="" && this.state.password !==""){
                  console.log(true);
                  window.localStorage.setItem('email',this.state.email)

                  window.location.assign('/home')

                  

            }
         
        })
        // const {name , value}=event.target;

        
        
        
    }
    
    render() {
      console.log(this.state);
    return (
        <>
        <div className='form-wrapper'>
                    <h2>Login</h2>
                    <form onSubmit={this.handleSubmit} noValidate >

                   

                        <div className='email'>
                        <label htmlFor="email">Email</label>
                        <input type='email' name='email' onBlur={this.handleBlur} noValidate />
                        </div>

                        <div className='password'>
                        <label htmlFor="password">Password</label>
                        <input type='password' name='password' onBlur={this.handleBlur} noValidate />
                        <p className="errorr" id="err"></p>

                        </div>


                        <div className='submit'>
                        <button>Login</button>
                        </div>
                    </form>
                </div>
        </>
    )
  }
}

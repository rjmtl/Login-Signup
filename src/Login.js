import React from "react"
import "./App.css"
import {withRouter} from "react-router-dom"



class Login extends React.Component{
    constructor(props){
        super(props)
        this.changehandle=this.changehandle.bind(this);
        this.submithandle=this.submithandle.bind(this);
        this.state={
            email:"",
            password:""
        }
    }
        changehandle(e) {
            this.setState({ [e.target.name]: e.target.value });
        }
    submithandle(e){
        var flag=false;
        e.preventDefault();
        for(let i=0;i<localStorage.length;i++){
        let temp = JSON.parse(localStorage.getItem(localStorage.key(i)));
        if(temp.email === this.state.email && temp.password === this.state.password){
            flag=true;
            
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("currentUser",temp.name);
            localStorage.setItem("currentEmail",temp.email);
            break;
            
        }
        }
        if(flag){
            this.props.history.push("/Welcome");
            
        }
        else{
            alert("Invalid Email or Password");
            
        }
    this.setState({
        email:"",
        password:""
    })
}

    componentDidMount(){
        var logg=localStorage.getItem("isLoggedIn");
        console.log(logg);
        if(logg){
            this.props.history.push('/Welcome')
    }
    
}

render(){
    return(
        <>
        
        <div className="main">
            <div className="inner">
                <h1>Login</h1>
        <form onSubmit={this.submithandle}>       
        <input className="inputBox" placeholder="Email" name="email" value={this.state.email} type="email" onChange={this.changehandle}></input>
        <br/><br/>
        <input className="inputBox" placeholder="Password" name="password" value={this.state.password} type="password" onChange={this.changehandle}></input>
        <br/><br/>
        <button className="inputBox">Login</button>
        <br/><br/>
        </form>
        
        <button className="inputBox"><a href="/Signup" >Signup</a></button>
         </div>
        </div>
        </>
    )
}
}

export default withRouter(Login);
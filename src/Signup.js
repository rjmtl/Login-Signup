import React from "react"
import { withRouter } from "react-router-dom"

class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.changehandler = this.changehandler.bind(this);
        this.submithandler = this.submithandler.bind(this);
        this.validate = this.validate.bind(this);
        this.validateform = this.validateform.bind(this);

        this.state = {
            name: "",
            lastname:"",
            email: "",
            password: "",
            confirmpassword:"",
            dob:"",
            nameError: "",
            emailError: "",
            passwordError: "",
            error: "",
            contactno:""
        }
        // var errorname;
    }

    changehandler(e) {
        this.setState({ [e.target.name]: e.target.value }, () => { this.validate(e.target.name, e.target.value) });
    }
    submithandler(e) {
        e.preventDefault();
        var flag=false;
        const valid = this.validate();
        for(let i=0;i<localStorage.length;i++){
        let temp = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        
        if(temp.email===this.state.email){
            flag=true;

        }
        else;}

        if(flag==false)
        {
        localStorage.setItem(this.state.email, JSON.stringify(this.state));
        alert("Signed Up! Successfully");
        this.props.history.push("/");
        }
        else{
            alert("Email already exist");
        }

        if (valid) {
            this.setState({
                name: "",
                lastname:"",
                email: "",
                password: "",
                confirmpassword:"",
                dob:"",
                contactno:"",
                nameError: "",
                lastnameError:"",
                emailError: "",
                passwordError: "",
                confirmpasswordError:"",
                error: "",
                contactnoError:""
                

            })
        }
    }

    validate(fieldname, value) {
        let formvalid = this.state.formError;
        let nameError = this.state.nameError;
        let lastnameError=this.state.lastnameError;
        let emailError = this.state.emailError;
        let passwordError = this.state.passwordError;
        let confirmpasswordError=this.state.confirmpasswordError;
        let contactnoError=this.state.contactnoError;




        switch (fieldname) {
            case 'name':
                if (value.length === 0) {
                    formvalid = false;
                    nameError = "";
                }

                else if (value === " ") {
                    nameError = "Spaces aren't Allowed";
                    // formvalid=false;

                } 
                else if(value.includes(" ")){
                    nameError = "Spaces aren't Allowed";
                }
                else if  (value.length < 2) {
                    // formvalid=false;
                    nameError = "Too Short!";
                }
                else if (value.length===25){
                nameError="Maximum 25 Characters are allowed! "
                }
                else{
                    nameError=""
                    formvalid=true;
                }

                break;

                case 'lastname':

                if (value.length === 0) {
                    formvalid = false;
                    lastnameError = "";
                }
                else if (value === 0) {
                    lastnameError = "Spaces aren't Allowed";
                    // formvalid=false;

                } 
                else if (value.includes(" ")) {
                    lastnameError = "Spaces aren't Allowed";
                    // formvalid=false;

                }
                else if (value.length < 2) {
                    // formvalid=false;
                    lastnameError = "Too Short!";
                }

                else if (value.length===25){
                    lastnameError="Maximum 25 Characters are allowed! "
                    }
                else {
                    lastnameError = "";
                    formvalid = true;
                    this.setState({ error: this.state.formError });
                }

                break;


            case 'email':
                if (value.length === 0) {
                    formvalid = false;
                    emailError = "";
                }
                else if (value.match((/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))) {
                    formvalid = true;
                    this.setState({ error: this.state.formError });
                }
                else {
                    formvalid = false;
                    emailError = "Invalid Email";
                    this.setState({ error: false })

                }

                break;

            case 'password':
                if (value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})")) {
                    setInterval(this.validateform, 100);
                    passwordError = "";


                    formvalid = true;
                }


                else {
                    formvalid = false;
                    passwordError = "Password Should contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"

                }
                break;
                
                case 'confirmpassword':
                if(value===this.state.password){
                    formvalid=true;
                    confirmpasswordError="";
                }
                else{
                    formvalid=false;
                    confirmpasswordError="Those Passwords Doesn't Match! Try again";
                }
                break;

                case 'contactno':
                    if(value.match("^[0-9]")){
                        formvalid=true;
                        contactnoError="";
                    }
                    else
                    {
                        contactnoError="Only Numbers are Allowed";
                        formvalid=false;

                    }
                    break;




            default:
                break;
        }
        this.setState({
            formError: formvalid,
            nameError: nameError,
            emailError: emailError,
            passwordError: passwordError,
            confirmpasswordError:confirmpasswordError,
            lastnameError:lastnameError,
            contactnoError:contactnoError,
        });
        
    }

    validateform() {
        this.setState({ formvalid: this.state.formError });
    }








    render() {
        return (
            <div className="main">
                <div className="inner">
                    <h1>SignUp</h1>
                    <form onSubmit={this.submithandler}>
                       
                       
                        <input className="inputBox"
                            name="name"
                            maxLength="25"
                            value={this.state.name}
                            onChange={(event) => this.changehandler(event)}
                            type="text" placeholder="First Name" required></input>
                        {this.state.nameError.length ? <span>{this.state.nameError}</span> : null}
                         <br /><br />

                        <input className="inputBox"
                            name="lastname"
                            maxLength="25"
                            value={this.state.lastname}
                            onChange={(event) => this.changehandler(event)}
                            type="text" placeholder="Last Name" required></input>
                        {this.state.error ? <span>{this.state.lastnameError}</span> : null}
                        <br /><br />
                        
                        <input className="inputBox"
                            name="email"
                            value={this.state.email}
                            onChange={(event) => this.changehandler(event)}
                            type="email" placeholder="Email" required ></input>
                        {this.state.error ? null : <span>{this.state.emailError}</span>}
                        <br /><br />

                        <input className="inputBox"
                            name="password"
                            value={this.state.password}
                            onChange={(event) => this.changehandler(event)}
                            type='password' placeholder="Password" required></input>
                        {this.state.formError ? null : <span>{this.state.passwordError}</span>}
                        <br /><br />
                        
                        
                        <input className="inputBox"
                            name="confirmpassword"
                            value={this.state.confirmpassword}
                            onChange={(event) => this.changehandler(event)}
                            type='password' placeholder="Confirm Password" required></input>
                        {this.state.formError ? null : <span>{this.state.confirmpasswordError}</span>}
                        <br/><br/>

                        <input type="date"className="inputBox" required></input>
                        <br/><br/>

                        <input className="inputBox"
                            name="contactno"
                            type="text"
                            maxLength="10"
                            
                            value={this.state.contactno}
                            
                            onChange={(event) => this.changehandler(event)}
                             placeholder="Contact No." required></input>
                        {this.state.contactno ? <span>{this.state.contactnoError}</span> : null}
                        <br/><br/>
                        <button className="inputBox" disabled={!this.state.formvalid}>Signup</button>
                    </form>
                    <br />
                    <button className="inputBox"><a href="/">Login</a></button>
                </div>
            </div>
        )
    }
}


export default withRouter(Signup);

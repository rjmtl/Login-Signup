import React from "react"
import { withRouter } from "react-router-dom"
var now=Date.now();
var time_difference=now-567648000000;
var time=new Date(time_difference);
var year = time.getFullYear();
var month = ("0" + (time.getMonth() + 1)).slice(-2);
var day = ("0" + time.getDate()).slice(-2);
var maxtime=(`${year}-${month}-${day}`);
console.log(maxtime);


class Signup extends React.Component {
    constructor(props) {    
        super(props);
        this.changehandler = this.changehandler.bind(this);
        this.submithandler = this.submithandler.bind(this);
        this.validate = this.validate.bind(this);
        this.validateform = this.validateform.bind(this);

        this.state = {
            name: "",
            lastname: "",
            email: "",
            password: "",
            confirmpassword: "",
            dob: "",
            nameError: "",
            lastnameError: "",
            emailError: "",
            passwordError: "",
            error: "",
            contactno: "",
            characterError: "",
            numberError: "",
            capitalError: "",
            smallError: "",
            contactnoError: "",
            confirmpasswordError: "",
            validitycheck: false,
            formError: "",
            date: "",
            dateError: "",
            nameformvalid: false,
            lastnameformvalid: false,
            emailformvalid: false,
            passwordformvalid: false,
            confirmpasswordvalid: false,
            contactnovalid: false,
            datevalid: false,

        }

    }

    changehandler(e) {
        this.setState({ [e.target.name]: e.target.value }, () => {
            
            this.validate(e.target.name, e.target.value)
            
        });
    }
    submithandler(e) {
        e.preventDefault();
        var flag = false;
        const valid = this.validate();
        for (let i = 0; i < localStorage.length; i++) {
            let temp = JSON.parse(localStorage.getItem(localStorage.key(i)));


            if (temp.email === this.state.email) {
                flag = true;

            }
            else;
        }

        if (flag === false) {
            localStorage.setItem(this.state.email, JSON.stringify(this.state));
            alert("Signed Up! Successfully");
            this.props.history.push("/");
        }
        else {
            alert("Email already exist");
        }

        if (valid) {
            this.setState({
                name: "",
                lastname: "",
                email: "",
                password: "",
                confirmpassword: "",
                dob: "",
                contactno: "",
                nameError: "",
                lastnameError: "",
                emailError: "",
                passwordError: "",
                confirmpasswordError: "",
                error: "",
                dateError: "",
                contactnoError: "",
                characterError: "",
                numberError: "",
                capitalError: "",
                smallError: "",
            })
        }
    }

    validate(fieldname, value) {
        
        let nameformvalid = this.state.nameformvalid;
        let lastnameformvalid = this.state.lastnameformvalid;
        let passwordformvalid = this.state.passwordformvalid;
        let confirmpasswordvalid = this.state.confirmpasswordvalid;
        let contactnovalid = this.state.contactnovalid;
        let nameError = this.state.nameError;
        let lastnameError = this.state.lastnameError;
        let emailError = this.state.emailError;
        let passwordError = this.state.passwordError;
        let confirmpasswordError = this.state.confirmpasswordError;
        let contactnoError = this.state.contactnoError;
        let characterError = this.state.characterError;
        let numberError = this.state.numberError;
        let capitalError = this.state.capitalError;
        let smallError = this.state.smallError;
        let emailformvalid = this.state.emailformvalid;
        let dateError = this.state.dateError;
        let datevalid = this.state.datevalid;




        switch (fieldname) {
            case 'name':
                
                if (value.length === 0) {
                    nameError = null;


                }
                if (!value.match("^[A-Za-z]+$")) {
                    nameError = "Only Alphabets are allowed";
                    nameformvalid = false;

                }
                else {
                    nameError = "null";
                    nameformvalid = true;
                }
                if (value.includes(" ")) {
                    nameError = "Spaces aren't Allowed";
                    nameformvalid = false;
                }
                if (value.match("(?=.*[0-9])")) {
                    nameError = "Numbers aren't allowed";
                    nameformvalid = false;

                }


                else {
                    nameError = null;
                    nameformvalid = true;
                }

                if (value.length === 25) {
                    nameError = "Maximum 25 Characters are allowed! "
                }


                break;

            case 'lastname':

                if (value.length === 0) {

                    lastnameError = null;
                }
                if (!value.keyCode) {
                    lastnameError = "Only Alphabets are allowed";
                    lastnameformvalid = false;

                }
                else {
                    lastnameError = "null";
                    lastnameformvalid = true;
                }
                if (value.includes(" ")) {
                    lastnameError = "Spaces aren't Allowed";
                    lastnameformvalid = false;

                }
                else {
                    lastnameError = null;
                    lastnameformvalid = true;
                }

                if (value.length === 25) {
                    lastnameError = "Maximum 25 Characters are allowed! "
                }

                break;


            case 'email':
                if (value.length === 0) {
                    emailformvalid = false;
                    emailError = "";
                }
                if (value.match((/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i))) {
                    emailformvalid = true;
                    emailError = "";

                }
                else {
                    emailformvalid = false;
                    emailError = "Invalid Email";


                }

                break;

            case 'password':


                if (value.match("(?=.*[0-9])")) {
                    numberError = null;

                }

                if (!value.match("(?=.*[0-9])")) {
                    numberError = "Should contain atleast one number";

                    console.log(passwordformvalid, "Inside number error");
                }



                if (value.match("(?=.*[A-Z])")) {
                    capitalError = null;

                    console.log(passwordformvalid, "Inside Capital");
                }
                if (!value.match("(?=.*[A-Z])")) {
                    capitalError = "Should contain atleast one capital letter";

                }


                if (value.match("(?=.*[a-z])")) {
                    smallError = null;


                }

                if (!value.match("(?=.*[a-z])")) {
                    smallError = "Should contain atleast one small letter";

                }
                if (value.match("(?=.*[!@#$%^&*])")) {
                    characterError = null;
                }
                if (!value.match("(?=.*[!@#$%^&*])")) {
                    characterError = "Should contain atleast one special character";
                }


                if (!numberError && !characterError && !smallError && !capitalError) {
                    passwordformvalid = true;
                }
                else {
                    passwordformvalid = false;
                }

                break;

            case 'confirmpassword':
                if (value === this.state.password) {
                    confirmpasswordvalid = true;
                    confirmpasswordError = "";
                }
                else {
                    confirmpasswordvalid = false;
                    confirmpasswordError = "Those Passwords Doesn't Match! Try again";
                }
                break;

            case 'date':
                
                var dob=new Date(value);
                if (now-dob.getTime()<567648000000) {
                    dateError = "User Must be 18+ to Signup";
                    datevalid = false;
                }
                else {
                    dateError = null;
                    datevalid = true;
                }
                break;

            case 'contactno':
                if (value.match("^[0-9]")) {
                    contactnovalid = true;
                    contactnoError = "";

                    if (value.length >= 10) {
                        contactnovalid = true;
                    }


                    if (value.length < 10) {
                        contactnovalid = false;
                    }

                    if (!value.match("^[1-9]")) {
                        contactnoError = "Please Enter a valid number";
                        contactnovalid = false;

                    }

                }


                else {
                    contactnoError = "Only Numbers are Allowed";

                }
                break;

            default:
                break;


        }

        this.setState({
            nameError: nameError,
            emailError: emailError,
            passwordError: passwordError,
            confirmpasswordError: confirmpasswordError,
            lastnameError: lastnameError,
            contactnoError: contactnoError,
            characterError: characterError,
            numberError: numberError,
            capitalError: capitalError,
            smallError: smallError,
            nameformvalid,
            lastnameformvalid,
            emailformvalid,
            passwordformvalid,
            confirmpasswordvalid,
            contactnovalid,
            datevalid,
            dateError

        }, () => {
            
            this.validateform();
        });
    }
    validateform() {
        this.setState({
            validitycheck: this.state.nameformvalid && this.state.lastnameformvalid &&
                this.state.passwordformvalid && this.state.confirmpasswordvalid &&
                this.state.contactnovalid && this.state.datevalid
        })

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
                            minLength="2"
                            value={this.state.name}
                            onChange={(event) => this.changehandler(event)}
                            type="text" placeholder="First Name" required></input>
                        {this.state.nameError ? <span>{this.state.nameError}</span> : null}
                        <br /><br />

                        <input className="inputBox"
                            name="lastname"
                            minLength="2"
                            maxLength="25"
                            value={this.state.lastname}
                            onChange={(event) => this.changehandler(event)}
                            type="text" placeholder="Last Name" required></input>
                        {this.state.lastnameError ? <span>{this.state.lastnameError}</span> : null}
                        <br /><br />

                        <input className="inputBox"
                            name="email"
                            value={this.state.email}
                            onChange={(event) => this.changehandler(event)}
                            type="email" placeholder="Email" required ></input>
                        {this.state.emailError ? <span>{this.state.emailError}</span> : null}
                        <br /><br />

                        <input className="inputBox"
                            name="password"
                            minLength="8"
                            value={this.state.password}
                            onChange={(event) => this.changehandler(event)}
                            type='password' placeholder="Password" required></input>

                        {this.state.characterError ? <span>{this.state.characterError}<br /></span> : null}
                        {this.state.numberError ? <span>{this.state.numberError}<br /></span> : null}
                        {this.state.capitalError ? <span>{this.state.capitalError}<br /></span> : null}
                        {this.state.smallError ? <span>{this.state.smallError}<br /></span> : null}

                        <br /><br />


                        <input className="inputBox"
                            name="confirmpassword"
                            value={this.state.confirmpassword}
                            onChange={(event) => this.changehandler(event)}
                            type='password' placeholder="Confirm Password" required></input>
                        {this.state.formError ? null : <span>{this.state.confirmpasswordError}</span>}
                        <br /><br />

                        <input type="date" name="date"
                            value={this.state.date}
                            onChange={(event) => this.changehandler(event)}
                            placeholder="Date"
                            max={maxtime}
                            className="inputBox" required></input>
                        {this.state.date ? <span>{this.state.dateError}</span> : null}
                        <br /><br />

                        <input className="inputBox"
                            name="contactno"
                            type="text"
                            maxLength="10"

                            value={this.state.contactno}

                            onChange={(event) => this.changehandler(event)}
                            placeholder="Contact No." required></input>
                        {this.state.contactno ? <span>{this.state.contactnoError}</span> : null}
                        <br /><br />

                        <button className="inputBox" disabled={!this.state.validitycheck}>Signup</button>
                    </form>
                    <br />
                    <button className="inputBox"><a href="/">Login</a></button>
                </div>
            </div>
        )
    }
}


export default withRouter(Signup);

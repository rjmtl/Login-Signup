import React from 'react'
import { withRouter } from "react-router-dom"
import "./App.css"
import ChatDisplay from "./render"
var temp_array = []
var finalArr = [];
var obj = {
    name: "",
    pic: "",
}
class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            contacts: "",
            image: "",
            arr: [],
            arr2: [],
            selectedContact: {},
            api: []
        }

    }
    handleLogOut = () => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentEmail');
        localStorage.removeItem('isLoggedIn');
        this.props.history.push('/');
    }

    onchangehandle = (e) => {
        e.preventDefault();
        var image;
        if (e.target.name === "image") {
            image = e.target.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => {
                image = reader.result;
                this.setState(() => ({ image }))
            }

        }
        else
            this.setState(() => ({ [e.target.name]: e.target.value }));
    }

    
    clickhandle = (contact, e = null) => {
        this.setState(() => ({
            selectedContact: contact
        }));
    }
     submithandle = (e) => {
        e.preventDefault();
        obj = {
            name: this.state.name,
            pic: this.state.image
        }
        this.setState((state) => ({

            arr2: [...state.arr, obj]
        }), () => {
            localStorage.setItem(localStorage.currentUser, JSON.stringify(this.state.arr2));
        });
        this.setState({
            name: "",
        })
    }
    componentWillUnmount() {
        this.setState({
            arr: this.state.arr
        })
    }

    componentDidMount() {
        var keys = Object.keys(localStorage);
        if (keys.includes(localStorage.currentUser)) {
            finalArr = JSON.parse(localStorage.getItem(localStorage.currentUser));
        }
        this.setState(() => ({
            arr: finalArr
        }))
        var logg = localStorage.getItem("isLoggedIn");
        console.log(logg);
        if (logg) {
            this.props.history.push('/Welcome')
        }
        else {
            this.props.history.push("/");
        }
        var user = JSON.parse(localStorage.getItem(localStorage.currentUser));
        fetch('https://randomuser.me/api/?results=10')
            .then(response => response.json())
            .then(results => {

                this.setState({ api: results.results }, () => {
                    temp_array = this.state.api;

                });
                for (let i = 0; i < temp_array.length; i++) {
                    let t = temp_array[i]
                    obj = {
                        name: t.name.first,
                        pic: t.picture.thumbnail
                    }
                    if (this.state.arr.length < 11) {
                        this.setState((state) => ({
                            arr: [...state.arr, obj]
                        }))
                    }
                }
            })
    }
    render() {


        return (
            <>
                  <div className="Welcome"></div>
                <div className="Welcome_inner">
                    <div className="Welcome_upper">

                        <div className="profile">
                            {/* <div className="chathead"> */}
                            <div className="staticpart" id="static">

                                <img className="selected_image" src={this.state.selectedContact?.pic} alt={this.state.selectedContact?.name} /><p className="selected_name">{this.state.selectedContact?.name}</p> </div>

                            <div className="dp"
                                onClick={() => {
                                    document.querySelector(".chatdisplay").classList.toggle("hidden");
                                    document.querySelector('#usermodal').classList.add('visible');

                                }}
                            ></div><div className="buttons" >

                                <button type="button" className="add" id="add_event" onClick={() => {
                                    document.querySelector('#addContact').classList.toggle('visible');
                                    document.querySelector('#addbutton').classList.toggle('visible');
                                    document.querySelector('#file').classList.toggle('visible');

                                }}
                                ></button> <button className="logout" onClick={this.handleLogOut}></button>
                            </div>

                        </div>
                        <hr />
                        <div className="chat">
                            <div className="usermodal" id="usermodal">
                                <div className="modal_color">
                                    <div className="back_button"
                                        onClick={() => {
                                            document.querySelector('#usermodal').classList.remove('visible');
                                            document.querySelector(".chatdisplay").classList.remove("hidden");
                                        }}

                                    ></div><span>Profile</span>
                                </div>
                                <div className="modal_image"></div>
                                <div className="modal_name">
                                    <p>Your Name</p>
                                    <span>{localStorage.currentUser}</span>
                                </div>
                                <div className="modal_email">
                                    <p>Your Email</p>
                                    <span>{localStorage.currentEmail}</span>
                                </div>
                            </div>
                            <div className="static_chat" id="static_chat"></div>
                            <form onSubmit={(e) => this.submithandle(e)}>
                                <input className="trial" name="name" placeholder="Name" type="text" id="addContact" value={this.state.name} required onChange={(e) => this.onchangehandle(e)} />
                                <input className="fileselector" type="file" accept="image/gif, image/jpeg, image/png" name="image" id="file" onChange={(event) => this.onchangehandle(event)} />

                                <button className="trial1" id="addbutton"
                                    onClick={() => {
                                        document.querySelector('#addbutton').classList.toggle('visible');
                                        document.querySelector('#addContact').classList.toggle('visible');
                                        document.querySelector('#file').classList.toggle('visible');
                                    }
                                    }
                                >Add Contact</button>
                            </form >

                            <ChatDisplay clickHandle={this.clickhandle} contacts={this.state.arr}
                                onClick={() => {
                                    document.querySelector('#static').classList.add('visible')
                                    document.querySelector("#static_chat").classList.add('visible')

                                }}
                            />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Welcome);


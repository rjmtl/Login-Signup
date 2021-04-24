import React from 'react'
import {withRouter} from "react-router-dom"
import "./App.css"

class Welcome extends React.Component {
    render() {
        return (
            <div className="Welcome">
            <h1>Welcome</h1>                
            </div>
        )
    }
}

export default withRouter(Welcome);
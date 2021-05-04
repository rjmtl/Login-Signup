import React from "react";
import "./App.css"


// var finalArr=[];
class ChatDisplay extends React.Component{
    
    // componentDidMount(){
    //     var keys=Object.keys(localStorage);
    //     if(keys.includes(localStorage.currentUser)){
    //         finalArr=JSON.parse(localStorage.getItem(localStorage.currentUser));
    //     }
    // }
   
    
     render(){
         return(
            <div className="statichat" onClick={this.props.onClick}>
                
                <ol className="chatdisplay">
                 {this.props.contacts.map((value,index)=><li onClick={(e)=>this.props.clickHandle(value,e)} key={index}><img src={value.pic} className="image" width="200" alt="image"/>{value.name} </li>)}
                 </ol>
                
            </div>
         );
     }
}

export default ChatDisplay;
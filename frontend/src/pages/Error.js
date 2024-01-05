import { Component } from "react";
import { Link } from "react-router-dom";

class Error extends Component {    
    render() {
        return (
            <div>
                <br></br>
                <h3>Error: {this.props.location?.state?.errorMessage ?? "unauthorised access"}</h3>
                <Link to="/">Back to home</Link>
            </div>
        )
    }
}

export default Error;
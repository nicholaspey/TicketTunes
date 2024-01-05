import { Component } from "react";

class EventInfoError extends Component {    
    render() {
        return (
            <div>
                <br></br>
                <h3>Error: {this.props.location?.state?.errorMessage ?? "No such Event Information Page"}</h3>
            </div>
        )
    }
}

export default EventInfoError;
import { Component } from "react";
import { Link } from "react-router-dom";

class Logout extends Component {
    componentDidMount() {
        localStorage.removeItem('user');
        if (this.props.history) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div>
                <h3>You have logged out</h3>
                <Link to="/">Back to home</Link>
            </div>
        );
    }
}

export default Logout;

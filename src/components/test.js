import React, { Component } from "react";
import "./loginform.css";
import axios from 'axios';

class LoginForm extends Component {
    state = {
        email: "",
        password: "",
        error: "",
    };

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleFormSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        try {
            const response = await axios.post('http://localhost:8082/login', { email, password });
            const user = response.data;
            this.props.history.push("/welcomePage", { user }); // redirect to the WelcomePage component with the user object as a parameter
        } catch (error) {
            console.log(error);
            this.setState({ error: "Invalid email or password" });
        }
    };
    

    render() {
        return (
            <div className="cover">
                <form onSubmit={this.handleFormSubmit}>
                    <h2>Login</h2>
                    <div className="input_box">
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={this.state.email}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="input_box">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={this.state.password}
                            onChange={this.handleInputChange}
                            required
                        />
                    </div>
                    <div className="option_field">
                        <a href="#" className="forgot_pw">
                            Forgot password?
                        </a>
                    </div>
                    <button className="">Login Now</button>
                    {this.state.error && <div className="error">{this.state.error}</div>}
                </form>
            </div>
        );
    }
}

export default LoginForm;


state = {
    email: "",
    password: "",
    error: "",
};

handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
};

handleFormSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = this.state;
    try {
        const response = await axios.get(`http://localhost:8082/user?email=${email}&password=${password}`);
        const user = response.data;
        this.props.history.push("/welcome", { user });
    } catch (error) {
        console.log(error);
        this.setState({ error: "Invalid email or password" });
    }
};
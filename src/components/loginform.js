import React, { Component, useState } from "react";
import "./loginform.css";
import { BrowserRouter, useNavigate } from "react-router-dom";


function LoginForm() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setLogin(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        // Send a POST request to the backend to check if the email and password combination exists
        fetch("http://localhost:8083/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ login, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Login was successful, navigate to the welcome page
                    navigate("/scheduler", { state: { login } });
                } else {
                    // Login was unsuccessful, display an error message
                    setErrorMessage("Invalid email or password");
                }
            });
    };
    

    React.useEffect(() => {
        const home = document.querySelector(".home");
        const formContainer = document.querySelector(".form_container");
        const signupBtn = document.querySelector("#signup");
        const loginBtn = document.querySelector("#login");

        home.classList.add("show");

        signupBtn.addEventListener("click", (e) => {
            e.preventDefault();
            formContainer.classList.add("active");
        });
        loginBtn.addEventListener("click", (e) => {
            e.preventDefault();
            formContainer.classList.remove("active");
        });
    }, []);
    return (
        <div className="cover">
            <head>
                <link
                    rel="stylesheet"
                    href="https://unicons.iconscout.com/release/v4.0.0/css/line.css"
                />
            </head>

            <header className="header">
                <nav className="nav">
                    <a href="#" className="nav_logo">
                        <img className="logo" src="/ntt.png" alt="Logo" />
                    </a>
                </nav>
            </header>

            <section className="home">
                <div className="form_container">
                    <div className="form login_form show">
                        <form onSubmit={handleSubmit}>
                            <h2>Login</h2>

                            <div className="input_box">
                                <input
                                    type="text"
                                    placeholder="Enter your login"
                                    required
                                    value={login}
                                    onChange={handleEmailChange}
                                />
                                <i className="uil uil-envelope-alt email"></i>
                            </div>
                            <div className="input_box">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    required
                                    value={password}
                                    onChange={handlePasswordChange}
                                />
                                <i className="uil uil-lock password"></i>
                            </div>

                            <button className="button" type="submit">
                                Login Now
                            </button>

                            <div className="login_signup">
                                Forgot password? <a href="#signup" id="signup">click here</a>
                            </div>

                            {errorMessage && (
                                <div className="error_message">{errorMessage}</div>
                            )}
                        </form>
                    </div>
                    <div className="form signup_form">
                        <form action="#">
                            <h2>Forgot Password</h2>

                            <div className="input_box">
                                <input type="email" placeholder="Enter your email" required />
                                <i className="uil uil-envelope-alt email"></i>
                            </div>

                            <button className="button">Send Requisite</button>

                            <div className="login_signup">
                                Back to <a href="#" id="login">Login</a>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LoginForm;

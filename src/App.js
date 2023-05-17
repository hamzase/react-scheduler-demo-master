import React, { Component } from 'react';
import Scheduler from './component/Scheduler';
import Menu from "./component/Menu/Menu"; // updated path
import Home from "./pages/Home"
import Tet from "./pages/Tet"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.js";

import LoginForm from './components/loginform';



import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Welcome from './pages/Welcome';

class App extends Component {
    state = {
        currentTimeFormatState: true,
        messages: [],
        events: [],
        loading: true
    };

    componentDidMount() {
        this.fetchEvents();
    }

    fetchEvents = async () => {
        const response = await fetch('http://localhost:8083/Events');
        const events = await response.json();
        this.setState({ events, loading: false });
    }

    addMessage(message) {
        const maxLogLength = 5;
        const newMessage = { message };
        const messages = [
            newMessage,
            ...this.state.messages
        ];

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }
        this.setState({ messages });
    }

    logDataUpdate = (action, ev, id) => {
        const text = ev && ev.text ? ` (${ev.text})` : '';
        const message = `event ${action}: ${id} ${text}`;
        this.addMessage(message);
    }

    handleTimeFormatStateChange = (state) => {
        this.setState({
            currentTimeFormatState: state
        });
    }


    render() {
        const { loading, events, currentTimeFormatState } = this.state;
        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<LoginForm />} />
                        <Route path="Welcome" element={<Welcome />} />
                        <Route path="/scheduler" element={
                            <Menu>
                                <div className="scheduler-container">
                                    <Home />
                                    <Scheduler
                                        events={events}
                                        timeFormatState={currentTimeFormatState}
                                        onDataUpdated={this.logDataUpdate}
                                        onNewEvent={this.handleNewEvent}
                                    />
                                </div>
                            </Menu>
                        } />
                        <Route path="/Tet" element={
                            <Menu>
                                <div className="scheduler-container">
                                    <Home />
                                    <Tet />
                                </div>
                            </Menu>
                        } />
                          <Route path="/EmployeeS" element={
                            <Menu>
                                <div className="scheduler-container">
                                    <Home />
                             
                                </div>
                            </Menu>
                        } />
                    </Routes>
                </BrowserRouter>
            </div>
        );
    }
    
    
    
}

export default App;

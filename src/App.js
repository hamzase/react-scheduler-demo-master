import React, { Component } from 'react';
import Scheduler from './components/Scheduler';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import Menu from "./component/Menu/Menu";
import Home from "./pages/Home"
import Tet from "./pages/Tet"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.js";



import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';

const data = [
    { start_date:'2023-05-7 2:00', end_date:'2023-05-7 4:00', text:'Event 1', id: 1},
    { start_date:'2023-05-8 1:00', end_date:'2023-05-8 2:00', text:'Event 2', id: 2},
];

class App extends Component {
    state = {
        currentTimeFormatState: true,
        messages: []
    };

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
        const { currentTimeFormatState, messages } = this.state;
        return (
            <div>
                <div>
                    <BrowserRouter>
                        <Menu>
                            <Routes>
                                <Route path="/" element={
                                    <div className='scheduler-container'>
                                        <Home />
                                        <Scheduler
                                            events={data}
                                            timeFormatState={currentTimeFormatState}
                                            onDataUpdated={this.logDataUpdate}
                                        />
                                    </div>
                                }/>
                            </Routes>
                            <Routes>
                                <Route path="/Tet" element={<Tet/>} /> 
                            </Routes>
                        </Menu>
                    </BrowserRouter>
                </div> 
            </div>
        );
    }
}

export default App;

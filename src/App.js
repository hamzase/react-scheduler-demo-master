import React, { Component } from 'react';
import Scheduler from './components/Scheduler';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import Menu from "./component/Menu/Menu"; // updated path
import Home from "./pages/Home"
import Tet from "./pages/Tet"
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@fortawesome/fontawesome-free/js/all.js";


import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';

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
        const response = await fetch('http://localhost:8082/Event');
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

    handleNewEvent = async (newEvent) => {
        console.log('handleNewEvent called');
        const response = await fetch('http://localhost:8082/Event/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
        });
        if (response.ok) {
            const addedEvent = await response.json();
            this.setState(prevState => ({
                events: [...prevState.events, addedEvent]
            }));
            this.logDataUpdate('added', addedEvent, addedEvent.id);
        } else {
            this.addMessage(`Failed to add event: ${response.statusText}`);
        }
    }
    
    
    
    
    render() {
        const { currentTimeFormatState, messages, events, loading } = this.state;
        if (loading) {
            return <div>Loading...</div>;
        }
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
                                            events={events}
                                            timeFormatState={currentTimeFormatState}
                                            onDataUpdated={this.logDataUpdate}
                                            onNewEvent={this.handleNewEvent}
                                        />
                                    </div>
                                }/>
                                <Route path="/Tet" element={<Tet />} /> {/* new route */}
                            </Routes>
                        </Menu>
                    </BrowserRouter>
                </div> 
            </div>
        );
    }
    
}

export default App;
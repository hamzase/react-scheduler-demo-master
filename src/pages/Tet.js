import ContentPage from "../component/Content/ContentPage";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Home() {

    const [events, setEvents] = useState([])
    useEffect(() => {
        console.log("Code with hamza.")
    });


    useEffect(() => {
        loadEvents();
    }, [])

    const loadEvents = async () => {
        const result = await axios.get("http://localhost:8083/Events")
        setEvents(result.data);
    }


    const deleteEvent = async (id) => {
        await axios.delete(`http://localhost:8083/Event/${id}`)
        loadEvents()
    }



    return (
        <div className='container mx-auto'>
            <div className='py-4'>
                <table className="table border shadow text-center">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Start date</th>
                            <th scope="col">End date</th>
                            <th scope="col">Description</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            events.map((event, index) => (
                                <tr key={event.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{event.start_date}</td>
                                    <td>{event.end_date}</td>
                                    <td>{event.text}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => deleteEvent(event.id)}>Cancel</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
    );

}

import ContentPage from "../component/Content/ContentPage";
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';

export default function Home() {

    const [events, setEvents] = useState([])
    useEffect(()=>{
        console.log("Code with hamza.")
    });


    useEffect(()=>{
        loadEvents();
    },[])

    const loadEvents=async()=>{
        const result=await axios.get("http://localhost:8082/Event")
        setEvents(result.data);
    }


    const deleteUser=async  (id)=>{
        await axios.delete(`http://localhost:8082/Event`)
    }



  return (
    <div className='container'>
        <div className='py-4'>
        <table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">id</th>
      <th scope="col">start_date</th>
      <th scope="col">end_date</th>
      <th scope="col">text</th>

    </tr>
  </thead>
  <tbody>

    {
        events.map((event,index)=>(
            <tr>
                <th scope="row" key={index}>{index+1}</th>
                <td>{event.id}</td>
                <td>{event.start_date}</td>
                <td>{event.end_date}</td>
                <td>{event.text}</td>
               
            </tr>
        ))
    }
    
  </tbody>
</table>
        </div>
    </div>
  )
}

import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import axios from 'axios';
import './Scheduler.css';


const scheduler = window.scheduler;

export default class Scheduler extends Component {

  initSchedulerEvents() {
    if (scheduler._$initialized) {
      return;
    }

    const onDataUpdated = this.props.onDataUpdated;

    scheduler.attachEvent('onEventAdded', (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated('create', ev, id);
        
      }

      scheduler.attachEvent('onEventCreated', function(id, e){
        var input = e.getElementsByTagName('input')[0];
        input.style.color = 'red'; // Change the color of the input element
      });
      

      // Save the new event to the backend
      axios.post('http://localhost:8082/Event/save', ev)
        .then(response => {
          console.log('Event saved:', response.data);
        })
        .catch(error => {
          console.error('Error saving event:', error);
        });
    });

    scheduler.attachEvent('onEventChanged', (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated('update', ev, id);
      }

      // Update the changed event in the backend
      axios.put(`http://localhost:8082/Event/${id}`, ev)
        .then(response => {
          console.log('Event updated:', response.data);
        })
        .catch(error => {
          console.error('Error updating event:', error);
        });
    });

    scheduler.attachEvent('onEventDeleted', (id, ev) => {
      if (onDataUpdated) {
        onDataUpdated('delete', ev, id);
      }

      // Delete the event from the backend
      axios.delete(`http://localhost:8082/Event/${id}`)
        .then(response => {
          console.log('Event deleted:', response.data);
        })
        .catch(error => {
          console.error('Error deleting event:', error);
        });
    });


    scheduler._$initialized = true;
  }

  componentDidMount() {
    scheduler.skin = 'material';
    scheduler.config.header = [
      'day',
      'week',
      'month',
      'date',
      'prev',
      'today',
      'next'
    ];
    scheduler.config.hour_date = '%g:%i %A';
    scheduler.config.time_step = 30; // set
  
    // set the width of the time scale column
    scheduler.xy.scale_width = 100;
  
    // set the height of the time scale labels
    scheduler.config.hour_size_px = 88;

    
    // // change color of event 
    // scheduler.templates.event_class = function(start, end, event) {
    //   return 'my-event-class';
    // };
      //change color the tect of event
    // scheduler.templates.event_text = function(start, end, event) {
    //   return "<span style='color:black'>" + event.text + "</span>";
    // };
    

    

    // set the height of each event row

  
    this.initSchedulerEvents();
    
  
    const { events } = this.props;
    scheduler.init(this.schedulerContainer, new Date());
    scheduler.clearAll();
    scheduler.parse(events);
    this.fetchEvents();
  }
  
  
  
  fetchEvents = async () => {
    const response = await fetch('http://localhost:8082/Event');
    const events = await response.json();
    scheduler.parse(events);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.timeFormatState !== nextProps.timeFormatState;
  }

  componentDidUpdate() {
    scheduler.render();
  }

  setHoursScaleFormat(state) {
    scheduler.config.hour_date = state ? '%H:%i' : '%g:%i %A';
    scheduler.templates.hour_scale = scheduler.date.date_to_str(scheduler.config.hour_date);
  }

  render() {
    const { timeFormatState } = this.props;
    this.setHoursScaleFormat(timeFormatState);
    return (
      <div
        ref={(input) => { this.schedulerContainer = input }}
        style={{ width: '100%', height: '106%' }}
      ></div>
    );
  }
}

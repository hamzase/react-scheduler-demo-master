import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import axios from 'axios';

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

            // Save the new event to the backend
            axios.post('http://localhost:8082/Event/save', ev)
                .then(response => {
                    console.log('Event saved:', response.data);
                })
                .catch(error => {
                    console.error('Error saving event:', error);
                });
        });

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
        scheduler.xy.scale_width = 70;

        this.initSchedulerEvents();

        const { events } = this.props;
        scheduler.init(this.schedulerContainer, new Date());
        scheduler.clearAll();
        scheduler.parse(events);
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
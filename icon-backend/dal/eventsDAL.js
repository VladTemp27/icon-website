const mongoose = require('mongoose');
const Event = require('../models/Event.model.js')

async function createEvent(eventData, userId) {
    try {
        validateEventData(eventData)
        const event = new Event({
            ...eventData,
            createdBy: userId,
        });

        const savedEvent = await event.save();
        console.log('Event created successfully:', savedEvent);
        return savedEvent;
    }catch (error) {
        console.error('Event creation failed:', error.message);
        throw error
    }
}

async function getEventById(eventId){
    try {
        const event = await Event.getById(eventId)
        return event;
    } catch (error) {
        console.error('Error fetching event by ID:', error.message);
        throw error; 
    }
}

async function getAllEvents() {
    try {
        const events = await Event.getAll()
        return events
    }catch (error) {
        console.error('Error fetching all events:', error.message);
        throw error; 
    }
}

async function getActiveEvents() {
    try{
        const events = await Event.getOnFilter({ isActive: true })
        return events;
    }catch (error) {
        console.error('Error fetching active events:', error.message);
        throw error; 
    }
}

async function getNonActiveEvents() {
    try {
        const events = await Event.getOnFilter({ isActive: false })
        return events;
    } catch (error) {
        console.error('Error fetching non-active events:', error.message);
        throw error; 
    }
}

async function getEventsOnFilter(filter) {
    try {
        const events = await Event.getOnFilter(filter)
        return events;
    } catch (error) {
        console.error('Error fetching events on filter:', error.message);
        throw error; 
    }
}

async function deleteEventById(eventId) {
    try {
        const deletedEvent = await Event.deleteById(eventId);
        return deletedEvent;
    } catch (error) {
        console.error('Error deleting event by ID:', error.message);
        throw error; 
    }
}

async function updateEventById(eventId, eventData, userId) {
    try {
        validateEventData(eventData);
        const updatedEvent = await Event.modify(
            eventId,
            eventData,
            userId
        ).populate('createdBy', 'name username')
         .populate('modifiedBy', 'name username')
         .populate('organizers', 'name username')
         .populate('attendees', 'name username')
         .populate('teams.members', 'name username');

        if (!updatedEvent) {
            throw new Error('Event not found');
        }

        return updatedEvent;
    } catch (error) {
        console.error('Error updating event by ID:', error.message);
        throw error; 
    }
}

function validateEventData(eventData) {
    if (!eventData.name){
        throw new Error('Event name is required');
    }

    if (!eventData.description) {
        throw new Error('Event description is required');
    }

    if (!eventData.date) {
        throw new Error('Event date is required');
    }

    if(!eventData.createdBy){
        throw new Error ('Event must have a creator')
    }

    if(!eventData.organizingCommittee) {
        throw new Error('Event must have an organizing committee');
    }
}   


module.exports = {
    createEvent,
    getEventById,
    getAllEvents,
    getActiveEvents,
    getNonActiveEvents,
    getEventsOnFilter,
    deleteEventById,
    updateEventById
}
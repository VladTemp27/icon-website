const mongoose = require('mongoose');
const Event = require('../models/Event.model.js')

async function createEvent(eventData, userId, role) {
    
}

async function getEventById(eventId, role){

}

async function getAllEvents(role) {

}

async function getActiveEvents(role) {
    
}

async function getNonActiveEvents(role) {

}

async function getEventsOnFilter(filter, role) {

}

async function deleteEventById(eventId, role) {
}

async function updateEventById(eventId, eventData, userId ,role) {

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
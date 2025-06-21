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

function checkRole(role, requiredRole) {
    if (role !== requiredRole) {
        throw new Error(`Unauthorized: ${role} does not have permission to perform this action`);
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
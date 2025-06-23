const {
    createEvent,
    getEventById,
    getAllEvents,
    getActiveEvents,
    getNonActiveEvents,
    getEventsOnFilter,
    deleteEventById,
    updateEventById
} = require('../../dal/eventsDAL.js')

async function handleCreate(req, res) {
    console.log('Received request to create event:', req.body);
    const { eventData } = req.body;
    const userId = req.user.id.trim(); // Assuming user ID is available in req.user
    console.log('User ID:', userId);
    try {
        const newEvent = await createEvent(eventData, userId);
        res.status(201).json(newEvent);
    } catch (error) {
        console.error('Error creating event:', error.message);
        res.status(500).json({ error: 'Failed to create event' });
    }
}

async function handleGetById(req, res) {
    const { eventId } = req.params;
    console.log('Received request to get event by ID:', eventId);

    try {
        const event = await getEventById(eventId);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event by ID:', error.message);
        res.status(500).json({ error: 'Failed to fetch event' });
    }
}

async function handleGetAll(req, res) {
    console.log('Received request to get all events');

    try {
        const events = await getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching all events:', error.message);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
}

async function handleGetActive(req, res) {
    console.log('Received request to get active events');

    try {
        const activeEvents = await getActiveEvents();
        res.status(200).json(activeEvents);
    } catch (error) {
        console.error('Error fetching active events:', error.message);
        res.status(500).json({ error: 'Failed to fetch active events' });
    }
}

async function handleGetNonActive(req, res) {
    console.log('Received request to get non-active events');

    try {
        const nonActiveEvents = await getNonActiveEvents();
        res.status(200).json(nonActiveEvents);
    } catch (error) {
        console.error('Error fetching non-active events:', error.message);
        res.status(500).json({ error: 'Failed to fetch non-active events' });
    }
}

async function handleDeletebyEventId(req, res) {
    const { eventId } = req.params;
    console.log('Received request to delete event by ID:', eventId);

    try {
        const deletedEvent = await deleteEventById(eventId);
        if (!deletedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        console.error('Error deleting event by ID:', error.message);
        res.status(500).json({ error: 'Failed to delete event' });
    }
}

async function handleUpdateByEventId(req, res) {
    const { eventId } = req.params;
    const { eventData } = req.body;
    const userId = req.user._id; 
    console.log('Received request to update event by ID:', eventId);

    try {
        const updatedEvent = await updateEventById(eventId, eventData);
        if (!updatedEvent) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(updatedEvent);
    } catch (error) {
        console.error('Error updating event by ID:', error.message);
        res.status(500).json({ error: 'Failed to update event' });
    }
}

module.exports = {
    handleCreate,
    handleGetById,
    handleGetAll,
    handleGetActive,
    handleGetNonActive,
    handleDeletebyEventId,
    handleUpdateByEventId
}
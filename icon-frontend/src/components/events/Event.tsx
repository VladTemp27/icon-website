import { Card, Typography, Avatar, Space, Tag, Button, Row, Col, Empty, Skeleton } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const { Title, Text, Paragraph } = Typography;

interface Event {
  _id: string;
  name: string;
  description: string;
  date: string;
  points: number;
  attendees: string[];
  organizingCommittee: string[];
  organizers: Array<{
    _id: string;
    username: string;
  }>;
  isPublic: boolean;
  isActive: boolean;
  createdBy: {
    _id: string;
    username: string;
  };
  isTeamEvent: boolean;
  teams: string[];
}

interface EventProps {
  dashboardMode?: boolean;
  maxItems?: number;
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
}

function Event({ 
  dashboardMode = false,
  maxItems,
  showHeader = true,
  title = "Active Events",
  subtitle = "Don't miss out on these exciting events"
}: EventProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<string>('');

  useEffect(() => {
    fetchEvents();
    getCurrentUser();
  }, []); // Add dependency array to prevent infinite loop

  const getCurrentUser = () => {
    const username = localStorage.getItem('username') || 'current_user';
    setCurrentUser(username);
  };

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await axios.get(`http://localhost:1525/api/events/active`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      let eventData = response.data;
      
      // Limit items if maxItems is specified
      if (maxItems) {
        eventData = eventData.slice(0, maxItems);
      }
      
      setEvents(eventData);
    } catch (error) {
      console.error('Error fetching events:', error);
      // Mock data matching your API structure
      let mockEvents: Event[] = [
        {
          _id: '1',
          name: 'Web Development Workshop',
          description: 'Learn the basics of HTML, CSS, and JavaScript in this hands-on workshop for beginners.',
          date: '2025-07-15T14:00:00.000Z',
          points: 20,
          attendees: [],
          organizingCommittee: ['Frontier'],
          organizers: [{ _id: '1', username: '2233915' }],
          isPublic: true,
          isActive: true,
          createdBy: { _id: '1', username: '2233915' },
          isTeamEvent: false,
          teams: []
        }
      ];

      if (maxItems) {
        mockEvents = mockEvents.slice(0, maxItems);
      }

      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (eventId: string) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(`http://localhost:1525/api/events/${eventId}/register`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Update local state
      setEvents(prevEvents => 
        prevEvents.map(event => 
          event._id === eventId 
            ? { ...event, attendees: [...event.attendees, currentUser] }
            : event
        )
      );
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getCommitteeColor = (committee: string) => {
    const committeeColors: { [key: string]: string } = {
      'Frontier': 'blue',
      'Tech': 'green',
      'Social': 'orange',
      'Academic': 'purple',
      'Sports': 'red'
    };
    return committeeColors[committee] || 'default';
  };

  const isUserRegistered = (event: Event) => {
    return event.attendees.includes(currentUser);
  };

  if (loading) {
    return (
      <div style={{ padding: dashboardMode ? '16px' : '24px' }}>
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  return (
    <div style={{ padding: dashboardMode ? '16px' : '24px' }}>
      {/* Header */}
      {showHeader && (
        <div style={{ marginBottom: dashboardMode ? '16px' : '32px', textAlign: 'center' }}>
          <Title level={dashboardMode ? 3 : 2} style={{ color: 'white', marginBottom: '8px' }}>
            <CalendarOutlined style={{ marginRight: '12px', color: '#e9b943' }} />
            {title}
          </Title>
          {subtitle && (
            <Text style={{ 
              color: 'rgba(255, 255, 255, 0.8)', 
              fontSize: dashboardMode ? '14px' : '16px' 
            }}>
              {subtitle}
            </Text>
          )}
        </div>
      )}

      {/* Events Grid */}
      {events.length === 0 ? (
        <Card 
          style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            border: 'none',
            backdropFilter: 'blur(10px)',
            textAlign: 'center'
          }}
        >
          <Empty 
            description={
              <span style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                No active events found
              </span>
            }
          />
        </Card>
      ) : (
        <Row gutter={[16, 16]}>
          {events.map((event) => (
            <Col 
              key={event._id} 
              span={dashboardMode ? 24 : 8}
              xs={24} 
              sm={dashboardMode ? 24 : 12} 
              md={dashboardMode ? 24 : 8}
            >
              <Card
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  backdropFilter: 'blur(10px)',
                  height: '100%',
                  transition: 'all 0.3s ease'
                }}
                className="event-card"
                hoverable
              >
                {/* Event Header */}
                <div style={{ marginBottom: '16px' }}>
                  <Title 
                    level={dashboardMode ? 5 : 4} 
                    style={{ 
                      color: 'white', 
                      marginBottom: '8px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: dashboardMode ? 'nowrap' : 'normal'
                    }}
                  >
                    {event.name}
                  </Title>
                  
                  {/* Organizing Committee Tags */}
                  <Space wrap style={{ marginBottom: '12px' }}>
                    {event.organizingCommittee.map(committee => (
                      <Tag key={committee} color={getCommitteeColor(committee)}>
                        {committee}
                      </Tag>
                    ))}
                    {event.isTeamEvent && (
                      <Tag color="cyan">Team Event</Tag>
                    )}
                    {event.isPublic && (
                      <Tag color="green">Public</Tag>
                    )}
                  </Space>
                </div>

                {/* Event Details */}
                <Space direction="vertical" size="small" style={{ width: '100%', marginBottom: '16px' }}>
                  <Space>
                    <CalendarOutlined style={{ color: '#e9b943' }} />
                    <Text style={{ color: 'white', fontSize: '14px' }}>
                      {formatDate(event.date)}
                    </Text>
                  </Space>
                  
                  <Space>
                    <ClockCircleOutlined style={{ color: '#e9b943' }} />
                    <Text style={{ color: 'white', fontSize: '14px' }}>
                      {formatTime(event.date)}
                    </Text>
                  </Space>
                  
                  <Space>
                    <StarOutlined style={{ color: '#e9b943' }} />
                    <Text style={{ color: 'white', fontSize: '14px' }}>
                      {event.points} points
                    </Text>
                  </Space>
                  
                  <Space>
                    <UserOutlined style={{ color: '#e9b943' }} />
                    <Text style={{ color: 'white', fontSize: '14px' }}>
                      {event.attendees.length} attendees
                    </Text>
                  </Space>
                </Space>

                {/* Description */}
                {!dashboardMode && (
                  <Paragraph 
                    style={{ 
                      color: 'rgba(255, 255, 255, 0.8)', 
                      fontSize: '14px',
                      marginBottom: '16px'
                    }}
                    ellipsis={{ rows: 2, expandable: false }}
                  >
                    {event.description}
                  </Paragraph>
                )}

                {/* Organizers */}
                <div style={{ marginBottom: '16px' }}>
                  <Space wrap>
                    {event.organizers.map(organizer => (
                      <Space key={organizer._id}>
                        <Avatar 
                          size="small" 
                          style={{ backgroundColor: '#e9b943' }}
                        >
                          {organizer.username.substring(0, 2).toUpperCase()}
                        </Avatar>
                        <Text style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '12px' }}>
                          @{organizer.username}
                        </Text>
                      </Space>
                    ))}
                  </Space>
                </div>

                {/* Action Button */}
                <Button
                  type={isUserRegistered(event) ? "default" : "primary"}
                  icon={!isUserRegistered(event) && <PlusOutlined />}
                  onClick={() => !isUserRegistered(event) && handleRegister(event._id)}
                  disabled={isUserRegistered(event)}
                  style={{
                    width: '100%',
                    background: isUserRegistered(event) 
                      ? 'rgba(255, 255, 255, 0.1)' 
                      : 'linear-gradient(135deg, #e9b943 0%, #d4a437 100%)',
                    border: 'none',
                    color: 'white'
                  }}
                  size={dashboardMode ? 'small' : 'middle'}
                >
                  {isUserRegistered(event) ? 'Registered' : 'Register'}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <style>{`
        .event-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(233, 185, 67, 0.3) !important;
        }
      `}</style>
    </div>
  );
}

export default Event;
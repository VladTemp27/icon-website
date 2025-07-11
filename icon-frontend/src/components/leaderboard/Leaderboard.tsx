import { Table, Card, Typography, Avatar, Space, Statistic, Row, Col } from 'antd';
import { TrophyOutlined, CrownOutlined, StarOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import axios from 'axios';

const { Title, Text } = Typography;

interface LeaderboardEntry {
  username: string;
  points: number;
  rank: number;
}

interface LeaderboardProps {
  // Dashboard mode shows fewer items and no statistics
  dashboardMode?: boolean;
  // Maximum number of items to show (useful for dashboard)
  maxItems?: number;
  // Show/hide the podium section
  showPodium?: boolean;
  // Show/hide statistics cards
  showStatistics?: boolean;
  // Show/hide the header
  showHeader?: boolean;
  // Custom title
  title?: string;
  // Custom subtitle
  subtitle?: string;
}

function Leaderboard({ 
  dashboardMode = false,
  maxItems,
  showPodium = true,
  showStatistics = true,
  showHeader = true,
  title = "ICON Leaderboard",
  subtitle = "Recognition for our most active members"
}: LeaderboardProps) {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:1525/api/leaderboard', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Add rank to each entry
      let dataWithRank = response.data.map((entry: LeaderboardEntry, index: number) => ({
        ...entry,
        rank: index + 1
      }));

      // Limit items if maxItems is specified
      if (maxItems) {
        dataWithRank = dataWithRank.slice(0, maxItems);
      }
      
      setLeaderboardData(dataWithRank);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Mock data for development
      let mockData: LeaderboardEntry[] = [
        { username: 'john_doe', points: 1250, rank: 1 },
        { username: 'jane_smith', points: 1100, rank: 2 },
        { username: 'mike_j', points: 980, rank: 3 },
        { username: 'sarah_w', points: 875, rank: 4 },
        { username: 'alex_b', points: 750, rank: 5 },
        { username: 'chris_k', points: 650, rank: 6 },
        { username: 'emma_l', points: 580, rank: 7 },
      ];

      // Limit mock data if maxItems is specified
      if (maxItems) {
        mockData = mockData.slice(0, maxItems);
      }

      setLeaderboardData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <CrownOutlined style={{ color: '#FFD700', fontSize: dashboardMode ? '16px' : '20px' }} />;
      case 2:
        return <TrophyOutlined style={{ color: '#C0C0C0', fontSize: dashboardMode ? '14px' : '18px' }} />;
      case 3:
        return <TrophyOutlined style={{ color: '#CD7F32', fontSize: dashboardMode ? '14px' : '18px' }} />;
      default:
        return <span style={{ fontSize: dashboardMode ? '12px' : '16px', fontWeight: 'bold', color: '#666' }}>#{rank}</span>;
    }
  };

  const getRowClassName = (record: LeaderboardEntry) => {
    if (record.rank === 1) return 'rank-first';
    if (record.rank === 2) return 'rank-second';
    if (record.rank === 3) return 'rank-third';
    return '';
  };

  const columns = [
    {
      title: 'Rank',
      dataIndex: 'rank',
      key: 'rank',
      width: dashboardMode ? 60 : 80,
      align: 'center' as const,
      render: (rank: number) => getRankIcon(rank)
    },
    {
      title: 'Username',
      key: 'username',
      render: (record: LeaderboardEntry) => (
        <Space>
          <Avatar 
            size={dashboardMode ? 32 : 40}
            style={{ 
              backgroundColor: '#e9b943',
              fontSize: dashboardMode ? '12px' : '16px',
              fontWeight: 'bold'
            }}
          >
            {record.username.substring(0, 2).toUpperCase()}
          </Avatar>
          <div>
            <div style={{ 
              fontWeight: 'bold', 
              fontSize: dashboardMode ? '14px' : '16px', 
              color: 'white' 
            }}>
              @{record.username}
            </div>
          </div>
        </Space>
      )
    },
    {
      title: 'Points',
      dataIndex: 'points',
      key: 'points',
      align: 'center' as const,
      sorter: (a: LeaderboardEntry, b: LeaderboardEntry) => b.points - a.points,
      render: (points: number) => (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StarOutlined style={{ 
            color: '#e9b943', 
            marginRight: '4px',
            fontSize: dashboardMode ? '12px' : '14px'
          }} />
          <span style={{ 
            fontWeight: 'bold', 
            fontSize: dashboardMode ? '14px' : '16px', 
            color: 'white' 
          }}>
            {points.toLocaleString()}
          </span>
        </div>
      )
    }
  ];

  const topThree = leaderboardData.slice(0, 3);
  const totalMembers = leaderboardData.length;
  const totalPoints = leaderboardData.reduce((sum, member) => sum + member.points, 0);
  const avgPoints = totalMembers > 0 ? Math.round(totalPoints / totalMembers) : 0;

  return (
    <div style={{ padding: dashboardMode ? '16px' : '24px' }}>
      {/* Header */}
      {showHeader && (
        <div style={{ marginBottom: dashboardMode ? '16px' : '32px', textAlign: 'center' }}>
          <Title level={dashboardMode ? 3 : 2} style={{ color: 'white', marginBottom: '8px' }}>
            <TrophyOutlined style={{ marginRight: '12px', color: '#e9b943' }} />
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

      {/* Statistics Cards */}
      {showStatistics && !dashboardMode && (
        <Row gutter={[16, 16]} style={{ marginBottom: '32px' }}>
          <Col span={8}>
            <Card style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', textAlign: 'center' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Members</span>}
                value={totalMembers}
                valueStyle={{ color: '#e9b943', fontSize: '28px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', textAlign: 'center' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Points</span>}
                value={totalPoints}
                valueStyle={{ color: '#52c41a', fontSize: '28px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', textAlign: 'center' }}>
              <Statistic
                title={<span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Avg Points</span>}
                value={avgPoints}
                valueStyle={{ color: '#eb2f96', fontSize: '28px', fontWeight: 'bold' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* Top 3 Podium */}
      {showPodium && !dashboardMode && topThree.length >= 3 && (
        <Card 
          style={{ 
            background: 'rgba(255, 255, 255, 0.1)', 
            border: 'none', 
            marginBottom: '24px',
            backdropFilter: 'blur(10px)'
          }}
        >
          <Title level={4} style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
            🏆 Top Performers 🏆
          </Title>
          <Row gutter={[24, 24]} justify="center">
            {/* Second Place */}
            <Col span={6} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <TrophyOutlined style={{ fontSize: '40px', color: '#C0C0C0' }} />
              </div>
              <Avatar size={64} style={{ backgroundColor: '#C0C0C0', fontSize: '24px', marginBottom: '8px' }}>
                {topThree[1]?.username.substring(0, 2).toUpperCase()}
              </Avatar>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                @{topThree[1]?.username}
              </div>
              <div style={{ color: '#e9b943', fontSize: '18px', fontWeight: 'bold' }}>
                {topThree[1]?.points} pts
              </div>
            </Col>

            {/* First Place */}
            <Col span={6} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <CrownOutlined style={{ fontSize: '50px', color: '#FFD700' }} />
              </div>
              <Avatar size={80} style={{ backgroundColor: '#FFD700', fontSize: '28px', marginBottom: '8px' }}>
                {topThree[0]?.username.substring(0, 2).toUpperCase()}
              </Avatar>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
                @{topThree[0]?.username}
              </div>
              <div style={{ color: '#e9b943', fontSize: '20px', fontWeight: 'bold' }}>
                {topThree[0]?.points} pts
              </div>
            </Col>

            {/* Third Place */}
            <Col span={6} style={{ textAlign: 'center' }}>
              <div style={{ marginBottom: '16px' }}>
                <TrophyOutlined style={{ fontSize: '40px', color: '#CD7F32' }} />
              </div>
              <Avatar size={64} style={{ backgroundColor: '#CD7F32', fontSize: '24px', marginBottom: '8px' }}>
                {topThree[2]?.username.substring(0, 2).toUpperCase()}
              </Avatar>
              <div style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>
                @{topThree[2]?.username}
              </div>
              <div style={{ color: '#e9b943', fontSize: '18px', fontWeight: 'bold' }}>
                {topThree[2]?.points} pts
              </div>
            </Col>
          </Row>
        </Card>
      )}

      {/* Full Leaderboard Table */}
      <Card 
        style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          border: 'none',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Table
          columns={columns}
          dataSource={leaderboardData}
          rowKey="username"
          loading={loading}
          pagination={dashboardMode ? false : {
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} members`
          }}
          rowClassName={getRowClassName}
          style={{ background: 'transparent' }}
          size={dashboardMode ? 'small' : 'middle'}
        />
      </Card>

      <style>{`
        .ant-table {
          background: transparent !important;
        }
        .ant-table-thead > tr > th {
          background: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
        .ant-table-tbody > tr > td {
          background: rgba(255, 255, 255, 0.05) !important;
          color: white !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
        }
        .ant-table-tbody > tr:hover > td {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .rank-first > td {
          background: rgba(255, 215, 0, 0.2) !important;
        }
        .rank-second > td {
          background: rgba(192, 192, 192, 0.2) !important;
        }
        .rank-third > td {
          background: rgba(205, 127, 50, 0.2) !important;
        }
        .ant-pagination .ant-pagination-item {
          background: rgba(255, 255, 255, 0.1) !important;
          border: 1px solid rgba(255, 255, 255, 0.2) !important;
        }
        .ant-pagination .ant-pagination-item a {
          color: white !important;
        }
      `}</style>
    </div>
  );
}

export default Leaderboard;

// Compact Usage
{/* 
    <Leaderboard 
  dashboardMode={true}
  maxItems={5}
  showPodium={false}
  showStatistics={false}
  title="Top Members"
  subtitle="Current leaders"
/> 
*/}

// Minimal Usage
{/*

<Leaderboard 
  dashboardMode={true}
  maxItems={10}
  showHeader={false}
  showPodium={false}
  showStatistics={false}
/>

*/}


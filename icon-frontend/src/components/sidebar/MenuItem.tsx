import { useNavigate } from 'react-router';

import {
  DashboardOutlined,
  MoneyCollectOutlined,
  FundViewOutlined,
  CalendarOutlined,
  BellOutlined
} from '@ant-design/icons';

function useMenuItems() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');

    const executiveMenuItems = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        icon: <DashboardOutlined style={{fontSize: '20px'}} />,
        onClick: () => navigate('/home/dashboard')
    },
    {
        key: 'events',
        label: 'Events',
        icon: <CalendarOutlined style={{fontSize: '20px'}}/>,
        onClick: () => navigate('/home/events')
    },
    {
        key: 'leaderboards',
        label: 'Leaderboards',
        icon: <FundViewOutlined style={{fontSize: '20px'}}/>,
        onClick: () => navigate('/home/leaderboards')
    },
    {
        key: 'payments', 
        label: 'Payments',
        icon: <MoneyCollectOutlined style={{fontSize: '20px'}}/>,
        onClick: () => navigate('/home/payments')
    },
    {
        key: 'announcements',
        label: 'Announcements',
        icon: <BellOutlined style={{fontSize: '20px'}}/>,
        onClick: () => navigate('/home/announcements')
    }
]

const memberMenuItems = [
    {
        key: 'events',
        label: 'Events',
        icon: <CalendarOutlined  style={{fontSize: '20px'}}/>,
        onClick: () => navigate('/home/events')
    },
    {
        key: 'leaderboards',
        label: 'Leaderboards',
        icon: <FundViewOutlined  style={{fontSize: '20px'}}/>,
        onClick: () => navigate('/home/leaderboards')
    },
    {
        key: 'payments', 
        label: 'Payments',
        icon: <MoneyCollectOutlined  style={{fontSize: '20px'}}/>,
        onClick: () => navigate('/home/payments')
    },
    {
        key: 'announcements',
        label: 'Announcements',
        icon: <BellOutlined  style={{fontSize: '20px'}}/>,
        onClick: () => navigate('/home/announcements')
    }
]


    switch( role ) {
        case 'executive':
            return executiveMenuItems
        case 'officer':
            break;
        case 'member':
            return memberMenuItems
    }
}

export default useMenuItems;
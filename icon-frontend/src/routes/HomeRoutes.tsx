import { Route } from 'react-router';

import HomeLayout from '../components/layout/HomeLayout';
import {RequireAuth} from '../util/authUtils'

import { IndexRedirect, CheckRole } from '../util/home-router-helper';
import Loading from '../pages/Loading';

import Leaderboard from '../components/leaderboard/Leaderboard';
import Event from '../components/events/Event';

const HomeRoutes = (
        <Route path='/home' element={<RequireAuth><HomeLayout /></RequireAuth>}>
            <Route index element={<IndexRedirect/>} />
            <Route path='dashboard' element={<CheckRole requiredRole={['executive, officer']}><Loading/></CheckRole>} />
            <Route path='settings' element={<h1>Settings</h1>} />
            <Route path='profile' element={<h1>Profile</h1>} />
            <Route path='help' element={<h1>Help</h1>} />
            <Route path='events' element={<Event/>} />
            <Route path='leaderboards' element={<Leaderboard/>} />
            <Route path='payments' element={<h1>Payments</h1>} />
            <Route path='announcements' element={<h1>Announcements</h1>} />
        </Route>
    )


export default HomeRoutes;
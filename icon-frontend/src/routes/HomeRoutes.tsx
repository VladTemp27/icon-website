import { Route } from 'react-router';

import HomeLayout from '../components/layout/HomeLayout';
import {RequireAuth} from '../util/authUtils'

import { IndexRedirect, CheckRole } from '../util/home-router-helper';
import Loading from '../pages/Loading';

const HomeRoutes = (
        <Route path='/home' element={<RequireAuth><HomeLayout /></RequireAuth>}>
            <Route index element={<IndexRedirect/>} />
            <Route path='dashboard' element={<CheckRole requiredRole={['executive, officer']}><Loading/></CheckRole>} />
            <Route path='settings' element={<h1>Settings</h1>} />
            <Route path='profile' element={<h1>Profile</h1>} />
            <Route path='help' element={<h1>Help</h1>} />
            <Route path='events' element={<h1>Events</h1>} />
            <Route path='leaderboards' element={<h1>Leaderboards</h1>} />
            <Route path='payments' element={<h1>Payments</h1>} />
            <Route path='announcements' element={<h1>Announcements</h1>} />
        </Route>
    )


export default HomeRoutes;
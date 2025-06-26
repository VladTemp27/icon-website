import { Route, Routes } from 'react-router';

import HomeLayout from '../components/layout/HomeLayout';
import {RequireAuth} from '../util/authUtils'

const HomeRoutes = (
        <Route path='/home' element={<RequireAuth><HomeLayout /></RequireAuth>}>
            <Route index element={<h1>Home</h1>} />
            <Route path='dashboard' element={<h1>Dashboard</h1>} />
            <Route path='settings' element={<h1>Settings</h1>} />
            <Route path='profile' element={<h1>Profile</h1>} />
            <Route path='help' element={<h1>Help</h1>} />
        </Route>
    )


export default HomeRoutes;
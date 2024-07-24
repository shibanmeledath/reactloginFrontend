
import { Routes, Route, Navigate } from 'react-router-dom';
import RegisterLayout from './layouts/RegisterLayout';
import HomeLayout from './layouts/HomeLayout';
import NotFound from './features/NotFound';
import Home from './features/Home';
import RegisterForm from './features/Register';
import LoginForm from './features/Login';
import Logout from './features/Logout';


const App = () => {


    return (
        <div id="root">
            <div className="content">
                <Routes>
                    <Route path='/' element={<RegisterLayout />}>
                        <Route index element={<RegisterForm />} />
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    <Route path="/home" element={ <HomeLayout />}>
                        <Route index element={ <Home /> } />
                        <Route path='/home/logout' element={<Logout />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;

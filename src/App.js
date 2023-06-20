import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import LoginForm from './pages/LoginForm';
import RegisterForm from './pages/RegisterForm';
import Dashboard from './pages/Dashboard';
import Home from './components/Home';
import CalendarView from './components/CalendarView';
import Team from './components/Team';
import User1 from './components/User1';
import User2 from './components/User2';
import User3 from './components/User3';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/dashboard/*" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
            <Route path='home' element={<Home />} />
            <Route path="calendar" element={<CalendarView />} />
            <Route path='team' element={<Team />} />
            <Route path="user1" element={<User1 />} />
            <Route path="user2" element={<User2 />} />
            <Route path="user3" element={<User3 />} />
          </Route>
          <Route path='*' element={<h1>404</h1>} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;

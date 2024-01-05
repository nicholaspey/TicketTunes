import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import EventInfo from './pages/EventInfo';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import Error from './pages/Error';
import Registration from './pages/Registration';
import EventInfoError from './pages/EventInfoError';
import EventInfo1 from './pages/EventInfo1';
import SeatSelection from './pages/checkoutforms/SeatSelection'
import Logout from './pages/Logout';

class App extends Component {
    render() {
        return (
            <Router>
                <Routes>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                    <Route path="/eventinfo" element={<EventInfo />}/>
                    <Route path="/eventinfo1/:id" element={<EventInfo1/>}/>
                    {/* <Route path="/eventinfo" element={<EventInfo/>}/> */}
                    <Route path = "/error" element = {<Error/>}/>
                    <Route path = "/eventinfo/notfound" element = {<EventInfoError/>}/>
                    <Route path="/checkout/:transactionId" element={<Checkout />} />
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/seatSelection" element={<SeatSelection/>}/>
                    <Route path = "/logout" element = {<Logout/>}></Route>
                    <Route path="/seatSelection" element={<SeatSelection />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
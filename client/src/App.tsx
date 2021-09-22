import React, {useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider, useDispatch} from "react-redux";
import store from "./redux/redux-store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {useRoutesContent} from "./hooks/content-routes";
import {getDataUserThunk} from "./redux/user-data-page";
import "./app.css"

const StreetTrafficProject = () => {
    return (
        <Router>
            <Provider store={store}>
                    <App/>
            </Provider>
        </Router>
    )
};

const App = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataUserThunk())
    })

    const content = useRoutesContent()

    return (
        <div className="wrapper">
            <Header/>
            <div className="main">{content}</div>
            <Footer/>
        </div>
    )
}

export default StreetTrafficProject;

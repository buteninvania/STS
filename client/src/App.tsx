import React, {useEffect, useState} from 'react';
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

    const [headerAbsolutePosition, setHeaderAbsolutePosition] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDataUserThunk())
    })

    const content = useRoutesContent()

    const test = (e: React.WheelEvent) => {
        if(window.pageYOffset < 80) {
            return setHeaderAbsolutePosition(false)
        }
        return e.deltaY > 0 ? setHeaderAbsolutePosition(true) : null
    }

    return (
        <div className="wrapper" onWheel={(e) => test(e)}>
            <Header position={headerAbsolutePosition}/>
            <div className="main">{content}</div>
            <Footer/>
        </div>
    )
}

export default StreetTrafficProject;

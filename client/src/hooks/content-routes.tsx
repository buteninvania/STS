import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom';
import Home from "../components/home/Home";
import Authorization from "../components/authorization/Аuthorization";
import PlaygroundsList from "../components/playground/PlaygroundsList";
import AddPlaygroundForm from "../forms/AddPlaygroundForm";
import Teams from "../components/team/Teams";
import Players from "../components/players/Players";
import Playground from "../components/playground/Playground";
import TeamPage from "../components/team/TeamPage";
import {AdminEvent} from '../components/admin-event/AdminEvent';

export const useRoutesContent = () => {
    return (
        <Switch>
            <Route path="/home/:name" exact component={Home}/>
            <Route path="/playground/:name" exact component={Playground}/>
            <Route path="/team/:teamId" exact component={TeamPage}/>
            <Route path="/home" exact component={Home}/>
            <Route path="/register" exact component={Authorization}/>
            <Route path="/playground" exact component={PlaygroundsList}/>
            <Route path="/addplayground" exact component={AddPlaygroundForm}/>
            <Route path="/team" exact component={Teams}/>
            <Route path="/adminevent" exact component={AdminEvent}/>
            <Route path="/players" exact component={Players}/>
            <Redirect to="/home"/>
        </Switch>
    )
}
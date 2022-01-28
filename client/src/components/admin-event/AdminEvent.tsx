import React, {useEffect} from 'react';
import {getAdminEventsTC} from '../../redux/events-admin/events-admin-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {
    getAdminEventsGamesSelector,
    getAdminEventsLoaderSelector,
    getAdminEventsPlaygroundSelector, getAdminEventsTeamsSelector
} from '../../redux/events-admin/events-admin-selector';
import {AppStateType} from '../../redux/redux-store';
import Preloader from '../preloader/Preloader';
import {
    AdminEventsStateType,
    GameAdminEventType,
    PlaygroundAdminEventType, TeamAdminEventType
} from '../../redux/events-admin/events-admin-reducer.types';
import {AdminEventsList} from './AdminEventsList';
import {sendResponseEventAdminThunk} from '../../redux/events-page';

export const AdminEvent: React.FC = React.memo(({}) => {

    const dispatch = useDispatch()

    const loader = useSelector<AppStateType, boolean>(getAdminEventsLoaderSelector)
    const playgroundEvents = useSelector<AppStateType, Array<PlaygroundAdminEventType>>(getAdminEventsPlaygroundSelector)
    const gameEvents = useSelector<AppStateType, Array<GameAdminEventType>>(getAdminEventsGamesSelector)
    const teamEvents = useSelector<AppStateType, Array<TeamAdminEventType>>(getAdminEventsTeamsSelector)

     const adminResponseSendingHandler = (eventId: string, response: boolean) => {
         dispatch(sendResponseEventAdminThunk(eventId, response))
     }

    console.log('Admin events page')

    useEffect(() => {
        dispatch(getAdminEventsTC())
    }, [dispatch])

    return (
        <div>
            {loader && <Preloader/>}
            {playgroundEvents.length > 0 && <AdminEventsList title={'Playground events'}
                                                             events={playgroundEvents}
                                                             callBack={adminResponseSendingHandler}/>}
            {teamEvents.length > 0 && <AdminEventsList title={'Team events'}
                                                       events={teamEvents}
                                                       callBack={adminResponseSendingHandler}/>}
            {gameEvents.length > 0 && <AdminEventsList title={'Game events'}
                                                       events={gameEvents}
                                                       callBack={adminResponseSendingHandler}/>}
        </div>
    )
})


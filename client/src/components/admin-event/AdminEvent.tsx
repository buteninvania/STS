import React, {useEffect} from 'react';
import {getAdminEventsTC} from '../../redux/events-admin/events-admin-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {getAdminEventsLoaderSelector} from '../../redux/events-admin/events-admin-selector';
import {AppStateType} from '../../redux/redux-store';
import Preloader from '../preloader/Preloader';

export const AdminEvent: React.FC = React.memo(({}) => {

    const dispatch = useDispatch()

    const loader = useSelector<AppStateType, boolean>(getAdminEventsLoaderSelector)

    // const adminResponseSendingHandler = (eventId: string, response: boolean) => {
    //     dispatch(sendResponseEventAdminThunk(eventId, response))
    // }

    console.log('Admin events page')

    useEffect(() => {
        dispatch(getAdminEventsTC())
        return () => {}
    }, [dispatch])

    return (
        <div>
            {loader && <Preloader/>}
        </div>
    )
})


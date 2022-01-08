import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getEventsThunk, sendResponseEventAdminThunk} from '../../redux/events-page';
import {getPlaygroundsSelector} from '../../redux/events-data-selector';

const AdminEventTeam: React.FC<AdminEventTeamPropsDataType> = ({
                                                                   eventId,
                                                                   name,
                                                                   fullName,
                                                                   leader,
                                                                   type,
                                                                   adminResponseSendingHandler
                                                               }) => {
    return (
        <div>
            {name} {fullName} {leader} {type}
            <button onClick={() => adminResponseSendingHandler(eventId, true)}>Разрешить</button>
            <button onClick={() => adminResponseSendingHandler(eventId, false)}>Отклонить</button>
        </div>
    )
}
const AdminEventGame: React.FC<AdminEventGamePropsDataType> = ({
                                                                   type,
                                                                   gameType,
                                                                   date,
                                                                   enemyTeam,
                                                                   userTeam,
                                                                   playground,
                                                                   VS,
                                                                   eventId,
                                                                   adminResponseSendingHandler
                                                               }) => {
    return (
        <div>
            {`Тип: ${type} Команда №1 - ${userTeam} против ${enemyTeam} тип игры - ${gameType} колличество игроков (${VS}) на площадке ${playground} дата: ${date}`}
            <button onClick={() => adminResponseSendingHandler(eventId, true)}>Разрешить</button>
            <button onClick={() => adminResponseSendingHandler(eventId, false)}>Отклонить</button>
        </div>
    )
}
const AdminEventPlayground: React.FC<AdminEventPlaygroundPropsDataType> = ({
                                                                               type,
                                                                               city,
                                                                               address,
                                                                               institution,
                                                                               name,
                                                                               eventId,
                                                                               adminResponseSendingHandler
                                                                           }) => {
    return (
        <div>
            Тип события: {type},
            {`Город: ${city}`}
            {`Адрес площадки: ${address}`}
            {`Учреждение площадки: ${institution}`}
            {`Отоброжаемое имя: ${name}`}
            <button onClick={() => adminResponseSendingHandler(eventId, true)}>Разрешить</button>
            <button onClick={() => adminResponseSendingHandler(eventId, false)}>Отклонить</button>
        </div>
    )
}


const AdminEvent: React.FC = () => {

    const dispatch = useDispatch()
    const events = useSelector(getPlaygroundsSelector)

    const adminResponseSendingHandler = (eventId: string, response: boolean) => {
        dispatch(sendResponseEventAdminThunk(eventId, response))
    }

    console.log('AdminEvent')

    useEffect(() => {
        dispatch(getEventsThunk())
    }, [])

    return (
        <div>
            События администратора
            {
                (events.length > 0) ? events.map((item, index) => {
                    switch (item.type) {
                        case 'team':
                            return <AdminEventTeam eventId={item.id}
                                                   adminResponseSendingHandler={adminResponseSendingHandler}
                                                   type={item.type} key={index} fullName={item.fullName} name={item.name}
                                                   leader={item.leader}/>
                        case 'game':
                            return <AdminEventGame type={item.type} key={index} date={item.date} VS={item.VS}
                                                   gameType={item.gameType} playground={item.playground}
                                                   userTeam={item.userTeam} enemyTeam={item.enemyTeam} eventId={item.id}
                                                   adminResponseSendingHandler={adminResponseSendingHandler}/>
                        case 'playground':
                            return <AdminEventPlayground type={item.type} key={index} eventId={item.id} name={item.name}
                                                         city={item.city} institution={item.institution}
                                                         address={item.address}
                                                         adminResponseSendingHandler={adminResponseSendingHandler}/>
                    }}) : <div>ничего нет</div>
            }
        </div>
    )
}

export default AdminEvent;

type AdminEventTeamPropsDataType = {
    adminResponseSendingHandler: (eventId: string, response: boolean) => void,
    name: string,
    fullName: string | null,
    leader: string | null,
    type: string,
    eventId: string
}
type AdminEventGamePropsDataType = {
    adminResponseSendingHandler: (eventId: string, response: boolean) => void,
    eventId: string
    type: string
    userTeam: string | null
    enemyTeam: string | null
    gameType: string | null
    VS: string | null
    playground: string | null
    date: string | null
}
type AdminEventPlaygroundPropsDataType = {
    adminResponseSendingHandler: (eventId: string, response: boolean) => void
    type: string
    city: string | null
    address: string | null
    institution: string | null
    name: string
    eventId: string
}

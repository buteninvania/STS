import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEventsThunk, sendResponseEventAdminThunk} from "../../redux/events-page";
import {getPlaygroundsSelector} from "../../redux/events-data-selector";

const AdminEventTeam: React.FC<AdminEventTeamPropsDataType> = ({eventId, name, fullName, leader, type, adminResponseSendingHandler}) => {
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
                                                                   VS
                                                               }) => {
    return (
        <div>
            {`Тип: ${type} Команда №1 - ${userTeam} против ${enemyTeam} тип игры - ${gameType} колличество игроков (${VS}) на площадке ${playground} дата: ${date}`}
        </div>
    )
}


const AdminEvent: React.FC = () => {

    const dispatch = useDispatch()
    const events = useSelector(getPlaygroundsSelector)

    const adminResponseSendingHandler = (eventId: string, response: boolean) => {
        dispatch(sendResponseEventAdminThunk(eventId, response))
    }

    useEffect(() => {
        dispatch(getEventsThunk())
    }, [])

    return (
        <div>
            События администратора
            {
                (events.length > 0) ? events.map((item, index) => {
                    if (item.type === 'team') {
                        return <AdminEventTeam eventId={item.id}
                                               adminResponseSendingHandler={adminResponseSendingHandler}
                                               type={item.type} key={index} fullName={item.fullName} name={item.name}
                                               leader={item.leader}/>
                    } else if (item.type === 'game') {
                        return <AdminEventGame type={item.type} key={index} date={item.date} VS={item.VS}
                                               gameType={item.gameType} playground={item.playground}
                                               userTeam={item.userTeam} enemyTeam={item.enemyTeam}/>
                    }
                    return <div key={index}>
                        Тип события: `{item.type}`,
                        {item.city !== undefined ? `Город: ${item.city},` : null}
                        {item.address !== undefined ? `Адрес площадки: ${item.address}` : null}
                        {item.institution !== undefined ? `Учреждение площадки: ${item.institution}` : null}
                        {item.fullName !== undefined ? `Полное название команды: ${item.fullName}` : null}
                        {item.name !== undefined ? `Отоброжаемое имя: ${item.name}` : null}
                        {item.leader !== undefined ? `Лидер: ${item.leader}` : null}
                        <button onClick={() => adminResponseSendingHandler(item.id, true)}>Разрешить</button>
                        <button onClick={() => adminResponseSendingHandler(item.id, false)}>Отклонить</button>
                    </div>
                }) : <div>ничего нет</div>
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
    type: string
    userTeam: string | null
    enemyTeam: string | null
    gameType: string | null
    VS: string | null
    playground: string | null
    date: string | null
}
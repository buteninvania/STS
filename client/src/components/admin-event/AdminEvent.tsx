import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getEventsThunk, sendResponseEventAdminThunk} from "../../redux/events-page";
import {getPlaygroundsSelector} from "../../redux/events-data-selector";

const AdminEvent: React.FC = () => {

    const dispatch = useDispatch()
    const events = useSelector(getPlaygroundsSelector)

    const responseEvent = (eventId: string, response: boolean) => {
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
                    debugger
                    return <div key={index}>
                        Тип события: `{item.type}`,
                        {item.city !== undefined ? `Город: ${item.city},` : null}
                        {item.address !== undefined ? `Адрес площадки: ${item.address}` : null}
                        {item.institution !== undefined ? `Учреждение площадки: ${item.institution}` : null}
                        {item.fullName !== undefined ? `Полное название команды: ${item.fullName}` : null}
                        {item.name !== undefined ? `Отоброжаемое имя: ${item.name}` : null}
                        {item.type === 'game' ? `Команда №1 - ${item.userTeam} против ${item.enemyTeam} тип игры - ${item.gameType} колличество игроков (${item.VS}) на площадке ${item.playground}` : null}
                        {item.date !== undefined ? `Дата: ${item.date}` : null}
                        {item.leader !== undefined ? `Лидер: ${item.leader}` : null}
                        <button onClick={() => responseEvent(item.id, true)}>Разрешить</button>
                        <button onClick={() => responseEvent(item.id, false)}>Отклонить</button>
                    </div>
                }) : <div>ничего нет</div>
            }
        </div>
    )
}

export default AdminEvent;
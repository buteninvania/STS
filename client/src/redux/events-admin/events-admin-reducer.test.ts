//Should be added to the event state
import {adminEventsReducer} from './events-admin-reducer';
import {setAdminEventsAC} from './events-admin-actions';
import {AdminEventsStateType} from './events-admin-reducer.types';

export {}

let initialState: AdminEventsStateType

beforeEach(() => {
    initialState = {
        playgroundEvents: [
            {
                id: '1',
                type: 'playground',
                city: 'Смоленск',
                address: 'Большая Советская д.17',
                institution: '7 слонов',
                name: 'На слонах',
                position: '54.784658, 32.054457',
            }
        ],
        teamEvents: [],
        gameEvents: [],
        loader: false
    }
})

/*Different events can come from the server,
  so they need to be scattered by event type*/

test('Miscellaneous events should be added to the state', () => {

    /*We will receive an array of events from the server*/

    const events = {
        playgroundEvents: [],
        teamEvents: [],
        gameEvents: [
            {
                VS: '3 X 3',
                date: 'Thu Jan 20 2022 01:07:36 GMT+0300 (Москва, стандартное время)',
                enemyTeam: 'Смоленск 3',
                gameType: 'training',
                id: '61e88bac507bc93da0746958',
                playground: '6182a402ab9bf73f0095c166',
                type: 'game',
                userTeam: 'Смоленск 1',
            }
        ],
        loader: false
    }


    const action = setAdminEventsAC(events)

    let newState = adminEventsReducer(initialState, action)

    expect(newState).not.toBe(initialState)
    expect(newState.gameEvents.length).toBe(1)
    expect(newState.gameEvents[0].type).toBe('game')
    expect(newState.teamEvents.length).toBe(0)
    expect(newState.playgroundEvents.length).toBe(0)
})
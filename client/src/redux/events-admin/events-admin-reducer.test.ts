//Should be added to the event state

let initialState: AdminEventsStateType

beforeEach(() => {
    initialState = {
        playgroundEvents: [
            {id: '1', type: 'playground', city: 'Смоленск', address: 'Большая Советская д.17', institution: '7 слонов', name: 'На слонах', position: '54.784658, 32.054457',}
        ],
        teamEvents: [],
        gameEvents: [],
    }
})

test('Should be added to the event state', () => {

})
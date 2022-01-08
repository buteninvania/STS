type AdminEventsStateType = {
    playgroundEvents: Array<PlaygroundAdminEventType>
    teamEvents: Array<TeamAdminEventType>
    gameEvents: Array<GameAdminEventType>
}
type PlaygroundAdminEventType = {
    id: string
    type: string
    city: string
    address: string
    institution: string
    name: string
    position: string
}
type TeamAdminEventType = {
    id: string
    type: string
    name: string
    fullName: string
    users: Array<string>
    leader: string
}
type GameAdminEventType = {
    id: string
    playground: string
    gameType: string
    userTeam: string
    VS: string
    enemyTeam: string
    date: string
    type: string
}
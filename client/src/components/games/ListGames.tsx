/***********************ListGames**************************/
import React from 'react';
import {GameDataType} from '../../redux/playgrounds-page';
import {GameItem} from './GameItem';

export const ListGames: React.FC<ListGamesPropsType> = React.memo(({games, deleteGame}) => {

    console.log('ListGame')

    return (
        <ul>
            {games.map(g => <GameItem key={g._id} deleteGame={deleteGame} game={g} userName={'admin'}/>)}
        </ul>
    )
})

type ListGamesPropsType = {
    games: Array<GameDataType>
    deleteGame: (playgroundID: string, gameID: string) => void
}

/**********************************************************/
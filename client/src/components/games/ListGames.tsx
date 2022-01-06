/***********************ListGames**************************/
import React from 'react';
import {GameDataType} from '../../redux/playgrounds-page';
import {GameItem} from './GameItem';

export const ListGames: React.FC<ListGamesPropsType> = ({games, deleteGame}) => {
    return (
        <ul>
            {games.map(g => <GameItem deleteGame={deleteGame} game={g} userName={'admin'}/>)}
        </ul>
    )
}

type ListGamesPropsType = {
    games: Array<GameDataType>
    deleteGame: (playgroundID: string, gameID: string) => void
}

/**********************************************************/
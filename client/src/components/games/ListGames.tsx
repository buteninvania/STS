/***********************ListGames**************************/
import React from 'react';
import {GameDataType} from '../../redux/playgrounds-page';
import {GameItem} from './GameItem';

export const ListGames: React.FC<ListGamesPropsType> = ({games}) => {
    return (
        <ul>
            {games.map(g => <GameItem game={g} userName={'admin'}/>)}
        </ul>
    )
}

type ListGamesPropsType = {
    games: Array<GameDataType>
}

/**********************************************************/
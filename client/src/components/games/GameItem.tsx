/***********************GameItem**************************/
import React from 'react';
import {GameDataType} from '../../redux/playgrounds-page';

export const GameItem: React.FC<GameItemPropsType> = ({game, userName}) => {
    return (
        <li>
            <span>{game.gameType}</span>
            {userName === 'admin' && <button>Удалить игру</button>}
        </li>
    )
}

type GameItemPropsType = {
    game: GameDataType
    userName: string
}

/**********************************************************/
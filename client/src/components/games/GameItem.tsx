/***********************GameItem**************************/
import React from 'react';
import {GameDataType} from '../../redux/playgrounds-page';

export const GameItem: React.FC<GameItemPropsType> = ({game, userName, deleteGame}) => {
    return (
        <li>
            <span>{game.gameType}</span>
            {userName === 'admin' && <button onClick={() => deleteGame(game.playground, game._id)}>Удалить игру</button>}
        </li>
    )
}

type GameItemPropsType = {
    game: GameDataType
    userName: string
    deleteGame: (playgroundID: string, gameID: string) => void
}

/**********************************************************/
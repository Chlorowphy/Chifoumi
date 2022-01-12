import { useEffect, useState } from 'react';
import './ChimoumiView.css';

/**
 * Enum for play hand
 */
enum IPlayer {
    PIERRE = 'PIERRE',
    FEUILLE = 'FEUILLE',
    CISEAU = 'CISEAU'
}

// type GameOptions = {
//     options: IPlayer;
//     winsAgaints: IPlayer[];
// };

/**
 * Enum for result
 */
enum IResult {
    WIN = 'GAGNE',
    LOSE = 'PERDU',
    EQU = 'EGALITE'
}

/**
 * Interface for game plays
 */
interface IGame {
    myGame: IPlayer;
    computerGame: IPlayer;
}

/**
 * Interface for one action round
 */
interface IAction {
    game: IGame;
    result: IResult;
}

let history: IAction[] = [];

/**
 * Create Chifoumi game
 * @returns the Chifoumi panel
 */
const ChifoumiView = (): JSX.Element => {
    const [game, setGame] = useState<IGame>({ myGame: IPlayer.PIERRE, computerGame: IPlayer.PIERRE });
    const [result, setResult] = useState(IResult.EQU);

    useEffect(() => {
        const result = findWinner(game);
        history.push({ game, result });
        setResult(result);
    }, [game]);

    return (
        <>
            <h1>Mon Chifoumi</h1>
            <h5>Choisi un jeu :</h5>
            <div id={'buttonsPanel'}>
                <button onClick={() => setGame({ myGame: IPlayer.PIERRE, computerGame: playComputer() })}>Pierre</button>
                <button onClick={() => setGame({ myGame: IPlayer.FEUILLE, computerGame: playComputer() })}>Feuille</button>
                <button onClick={() => setGame({ myGame: IPlayer.CISEAU, computerGame: playComputer() })}>Ciseau</button>
            </div>
            <div>
                <h5>Résultats :</h5>
                <p>Mon jeu : {game.myGame}</p>
                <p>Jeu ordinateur {game.computerGame}</p>
                <h3 style={{ color: result === IResult.WIN ? 'green' : result === IResult.LOSE ? 'red' : 'blue' }}>{result}</h3>
            </div>
            <div>
                <h5>Historique :</h5>
                <ul>
                    {history
                        .filter((value, index) => index !== 0)
                        .map((value: IAction, index: number) => (
                            <li key={index} id={index.toString()}>
                                Tour {index} : Mon jeu = {value.game.myGame}, ordinateur = {value.game.computerGame}, résultat = {value.result}
                            </li>
                        ))}
                </ul>
            </div>
        </>
    );
};

/**
 * Play to compute hand
 * @returns play from computer
 */
const playComputer = (): IPlayer => {
    const playValues = Object.keys(IPlayer);
    const randomIndex = Math.floor(Math.random() * playValues.length);
    return playValues[randomIndex] as IPlayer;
};

/**
 * Find the winner
 * @param currentGame the current Game
 * @returns true if user wins, false if compute wins
 */
const findWinner = (currentGame: IGame): IResult => {
    let win: IResult = IResult.LOSE;

    if (currentGame.myGame === currentGame.computerGame) {
        win = IResult.EQU;
    } else if (
        (currentGame.myGame === IPlayer.CISEAU && currentGame.computerGame === IPlayer.FEUILLE) ||
        (currentGame.myGame === IPlayer.FEUILLE && currentGame.computerGame === IPlayer.PIERRE) ||
        (currentGame.myGame === IPlayer.PIERRE && currentGame.computerGame === IPlayer.CISEAU)
    ) {
        win = IResult.WIN;
    }

    return win;
};

export default ChifoumiView;

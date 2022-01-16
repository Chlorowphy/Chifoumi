import { useEffect, useState } from 'react';
import ButtonView from './ButtonView/ButtonView';
import './ChimoumiView.css';
import { EOption, GameOptions, gameOptions, IGame } from './model/ChifoumiModel';

/**
 * Enum for result
 */
enum EResult {
    WIN = 'GAGNE',
    LOSE = 'PERDU',
    EQU = 'EGALITE'
}

/**
 * Interface for one action round
 */
interface IRound {
    game: IGame;
    result: EResult;
}

const history: IRound[] = [];

/**
 * Create Chifoumi game
 * @returns the Chifoumi panel
 */
const ChifoumiView = (): JSX.Element => {
    const [game, setGame] = useState<IGame>({ myGame: EOption.PIERRE, computerGame: EOption.PIERRE });
    const [result, setResult] = useState<EResult>(EResult.EQU);

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
                {Object.keys(EOption).map((option: string) => (
                    <ButtonView setGame={setGame} value={option as EOption} playComputer={playComputer} />
                ))}
            </div>
            <div>
                <h5>Résultats :</h5>
                <p>Mon jeu : {game.myGame}</p>
                <p>Jeu ordinateur {game.computerGame}</p>
                <h3 style={{ color: result === EResult.WIN ? 'green' : result === EResult.LOSE ? 'red' : 'blue' }}>{result}</h3>
            </div>
            <div>
                <h5>Historique :</h5>
                <ul>
                    {history
                        .filter((value, index) => index !== 0)
                        .map((value: IRound, index: number) => (
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
const playComputer = (): EOption => {
    const playValues = Object.keys(EOption);
    const randomIndex = Math.floor(Math.random() * playValues.length);
    return playValues[randomIndex] as EOption;
};

/**
 * Find the winner
 * @param currentGame the current Game
 * @returns true if user wins, false if compute wins
 */
const findWinner = (currentGame: IGame): EResult => {
    let win: EResult = EResult.LOSE;

    if (currentGame.myGame === currentGame.computerGame) {
        win = EResult.EQU;
    } else if (gameOptions.find((option: GameOptions) => option.option === currentGame.myGame)?.winsAgaints.includes(currentGame.computerGame)) {
        win = EResult.WIN;
    }

    return win;
};

export default ChifoumiView;

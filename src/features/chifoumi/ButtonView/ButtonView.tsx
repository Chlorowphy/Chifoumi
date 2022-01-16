import React from 'react';
import { IGame, EOption } from '../model/ChifoumiModel';

/**
 * Interface for ButtonView props
 * setGame      - handler to set the game user play
 * value        - the value of the button
 * playComputer - callback for the computer to play
 */
interface IButtonViewProps {
    setGame: React.Dispatch<React.SetStateAction<IGame>>;
    value: EOption;
    playComputer: () => EOption;
}

/**
 * Button view element
 * @param props props for the button
 * @returns the Button JSX element
 */
const ButtonView = (props: IButtonViewProps): JSX.Element => {
    const { setGame, value, playComputer } = props;

    return <button onClick={() => setGame({ myGame: value, computerGame: playComputer() })}>{value}</button>;
};

export default ButtonView;

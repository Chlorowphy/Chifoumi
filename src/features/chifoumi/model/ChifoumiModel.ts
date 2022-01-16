/**
 * Enum for play options
 */
export enum EOption {
    PIERRE = 'PIERRE',
    FEUILLE = 'FEUILLE',
    CISEAU = 'CISEAU',
    PUIT = 'PUIT'
}

/**
 * Rules of the game
 */
export const gameOptions: GameOptions[] = [
    { option: EOption.PIERRE, winsAgaints: [EOption.CISEAU] },
    { option: EOption.FEUILLE, winsAgaints: [EOption.PIERRE, EOption.PUIT] },
    { option: EOption.CISEAU, winsAgaints: [EOption.FEUILLE] },
    { option: EOption.PUIT, winsAgaints: [EOption.PIERRE, EOption.CISEAU] }
];

/**
 * Type used to define the game rules
 * option       - one option from EOption
 * winsAgaints  - 0..n options from EOption against which option wins
 */
export type GameOptions = {
    option: EOption;
    winsAgaints: EOption[];
};

/**
 * Interface for game plays
 */
export interface IGame {
    myGame: EOption;
    computerGame: EOption;
}

import { gameMove, getPossibleMoves, isMovesLeft, isSpotOpen, isWinning, P1, P2 } from "./GameUtil";


export const PLAYER_NAME = "";

/**
 * You are P2, return optimal move
*/
export function getNextMove(board: string[][], round: number): gameMove {
	const possibleMove: gameMove[] = getPossibleMoves(board);
	return possibleMove[0];
}
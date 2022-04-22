# Tic-Tac-Toe-AI-Challenge
Can you create an AI for classic Tic-Tac-Toe?

# 🏃 Getting started 
The challenge is made with typescript and react

### Install NPM and Yarn
Install [npm](https://docs.npmjs.com/) and then you can install yarn with npm:

```bash
npm install --global yarn
```

### 🚀 Building and running the applicaiton
install the dependencies with
```bash
yarn install
```

and then run 
```bash
yarn start
```

# ✨ The Challenge
You are O (P2) and the challenge is to write an AI that can play a tie in tic-tac-toe
Start with ai.tsx

### 🌱 The board
the intial state of the board is filled with number from 1 to 9
```typescript
1 2 3  
4 5 6  
7 8 9  
```


First you need to name your bot by editing the line
```typescript
export const PLAYER_NAME = "";
```

Then you need to implement the getNextMove function
```typescript
export function getNextMove(board: string[][], round: number): gameMove {
	const possibleMoves: gameMove[] = getPossibleMoves(board);
	return possibleMove[0];
}
```

### 💦 Help?
See helpper functions in 
GameUtil.tsx

#### getPossibleMoves
Gets all the possible moves on the board

#### isWinning
returns true, if player is winning

#### isSpotOpen
returns true if spot is open

isMovesLeft

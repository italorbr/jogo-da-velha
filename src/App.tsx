import React, { useEffect, useState } from 'react';
import './App.css';

function App() {

  type Jogador = "O" | "X";

  const [turno, setTurno] = useState<Jogador>("O"); //turno eh o valor de jogador e comeca como "O" 
  const [vencedor, setVencedor] = useState<Jogador | null>(null); //vencedor eh o valor de jogador e comeca com null(vazio)
  const [empate, setEmpate] = useState<boolean | null>(null);//empate comeca com null e pode ser mudado pra true
  const [jogada, setJogada] = useState<{[key: string]: Jogador}>({});//o state sera um objeto que tera como chave uma string e o valor dela vem de jogador
  const [scoreX, setScoreX] = useState<number>(0);
  const [scoreO, setScoreO] = useState<number>(0);
  const [draw, setDraw] = useState<number>(0);
  const fimDeJogo = !!vencedor || !!empate;
  
  

  

  const quadrados = () => {
    return new Array(9).fill(true);
  };

  const play = (index: number) => {

    if (jogada[index] || fimDeJogo) {
      return;
    }
    setJogada(prev => ({...prev, [index]: turno}))
    setTurno(prev => prev === "O" ? "X" : "O")
  };

  const quemJogou = (index : number) => {
    if(!jogada[index]) {
      return;
    }

    return jogada[index];
  }

  const getVencedor = () => {
    const posicoesVencedoras = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],

      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],

      [1, 4, 7],
      [2, 5, 8],
    ]

    for (const posicao of posicoesVencedoras) {
      const [a, b, c] = posicao;

      if (jogada[a] && jogada[a] === jogada[b] && jogada[a] === jogada[c]){
        return jogada[a];
      }  
    }
  };

  const reset = () => {
    setTurno(jogada[0] === "O" ? "X" : "O");
    setJogada({});
    setVencedor(null);
    setEmpate(null);
    if (vencedor || empate === true) {
      if (vencedor === "O") {
        setScoreO(scoreO+1);
      } else if (vencedor === "X"){
        setScoreX(scoreX +1);
      } else {
        setDraw(draw +1);
        }
      }
    }
  

  useEffect(() => {
    const vencedor = getVencedor()

    if (vencedor) {
      setVencedor(vencedor)
    } else {
      if (Object.keys(jogada).length === 9) {
        setEmpate(true)
      }
    }
  }, [jogada])



  return (
    <div className='container'>
      {vencedor && <h1 className={`ganhador ${vencedor === "O" ? "O" : "X"}`}>{vencedor} ganhou!</h1>}


    <div className='placar'>
      <p>Placar</p>
      <p>X: {scoreX}</p>
      <p>O: {scoreO}</p>
      <p>Empates: {draw}</p>
    </div>
      {!fimDeJogo && <p className='vez'>É a vez de {turno}</p>}

      {empate && <h1>Empate!</h1>}

      <div className={`tabuleiro ${fimDeJogo ? "fimDeJogo" : null}`} >
      {quadrados().map((_, i) => (
        <div className={`celulas ${quemJogou(i)}`} onClick={() => play(i)}>{jogada[i]}</div>
      ))}

      </div>

      {fimDeJogo && <button className='btn' onClick={reset}>Play Again</button>}

    </div>
  );
}

export default App;
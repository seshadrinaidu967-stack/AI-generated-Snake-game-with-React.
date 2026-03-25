import React, { useState, useEffect, useCallback, useRef } from 'react';

const GRID_SIZE = 20;
const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
const INITIAL_DIRECTION = { x: 0, y: -1 };
const INITIAL_SPEED = 120;

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);

  const generateFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      const onSnake = snake.some(segment => segment.x === newFood?.x && segment.y === newFood?.y);
      if (!onSnake) break;
    }
    return newFood;
  }, [snake]);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setScore(0);
    setIsGameOver(false);
    setIsPaused(false);
    setFood(generateFood());
  };

  const moveSnake = useCallback(() => {
    if (isPaused || isGameOver) return;

    setSnake(prevSnake => {
      const head = prevSnake[0];
      const newHead = {
        x: (head.x + direction.x + GRID_SIZE) % GRID_SIZE,
        y: (head.y + direction.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setIsGameOver(true);
        setIsPaused(true);
        if (score > highScore) setHighScore(score);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 1);
        setFood(generateFood());
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [direction, food, isPaused, isGameOver, score, highScore, generateFood]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const interval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(interval);
  }, [moveSnake]);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-black border-4 border-cyan-500 relative z-10">
      <div className="absolute top-0 left-0 w-full h-1 bg-fuchsia-500 animate-pulse" />
      <div className="absolute bottom-0 right-0 w-full h-1 bg-cyan-500 animate-pulse" />
      
      <div className="flex justify-between w-full mb-4 px-2 font-pixel text-xs">
        <div className="text-cyan-400">
          SEQ: <span className="text-white">{score.toString().padStart(4, '0')}</span>
        </div>
        <div className="text-fuchsia-500">
          MAX: <span className="text-white">{highScore.toString().padStart(4, '0')}</span>
        </div>
      </div>

      <div 
        className="relative bg-black border-2 border-fuchsia-500/50"
        style={{ 
          width: GRID_SIZE * 15, 
          height: GRID_SIZE * 15,
          display: 'grid',
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
          gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`
        }}
      >
        {/* Grid lines */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '15px 15px'
        }} />

        {snake.map((segment, i) => (
          <div
            key={i}
            className={`absolute ${i === 0 ? 'bg-cyan-400' : 'bg-cyan-700'}`}
            style={{
              width: 15,
              height: 15,
              left: segment.x * 15,
              top: segment.y * 15,
              boxShadow: i === 0 ? '0 0 5px #0ff' : 'none'
            }}
          />
        ))}

        <div
          className="absolute bg-fuchsia-500"
          style={{
            width: 15,
            height: 15,
            left: food.x * 15,
            top: food.y * 15,
            boxShadow: '0 0 8px #f0f'
          }}
        />

        {(isGameOver || isPaused) && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-10 border-4 border-red-600">
            {isGameOver ? (
              <>
                <h2 className="text-red-500 text-xl font-pixel text-center mb-6 glitch" data-text="FATAL_ERR">FATAL_ERR</h2>
                <button 
                  onClick={resetGame}
                  className="px-4 py-2 bg-red-600 text-black font-pixel text-xs hover:bg-white hover:text-red-600 transition-none border-2 border-red-600"
                >
                  REBOOT
                </button>
              </>
            ) : (
              <>
                <h2 className="text-cyan-400 text-lg font-pixel mb-6 glitch" data-text="HALTED">HALTED</h2>
                <button 
                  onClick={() => setIsPaused(false)}
                  className="px-4 py-2 bg-cyan-500 text-black font-pixel text-xs hover:bg-white hover:text-cyan-500 transition-none border-2 border-cyan-500"
                >
                  EXECUTE
                </button>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 text-[10px] text-fuchsia-500 font-pixel text-center leading-relaxed">
        [INPUT: ARROWS] <br/> [INTERRUPT: SPACE]
      </div>
    </div>
  );
};

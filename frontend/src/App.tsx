import { useState, useEffect, useRef } from 'react'
import DrawingBoard, { DrawingBoardHandle } from './components/DrawingBoard'
import { Button } from './components/Button'
import { fireConfetti } from './hooks/useConfetti'
import clsx from 'clsx'

const WORDS = ["car", "house", "dog", "tree", "pizza", "cat", "boat"]

type Role = 'drawer' | 'guesser'

function App() {
  const boardRef = useRef<DrawingBoardHandle>(null)
  const [currentWord, setCurrentWord] = useState<string>('')
  const [role, setRole] = useState<Role>('drawer')
  const [guess, setGuess] = useState('')
  const [status, setStatus] = useState('')
  const [score, setScore] = useState(() => Number(localStorage.getItem('score') || 0))
  const [shake, setShake] = useState(false)
  const [preview, setPreview] = useState('')

  useEffect(() => {
    pickNextWord()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('score', score.toString())
  }, [score])

  const fetchWord = async () => {
    const isDesktop = Boolean((window as any).__TAURI__);
    if (isDesktop) {
      return WORDS[Math.floor(Math.random() * WORDS.length)];
    }

    try {
      const res = await fetch('http://localhost:8000/api/word');
      const data = await res.json();
      return data.word as string;
    } catch {
      // fallback when API unreachable
      return WORDS[Math.floor(Math.random() * WORDS.length)];
    }
  };

  const pickNextWord = async () => {
    const next = await fetchWord();
    setCurrentWord(next);
    setGuess('');
    setStatus('');
    setPreview('');
    boardRef.current?.clear();
  };

  const handleGuessSubmit = () => {
    if (guess.trim().toLowerCase() === currentWord) {
      fireConfetti()
      setStatus('✅ Correct!')
      setScore((s) => s + 1)
      setTimeout(() => {
        setRole('drawer')
        pickNextWord()
      }, 2000)
    } else {
      setStatus('❌ Try again')
      setShake(true)
      setTimeout(() => setShake(false), 300)
    }
  }

  const handleNextRound = () => {
    pickNextWord()
    setRole('drawer')
  }

  const handleClear = () => {
    boardRef.current?.clear()
  }

  const toggleRole = () => {
    setStatus('')
    setRole((r) => {
      if (r === 'drawer') {
        // capture snapshot before switching to guesser
        const img = boardRef.current?.getImage() || ''
        setPreview(img)
        boardRef.current?.clear()
        return 'guesser'
      }
      return 'drawer'
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white/90 rounded-2xl shadow-2xl p-6 space-y-6 border border-slate-100">
        <div className="flex items-center justify-between mb-2">
          <h1 className="font-fredoka text-3xl font-bold drop-shadow text-indigo-700">Pictionary</h1>
          <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium shadow">
            <span role="img" aria-label="trophy">🏆</span> {score}
          </span>
        </div>
        <span className={clsx(
          "inline-flex items-center gap-1 px-3 py-1 rounded-full text-base font-semibold shadow transition-all duration-300 mb-2",
          role === "drawer" ? "bg-indigo-500 text-white" : "bg-pink-500 text-white"
        )}>
          {role === "drawer" ? "👤 Drawer" : "🎯 Guesser"}
        </span>
        <div className="flex justify-center">
          <Button
            onClick={toggleRole}
            variant="secondary"
            size="md"
            className="mx-auto block mt-2 text-lg px-8 py-2"
          >
            Switch to {role === 'drawer' ? 'Guesser' : 'Drawer'}
          </Button>
        </div>
        {role === 'drawer' && (
          <>
            <p className="mb-2 text-lg font-bold text-center">Draw: {currentWord}</p>
            <div className="flex justify-center my-4">
              <DrawingBoard ref={boardRef} className="rounded-xl shadow-lg border max-w-full aspect-[4/3] bg-gray-100" />
            </div>
            <div className="flex justify-center gap-3 mt-4">
              <Button onClick={handleClear} variant="secondary" size="sm" className="w-auto px-4">
                Clear
              </Button>
              <Button
                onClick={handleNextRound}
                variant="success"
                size="sm"
                className="w-auto px-4 animate-pulse"
                title="Shows new word & clears board"
              >
                Reveal / Next Word
              </Button>
            </div>
          </>
        )}
        {role === 'guesser' && (
          <div className="flex flex-col items-center gap-4 mt-6">
            {preview && (
              <img
                src={preview}
                alt="Finished drawing"
                className="mx-auto my-2 w-48 h-48 object-contain border rounded shadow"
              />
            )}
            <input
              className={clsx(
                "rounded-lg border p-4 shadow focus:ring-2 focus:ring-blue-500 placeholder-gray-400 max-w-sm w-full text-xl text-center",
                shake && "animate-shake"
              )}
              placeholder="Type your guess…"
              aria-label="Guess input"
              autoComplete="off"
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={status === '✅ Correct!'}
              style={{ minWidth: 0 }}
            />
            <Button
              onClick={handleGuessSubmit}
              variant="primary"
              size="lg"
              disabled={status === '✅ Correct!'}
              className="w-auto px-10 text-lg"
            >
              Submit Guess
            </Button>
            {status && <p className="mt-2 text-center text-xl font-semibold transition-all duration-300">
              {status}
            </p>}
          </div>
        )}
      </div>
    </div>
  )
}

export default App

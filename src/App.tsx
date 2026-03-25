/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-cyan-400 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden font-sans selection:bg-fuchsia-500 selection:text-black">
      <div className="noise-bg" />
      <div className="scanlines" />
      <div className="scanline-bar" />

      <header className="z-10 mb-12 text-center relative">
        <h1 
          className="text-4xl md:text-6xl font-pixel uppercase tracking-tighter mb-4 glitch text-white" 
          data-text="SYS.CORE.OVERRIDE"
        >
          SYS.CORE.OVERRIDE
        </h1>
        <div className="flex items-center justify-center gap-4 text-xs uppercase tracking-[0.2em] text-fuchsia-500 font-mono">
          <span>[ STATUS: COMPROMISED ]</span>
          <span className="w-2 h-2 bg-cyan-500 animate-ping" />
          <span>[ AUDIO: INJECTED ]</span>
        </div>
      </header>

      <main className="z-10 flex flex-col lg:flex-row items-start justify-center gap-12 w-full max-w-6xl">
        <div className="w-full lg:w-auto relative group">
          <div className="absolute -inset-1 bg-cyan-500 opacity-20 group-hover:opacity-40 blur transition duration-1000 group-hover:duration-200" />
          <SnakeGame />
        </div>

        <div className="w-full lg:w-auto relative group">
          <div className="absolute -inset-1 bg-fuchsia-500 opacity-20 group-hover:opacity-40 blur transition duration-1000 group-hover:duration-200" />
          <MusicPlayer />
        </div>
      </main>

      <footer className="z-10 mt-16 w-full max-w-6xl border-t-2 border-fuchsia-500/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-cyan-600 uppercase tracking-widest font-mono">
        <div className="flex gap-8">
          <div className="flex flex-col gap-1">
            <span className="text-fuchsia-500">DIAGNOSTIC</span>
            <span className="text-cyan-400 animate-pulse">ERR_MEM_CORRUPT</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-fuchsia-500">UPLINK</span>
            <span className="text-cyan-400">UNSTABLE</span>
          </div>
        </div>
        
        <div className="text-right text-fuchsia-500 glitch" data-text="TERMINAL // 0xDEADBEEF">
          TERMINAL // 0xDEADBEEF
        </div>
      </footer>
    </div>
  );
}

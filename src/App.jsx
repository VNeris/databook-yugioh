import React from 'react';
import InfiniteScrollSearch from './page/InfiniteScrollSearch'; // Caminho do componente

 

function App() {
  return (
    <>
      <header className="min-h-screen bg-zinc-600 text-white">
        <nav className="text-center py-6 bg-black bg-opacity-50">
          <h1 className="text-4xl font-bold">Yu-Gi-Oh! Databook</h1>
        </nav>
        <InfiniteScrollSearch />

      </header>
    </>
  )
}

export default App

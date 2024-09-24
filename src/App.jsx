import React from 'react';
import InfiniteScrollSearch from './page/InfiniteScrollSearch'; // Caminho do componente
import Navbar from './components/Navbar';
 

function App() {
  return (
    <>
      <header className="min-h-screen bg-zinc-600 text-white">
        
        <Navbar></Navbar>
        <InfiniteScrollSearch />

      </header>
    </>
  )
}

export default App

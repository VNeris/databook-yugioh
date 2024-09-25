import React from 'react';
import YugiohDatabook from './page/YugiohDatabook'; // Caminho do componente
import Navbar from './components/Navbar';
 

function App() {
  return (
    <>
      <header className="min-h-screen bg-zinc-600 text-white">
        
        <Navbar></Navbar>
        <YugiohDatabook />

      </header>
    </>
  )
}

export default App

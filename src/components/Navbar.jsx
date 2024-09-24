import React, { useState } from 'react';
import { FaInstagram, FaGithubAlt, FaWhatsapp, FaLinkedin } from "react-icons/fa";



const links = [
   {
      label: <FaGithubAlt />,
      url: 'https://github.com/VNeris'
   },
   {
      label: <FaInstagram />,
      url: 'https://www.instagram.com/viny_paiv4/'
   },
   {
      label: <FaWhatsapp />,
      url: 'Decks'
   },
   {
      label: <FaLinkedin />,
      url: 'https://www.linkedin.com/in/vinicius-neris-b49b602b6/'
   },
]


function Navbar() {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <nav className="navbar bg-zinc-900 bg-opacity-90 p-4">
         <div className="container mx-auto flex justify-between items-center">
            <div className="text-[#c0c0c0] text-3xl font-bold">Yu-Gi-Oh! DataBook</div>
            <div className="md:hidden">
               <button
                  className="text-white focus:outline-none block"
                  onClick={() => setIsOpen(!isOpen)}
               >
                  <svg
                     className="w-6 h-6"
                     fill="none"
                     stroke="currentColor"
                     viewBox="0 0 24 24"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        className="w-6 h-6 block"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        d={!isOpen ? "M4 6h16M4 12h16m-7 6h7" : "M6 18L18 6M6 6l12 12"}
                     />
                  </svg>
               </button>
            </div>
            <div className={`${isOpen ? "block" : "hidden"
                  } md:flex md:flex-col md:space-y-4 md:w-auto`}>
               <ul className="sm:flex items-center space-x-5 md:space-x-10 text-[#c0c0c0] text-3xl">
                  {links.map((link, index) => {
                     return (
                        <li key={index} className="flex items-center justify-end py-2 md:py-0 hover:text-[#eb4040]">
                           <a target="_blank" href={link.url}>
                              {link.label}
                           </a>
                        </li> 
                     )
                  })}
               </ul>
            </div>
         </div>
      </nav>
   );
}

export default Navbar; 

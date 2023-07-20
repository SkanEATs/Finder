import React, { useState } from 'react';
import logo from './logo.png';

function Modal({ isOpen, toggle, title }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email);
    toggle();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="modal-close" onClick={toggle}>&times;</button>
        <h2>{title}</h2>
        <p>Subscribe to get the latest updates</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
}


export default function Header({ onSearchInputChange }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleInputChange = (event) => {
    onSearchInputChange(event.target.value);
  };

  return (
    <div className="w-full bg-white">
      {/* Navbar */}
      <nav className="px-2 sm:px-6">
        {/* Flex Container */}
        <div className="flex flex-col sm:flex-row items-center justify-between">
          {/* Logo */}
          <div className="pt-2 flex items-center">
            <img src={logo} alt="logo" className="w-16" />
            <h2 className="whitespace-nowrap font-bold text-regal-blue text-lg sm:text-base">
              SkanEATs
            </h2>
          </div>

          {/* Menu Items */}
          <div className="space-y-2 sm:space-x-6 sm:space-y-0 mt-2 sm:mt-0 text-sm sm:text-base">
            <a
              href="https://sprw.io/stt-i4B1KmPMcYDh9BergCkuie"
              className="block sm:inline hover:text-mint"
            >
              Take our Survey for a Future Discount!
            </a>
            <a href="https://instagram.com/skaneats.315" className='block sm:inline hover:text-regal-blue'>Follow Us On Instagram</a>
            <a href="https://www.change.org/p/bring-skaneats-to-life?recruiter=1312696671&recruited_by_id=47136770-26ee-11ee-81a1-49f36670b469&utm_source=share_petition&utm_campaign=share_for_starters_page&utm_medium=instagram" className='block sm:inline hover:text-regal-blue'>Sign Our Change.Org Petition</a>
           {/* <button
              className="px-4 py-2 rounded text-white bg-regal-blue hover:bg-mint"
              onClick={toggleModal}
            >
              Subscribe
            </button>
            <Modal
              isOpen={isModalOpen}
              toggle={toggleModal}
              title="Subscribe to our newsletter"
  /> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

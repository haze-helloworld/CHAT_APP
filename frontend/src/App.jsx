import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/chat/home/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      HELLO
      <p>{message}</p>
    </>
  );
}

export default App;
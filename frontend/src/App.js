import io from 'socket.io-client'
import { useEffect } from 'react'

function App() {

  const sockets = async () => {
    let sock = io('http://localhost:5000', {autoConnect: true})
    
    sock.on('connection', () => {
      console.log('connect');
    })

  }

  useEffect(() => {
    sockets()
  }, [])

  return (
    <div className="App">

    </div>
  );
}

export default App;

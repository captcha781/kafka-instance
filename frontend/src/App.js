import io from 'socket.io-client'
import { useEffect, useState, useCallback, useMemo } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import {ToastContainer, toast} from 'react-toastify'

function App() {

  const [data, setData] = useState([])
  const [text, setText] = useState("")

  const sockets = async () => {
    let sock = io('http://localhost:5000', { autoConnect: true })

    sock.on('message', (sockdata) => {
      console.log(data);
      setData([...data, { value: sockdata }])
    })

  }

  useEffect(() => {
    sockets()
  }, [data])

  const sendHandler = async () => {
    let response = await axios.post('http://localhost:5000/insertData', {message: text})
    toast.success(response.data.message)
    setText("")
  }

  return (
    <div className="App">
      <input type='text' onChange={(e => setText(e.target.value))} value={text} />
      <button onClick={sendHandler}>Send</button>
      {data.map((item) => {
        return <div key={Math.random()}>{item.value}</div>
      })}
      <ToastContainer/>
    </div>
  );
}

export default App;

import { useState, useEffect } from 'react'
import axios from '../util/apiClient'
import { useParams } from 'react-router-dom'

const SingleTodo = () => {
  const [singleTodo, setSingleTodo] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const getTodoById = async () => {
      const { data } = await axios.get(`/todos/${id}`)
      setSingleTodo(data)
    }

    getTodoById()
  }, [id])

  return (
    <> 
      <h1>{singleTodo.text}</h1>
      <h3>{singleTodo.done ? 'Done' : 'Not done'}</h3>
    </>
  )
}

export default SingleTodo
import { useState, useEffect } from 'react'
import axios from '../util/apiClient'
import { useParams } from 'react-router-dom'

const useTodo = (id) => {
  const [singleTodo, setSingleTodo] = useState()

  useEffect(() => {
    const getTodoById = async () => {
      try {
        const { data } = await axios.get(`/todos/${id}`)
        setSingleTodo(data)
      } catch (error) {
        setSingleTodo()
      }
    }
    getTodoById()
  }, [id])
  return singleTodo
}

const SingleTodo = () => {
  const { id } = useParams()
  // console.log(id)
  const singleTodo = useTodo(id)
  console.log(singleTodo)

  if (!singleTodo) {
    return <p>There is no todo with this ID</p>;
  }

  return (
    <> 
      <h1>{singleTodo.text}</h1>
      <h3>{singleTodo.done ? 'Done' : 'Not done'}</h3>
    </>
  )
}

export default SingleTodo
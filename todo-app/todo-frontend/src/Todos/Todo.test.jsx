/* eslint-disable no-undef */
import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import axios from '../util/apiClient'
import SingleTodo from './Todo'

jest.mock('axios')

describe('SingleTodo component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render the todo text and status', async () => {
    const mockTodo = {
      _id: '6668628803eead6248a26a13',
      text: 'Test todo',
      done: false,
    }

    axios.get.mockResolvedValueOnce({ data: mockTodo })

    render(
      <BrowserRouter>
        <SingleTodo />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByText('Test todo')).toBeInTheDocument()
      expect(screen.getByText('Not done')).toBeInTheDocument()
    })
  })
})
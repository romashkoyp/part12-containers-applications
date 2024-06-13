import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

describe('SingleTodo', () => {
  const MockSingleTodo = ({ todo }) => {
    if (!todo) {
      return <p>There is no todo with this ID</p>;
    }

    return (
      <>
        <h1>{todo.text}</h1>
        <h3>{todo.done ? 'Done' : 'Not done'}</h3>
      </>
    );
  };

  it('should render the todo text and status', () => {
    const mockTodo = {
      _id: '6668628803eead6248a26a13',
      text: 'Test todo',
      done: false,
    };

    render(
      <BrowserRouter>
        <MockSingleTodo todo={mockTodo} />
      </BrowserRouter>
    );

    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByText('Not done')).toBeInTheDocument();
  });

  it('should render "There is no todo with this ID" when no todo is provided', () => {
    render(
      <BrowserRouter>
        <MockSingleTodo />
      </BrowserRouter>
    );

    expect(screen.getByText('There is no todo with this ID')).toBeInTheDocument();
  });
});
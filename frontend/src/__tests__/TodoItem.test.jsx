import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TodoItem from '../TodoItem.jsx'

const baseTodo = {
  id: 1,
  title: 'Sample Todo',
  done: false,
  comments: [],
};

describe('TodoItem', () => {

  it('renders with no comments correctly', () => {
    render(<TodoItem todo={baseTodo} />);
    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.getByText('No comments')).toBeInTheDocument();
  });

  it('renders with comments correctly', () => {
    const todoWithComment = {
      ...baseTodo,
      comments: [
        { id: 1, message: 'First comment' },
        { id: 2, message: 'Another comment' },
      ]
    };

    render(<TodoItem todo={todoWithComment} />);

    expect(screen.getByText('Sample Todo')).toBeInTheDocument();
    expect(screen.getByText('First comment')).toBeInTheDocument();
    expect(screen.getByText('Another comment')).toBeInTheDocument();
    expect(screen.getByText(/2/)).toBeInTheDocument();
  });

  it('makes callback to addNewComment when a new comment is added', async () => {
  const onAddNewComment = vi.fn();

  render(
    <TodoItem
      todo={baseTodo}
      addNewComment={onAddNewComment}
    />
  );

  // พิมพ์ข้อความลงใน textbox
  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'New comment');

  // กดปุ่ม Add Comment
  const button = screen.getByRole('button', { name: /add comment/i });
  fireEvent.click(button);

  // assert
  expect(onAddNewComment).toHaveBeenCalledWith(baseTodo.id, 'New comment');
});


});

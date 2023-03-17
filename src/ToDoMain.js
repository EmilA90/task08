import React, { useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, deleteItem, updateItem, setUpdateIndex, checkItem } from './todoSlice';

export const ToDoMain = () => {
  const [inputValue, setInputValue] = useState('');
  const { items, checkedItems, updateIndex } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      if (updateIndex === null) {
        dispatch(addItem(inputValue));
      } else {
        dispatch(updateItem({ index: updateIndex, value: inputValue }));
        dispatch(setUpdateIndex(null));
      }
    }
    setInputValue('');
  };

  const handleDelete = (index) => {
    dispatch(deleteItem(index));
  };

  const handleUpdate = (index) => {
    setInputValue(items[index]);
    dispatch(setUpdateIndex(index));
  };

  const handleCheck = (index) => {
    dispatch(checkItem(index));
  };

  return (
    <div className="todo-wrapper">
      <h1>ToDo</h1>

      <div className="input-field form-check form-switch">
        <form onSubmit={handleSubmit} id='main-input-field'>
          <input type="text" className="form-control" value={inputValue} onChange={handleInputChange} />
          <button className="btn btn-primary" type="submit">{updateIndex === null ? 'Add' : 'Save'}</button>
        </form>
      </div>

      <div className="task-list">
        <ul>
          {items.map((item, index) => (

            <li key={index} >
              <div className="input-group mb-3 list-field-bottom">
                <input className="form-check-input mt-0 checkitem" type="checkbox" checked={checkedItems[index]} onChange={() => handleCheck(index)} value="" aria-label="Checkbox for following text input"/>
                <span className={checkedItems[index] ? 'strikedlist span-item' : 'span-item'}>{item}</span>
                <button className="btn btn-info" onClick={() => handleUpdate(index)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


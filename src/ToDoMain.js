

import React, { useState } from 'react';
import './index.css';

export const ToDoMain = () => {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);
  const [updateIndex, setUpdateIndex] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim()) {
      if (updateIndex === null) {
        setItems([...items, inputValue]);
        setCheckedItems([...checkedItems, false]);
      } else {
        const updatedItems = [...items];
        updatedItems[updateIndex] = inputValue;
        setItems(updatedItems);
        setUpdateIndex(null)
      }
    }
    setInputValue('');
  };

  const handleDelete = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    const newCheckedItems = [...checkedItems];
    newCheckedItems.splice(index, 1);
    setCheckedItems(newCheckedItems);
  };

  const handleUpdate = (index) => {
    setInputValue(items[index]);
    setUpdateIndex(index);
  };

  const handleCheck = (index) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = !newCheckedItems[index];
    setCheckedItems(newCheckedItems);
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
                {/* <input type="text" className="form-control" aria-label="Text input with checkbox" value={item} disabled/> */}

                <input className="form-check-input mt-0 checkitem" type="checkbox" checked={checkedItems[index]} onChange={() => handleCheck(index)} value="" aria-label="Checkbox for following text input"/>
                <span className={checkedItems[index] ? 'strikedlist span-item' : 'span-item'}>{item}</span>
                <button className="btn btn-info" onClick={() => handleUpdate(index)}>Update</button>
                <button className="btn btn-danger" onClick={() => handleDelete(index)}>Delete</button>
              </div>

              {/* <input type="checkbox" checked={checkedItems[index]} onChange={() => handleCheck(index)} /> */}
              {/* {item} */}
          

            </li>



          ))}
        </ul>
      </div>
    </div>
  );
};

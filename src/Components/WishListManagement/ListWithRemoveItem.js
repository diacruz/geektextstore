import React from 'react';

const initialList = [
  { id: 'List1', name: 'Untitled1':  },
  { id: 'List2', name: 'Untitled2' },
  { id: 'List3', name: 'Untitled3' },
];

const ListWithRemoveItem = () => {
  const [list, setList] = React.useState(initialList);

  const handleClick = id => {
    setList(list.filter(item => item.id !== id));
  };

  return (
    <ul>
      {list.map(item => (
        <li key={item.id}>
          <label>{item.name}</label>
          <button variant = 'primary' type="button" onClick={() => handleClick(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListWithRemoveItem;

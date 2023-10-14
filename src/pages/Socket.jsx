import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const App = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/test');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching items:', error.response);
      }
    };

    fetchItems();

    socket.on('newItem', (newItem) => {
      setItems((prevItems) => [...prevItems, newItem]);
    });

    socket.on('updatedItem', (updatedItem) => {
      setItems((prevItems) =>
        prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
      );
    });

    socket.on('deletedItem', (deletedItem) => {
      setItems((prevItems) => prevItems.filter((item) => item._id !== deletedItem._id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/test/${id}`);
      socket.emit('deletedItem', id); // Emit deleted item ID to the socket server
    } catch (error) {
      console.error('Error deleting item:', error.response);
    }
  };
  
  const handleAdd = async () => {
    const newItem = {
      name: name,
      description: description,
      price: price,
    };
    try {
      const response = await axios.post('http://localhost:5000/api/v1/test', newItem);
      socket.emit('newItem', response.data); // Emit newly added item to the socket server
      setName('');
      setDescription('');
      setPrice(0);
    } catch (error) {
      console.error('Error adding item:', error.response);
    }
  };
  

  return (
    <div>
      <h1>Items List</h1>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handleAdd}>Add Item</button>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item._id}>
            <h3>{item.name}</h3>
            <p>Description: {item.description}</p>
            <p>Price: {item.price}</p>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

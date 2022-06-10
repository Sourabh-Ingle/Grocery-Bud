import React, { useState, useEffect } from 'react';
import './Grocery.css';
import Alert from './Alert';
import List from './List';

const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if (list) {
        return (list = JSON.parse(localStorage.getItem('list')));
    } else {
        return [];
    }
};

const Grosary = () => {
    const [name, setName] = useState('');
    const [list, setList] = useState(getLocalStorage());
    const [IsEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [alert, setAlert] = useState({ show: false, mgs: '', type: '' });

    const handleSumit = (e) => {
        e.preventDefault();
        if (!name) {
            //  display alert;
            showAlert(true, 'danger', 'PLEASE ENTER VALUES')
        } else if (name && IsEditing) {
            setList(
                list.map((item) => {
                    if (item.id === editId) {
                        return { ...item, title: name };
                    }
                    return item;
                })
            );
            setName('');
            setEditId(null);
            setIsEditing(false);
            showAlert(true, 'editedcolor', 'VALUE CHANGED SUSSESSFULLY');
        }
        else {
            //show alert
            showAlert(true, 'sussess', 'ITEMS ARE ADDED TO LIST')
            const newItem = { id: new Date().getTime().toString(), title: name };
            setList([...list, newItem]);
            setName('');
        }
    }

    const showAlert = ((show = false, type = "", mgs = "") => {
        setAlert({ show, type, mgs });
    })

    const clearFunct = () => {
        setList([]);
        showAlert(true, 'clear', 'WHOLE LIST CLEAR');
    }

    const removeItem = (id) => {
        showAlert(true, 'clear', 'ITEM REMOVED');
        setList(list.filter((item) => {
            return item.id !== id;
        }))
    }

    const edititem = (id) => {
        const specificItem = list.find(item => item.id === id);
        setIsEditing(true);
        setEditId(id);
        setName(specificItem.title);
    }

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
    }, [list]);




    return (
        
            <div className="App color">
                <div className="container-main">
                    <div className="alert-field">
                        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
                    </div>
                    <form action="" className="formElement" onSubmit={handleSumit}>

                        <h3 className='heading-bud'>grocery bud</h3>
                        <div className="form-control">
                            <input type="text" className='inputGrosary' placeholder='Type here...' value={name} onChange={(e) => setName(e.target.value)} />

                            <button type='submit' className="submitBtn" >
                                {IsEditing ? 'Edit' : 'Submit'}
                            </button>
                        </div>
                    </form>
                    </div>
                  

                        {
                            (list.length > 0) && < >
                                <List items={list} removeItem={removeItem} editItem={edititem} />
                                <button type='button' className="submitBtn" onClick={clearFunct}>Clear All</button>
                          </>
                        }
                  
                    
                
            </div>

        

    )
}

export default Grosary;
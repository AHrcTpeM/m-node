import React, { useState, useEffect } from 'react';

import { Button, Input }  from 'components/ui';
import CheckBox from 'components/CheckBox';
import {TaskData} from 'interface/interface'

function Items({onClickLoginOut}: {onClickLoginOut: () => void}) { 
    const [todos, setTodos] = useState<TaskData[]>([
        // {id: 1, checked: false, text: 'Купить хлеб', CustomerId: 1},
        // {id: 2, checked: true, text: 'Купить масло', CustomerId: 1},
        // {id: 3, checked: false, text: 'Купить молоко', CustomerId: 1}
    ])

    // const urlServer = 'http://localhost:3005';
    const urlServer = 'http://3.74.117.171:3005'
    
    function getTasks() {
        fetch(urlServer + '/api/v1/items', { 
            credentials: 'include',
            method: 'GET'
        })
            .then(response => response.json())
            .then((todos: {items: TaskData[], error: string}) => {
                if (todos.error === 'forbidden') {
                    console.log('forbidden');
                } else {
                    setTodos(todos.items);
                    setCountTasks(todos.items.length);
                }                
            })
    }

    function updateTask (item: TaskData) {        
        let request = JSON.stringify(item);
        fetch(urlServer + '/api/v1/items', {
            method:'PUT',
            body: request,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(() => {
                getTasks()
            });
        }
        
    useEffect(() => {
        getTasks();
        console.log(111);
    }, [])

    const [countTasks, setCountTasks] = useState(todos.length); 
    const [value, setValue] = useState('');
    
    function addTask() {
        if (value.trim()) {
            setValue('');

            let request = JSON.stringify({ text: value });
            fetch(urlServer + '/api/v1/items', {
                method: 'POST',
                body: request,
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(res => res.json())
                .then((response) => {
                    if (response.id) {
                        getTasks();
                        // $set(new_task, 'text', '');
                    } else {
                        alert("Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности.")
                    }
                });

            setCountTasks(todos.length + 1);
            // setTodos(todos.concat([{id: Date.now(), checked: false, text: value,  CustomerId: 1}]));        
        }
        
    }

    function onChange(index: number): React.ChangeEventHandler<HTMLInputElement> | undefined {
        setTodos(todos.map((todo, idx) => {
            if (idx === index){
                todo.checked = !todo.checked;
                updateTask(todo);
            }            
            return todo;
        }))        
        return;
    }

    function deleteTask(index: number): React.FormEventHandler<HTMLButtonElement> | undefined {
        let request = JSON.stringify({ id: index, });
        fetch(urlServer + '/api/v1/items', {
            method: 'DELETE',
            body: request,
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => res.json())
            .then((response) => {
                if (response['ok'] === true) {
                    getTasks()
                } else {
                    alert("Произошла ошибка. Посмотрите консоль разработчика чтоб увидеть подробности.")
                }
            });
        setCountTasks(todos.length - 1);
        setTodos(todos.filter((todo, idx) => idx !== index));        
        return;
    }

    return (
        <>
          <h4 style={{margin: '5px 0'}}>Добавить новую задачу:</h4>
          <label style={{display: 'flex'}}>
              <Input type={'text'} placeholder={'выгулять соседа'} value={value} margin={'5px 0 10px 0'}
              onChange={event => setValue(event.target.value)} />
              <Button margin={'5px 0 10px 0'} background={'violet'} onClick={addTask}>Добавить</Button>
          </label>
          <h4  style={{margin: '5px 0'}}>Активные задачи: {countTasks}</h4>
          
          {todos.map((item, idx) => <CheckBox key={item.id} item={item} index={idx} onChange={onChange}
          deleteTask={deleteTask} updateTask={updateTask}/>)}

          <hr style={{marginTop: '50px'}}/>
          <Button  hover={'violet'} onClick={onClickLoginOut}>Выйти &#128682;</Button>
        </>
    )
}

export default Items;
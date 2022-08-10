import React, { useState, useEffect } from 'react';
import { Main, WrapperLogin, WrapperItems } from "./styled";
import Login from 'components/Login';
import Items from 'components/Items';

function Tasks() {
    const [login, setLogin] = useState('');

    // const urlServer = 'http://localhost:3005';
    const urlServer = 'http://3.74.117.171:3005'
    useEffect(() => {
        fetch(urlServer + '/api/v1/items', { 
            credentials: 'include',
            method: 'GET'
        })
            .then(response => response.json())
            .then((todos: {error: string}) => {
                if (todos.error === 'forbidden') {
                    setLogin('login');
                } else {
                    setLogin('items');
                }                
            })
    }, [])    

    function onClickLogin() {
        setLogin('items');
    }
    
    function onClickLoginOut() {
        setLogin('login');

        fetch(urlServer + '/api/v1/logout', {  
            method: 'POST',
            credentials: 'include',
        }).then(res => res.json())
            .then((response) => {
                if (response.ok) {
                    localStorage.clear();
                }
            });
    }

    return (
        <Main>
           { (login === 'login') && <WrapperLogin>
                 <Login onClickLogin={onClickLogin} /> 
            </WrapperLogin>}
            { (login === 'items') && <WrapperItems>
                <Items onClickLoginOut={onClickLoginOut}/>      
            </WrapperItems>}

            { (login === '') && <span>Ошибка. Возможно не запущенный бэкенд.</span> }
        </Main>
    )
}
export default Tasks;
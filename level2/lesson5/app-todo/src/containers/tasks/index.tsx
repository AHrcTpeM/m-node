import React, { useState, useEffect } from 'react';
import { Main, WrapperLogin, WrapperItems } from "./styled";
import Login from 'components/Login';
import Items from 'components/Items';

export const urlServer = 'http://localhost:3005';

function Tasks() {
    const [login, setLogin] = useState('');
    
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
            }).catch((err) => setLogin('err'));
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
                <Items onClickLoginOut={onClickLoginOut} />      
            </WrapperItems>}

            { (login === 'err') && <span>Ошибка. Возможно не запущенный бэкенд.</span> }
        </Main>
    )
}
export default Tasks;
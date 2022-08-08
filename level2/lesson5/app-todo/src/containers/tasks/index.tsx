import React, { useState } from 'react';
import { Main, WrapperLogin, WrapperItems } from "./styled";
import Login from 'components/Login';
import Items from 'components/Items';

function Tasks() {
    const [login, setLogin] = useState(false)
    function onClickLogin() {
        setLogin(!login);
    }
    
    function onClickLoginOut() {
        setLogin(!login);

        fetch('http://localhost:3005/api/v1/logout', {  
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
           {!login && <WrapperLogin>
                 <Login onClickLogin={onClickLogin} /> 
            </WrapperLogin>}
            {login && <WrapperItems>
                <Items onClickLoginOut={onClickLoginOut}/>      
            </WrapperItems>}
        </Main>
    )
}
export default Tasks;
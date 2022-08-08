import React, { useState } from 'react';

import { Input, Button, LoginInput, LoginButton } from 'components/ui';

function Login({onClickLogin}: {onClickLogin: () => void}) {
    const [login, setLogin] = useState('');
    const [pass, setPass] = useState('');
    
    function sendLogin() {
        if (login.trim() !== '' && pass.trim()) {
            let params = JSON.stringify({ login: login, pass: pass });
            
            fetch('http://localhost:3005/api/v1/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: params
            })
                .then(res => res.json())
                .then(response => {
                    if (response.ok) {                  
                        localStorage.setItem('name', login);
                        onClickLogin();
                        //getTasks();
                    } else if (response.error === 'not found') {
                        alert('Неверный логин или пароль');
                    } else {
                        alert("Произошла ошибка")
                    }
                })            
        }
    }
    
    function register() {
        if (login.trim() !== '' && pass.trim()) {
            let params = JSON.stringify({ login: login, pass: pass });
            fetch('http://localhost:3005/api/v1/register', {
                method:  'POST',
                body: params,
                headers: {
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then((response) => {
                    if (response.ok) {
                        sendLogin();
                    } else {
                        alert("Произошла ошибка.")
                    }
                });
        }
    }    

    return (
        <>
            <h4>Доступ к учетной записи</h4>
            <LoginInput>
                <Input type={'text'} placeholder={'Pomidor@mail.cool'} value={login} onChange={event => setLogin(event.target.value)} />
                <Input type={'password'} placeholder={'********'} value={pass} onChange={event => setPass(event.target.value)}/>
            </LoginInput>
            <LoginButton>
                <Button hover='#D3D3D3' onClick={register}>Зарегистрироваться</Button>
                <Button color='white' background='violet' onClick={sendLogin}>Войти</Button>
            </LoginButton>
        </>
    )
}

export default Login;
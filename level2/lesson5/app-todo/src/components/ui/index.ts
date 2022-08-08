import styled from 'styled-components';
import {MyTheme} from 'interface/interface'

export const Input = styled.input<MyTheme>`    
    margin: ${({ margin }) => (margin ? margin : '0 0 18px 0')};
    position: relative;
    width: 100%;
    border: 2px solid rgba(0,0,0,.08)};
    padding: 5px 10px;

    &:focus {
        outline: none;
        border: 2px solid violet;
        box-shadow: 0 0 10px #719ECE;
    }
`;

export const Button = styled.button<MyTheme>`
    margin: ${({ margin }) => (margin ? margin : '5px 10px')};
    padding: ${({ padding }) => (padding ? padding : '5px 10px')};
    transition: background .1s,color .1s;
    border: 0;
    background: none;
    font-size: 100%;
    vertical-align: baseline;
    font-family: inherit;
    font-weight: inherit;
    color: inherit;
    appearance: none;
    cursor: pointer;
    color: ${({ color }) => (color ? color : '#282828')};
    background: ${({ background }) => (background ? background : 'white')};

    &:hover {
        background: ${({ hover }) => (hover ? hover : 'green')};
    }
`;

export const LoginInput = styled.div`
    max-width: 250px;
    display: block;
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-weight: 300;
`;

export const LoginButton = styled.div`
    display: block;
    font: 14px 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
`;
import styled from 'styled-components';
import {MyTheme} from 'interface/interface';

export const Task = styled.div`
display: flex;
flex-direction: row;
padding: 2px 5px;
border: 2px solid rgba(0,0,0,.08);
margin-top: 10px;
`
export const Label = styled.label<MyTheme>`
padding-top: 4px;
margin-right: 3px;
text-decoration: ${({ decoration }) => (decoration ? 'line-through' : null)};
color: ${({ decoration }) => (decoration ? 'violet' : null)};
`

export const InputEdit = styled.input`
outline: none;
border: 2px solid violet;
box-shadow: 0 0 10px #719ECE;
`
import React from 'react';
import { HeaderSC, HeaderText } from "./styled"

function Header() {
    return (
        <HeaderSC>
            <HeaderText>
            Ш
            <span style={{color: 'violet'}}>++</span> 
            </HeaderText>                       
        </HeaderSC>
    )
}
export default Header;
import React, { useState } from 'react';

import { Button } from 'components/ui';
import { Task, Label, InputEdit } from './styled'
import {TaskData} from 'interface/interface'

function CheckBox({item, index, onChange, deleteTask, updateTask} : {
    item: TaskData,
    index: number,
    onChange: (index: number) => React.ChangeEventHandler<HTMLInputElement> | undefined,
    deleteTask: (index: number) => React.FormEventHandler<HTMLButtonElement> | undefined,
    updateTask: (item: TaskData) => void
}) {
    const [edit, setEdit] = useState(false);
    const [value, setValue] = useState(item.text);
    const [oldValue, setOldValue] = useState(item.text);
    function editInput() {
        setEdit(!edit);
        setOldValue(value);        
    }
    function saveInput() {
        editInput();
        item.text = value;
        updateTask(item);
    }
    function editClose() {
        setValue(oldValue);
        setEdit(!edit);
    }
    return (
        <>
            {!edit && <Task>
                <input type="checkbox" style={{marginRight: '5px', color: 'violet'}} defaultChecked={item.checked} onChange={() => onChange(index)} />
                <Label decoration={item.checked}>{index + 1}.&nbsp;{value}</Label>
                <Button margin={'0'} color={'red'} padding={'5px'} hover={'violet'} onClick={editInput}>✎️</Button>
                <Button margin={'0'} color={'green'} padding={'5px'} hover={'violet'} onClick={() => deleteTask(item.id)}>✕</Button>
            </Task>}

            {edit && <Task>
                <input type="checkbox" style={{marginRight: '5px', color: 'violet'}} defaultChecked={item.checked} onChange={() => onChange(index)} />
                <Label>{index + 1}.&nbsp;<InputEdit value={value} onChange={event => setValue(event.target.value)} />
                </Label>
                <Button margin={'0'} color={'red'} padding={'5px'} hover={'violet'} onClick={saveInput}>💾</Button>
                <Button margin={'0'} color={'blue'} padding={'5px'} hover={'violet'} onClick={editClose}>✕</Button>
            </Task>}
        </>
    )
}

export default CheckBox;
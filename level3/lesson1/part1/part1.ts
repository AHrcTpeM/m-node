type DialogButtonType = "Yes" | "No";

interface FormButton {
    type: "Add" | "Remove" | "Buy"
}

type AnyButtonType = DialogButtonType | FormButton['type'];

let button: AnyButtonType = 'Yes'; 

type ConfirmationHandlingFormButton = FormButton & { onConfirm: (button: DialogButtonType) => void | null};

let bigbutton: ConfirmationHandlingFormButton = {type: "Add" , onConfirm: (button) => console.log(button) };

bigbutton.onConfirm('No');
console.log(bigbutton.type);

var button = 'Yes';
var bigbutton = { type: "Add", onConfirm: function (button) { return console.log(button); } };
bigbutton.onConfirm('No');
console.log(bigbutton.type);

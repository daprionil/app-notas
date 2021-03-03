//Variables
const textInput = document.querySelector('#textInput');
const formulario = document.querySelector('#formulario');
const message = document.querySelector('#message');
const textBlock = document.querySelector('#textBlock');

//Arreglo y id
let arrayText = [];
let id = 0;

//Iniciando La app
eventos();
function eventos(){
    document.addEventListener('DOMContentLoaded',iniciandoApp);
}
function iniciandoApp(){
    storageTextArray();
    formulario.addEventListener('submit',addText);
    htmlText();
}
function addText(e){
    e.preventDefault();
    if(textInput.value.length > 0){
        clearMessage();
        const text = {
            dataId:arrayText.length,
            titulo:textInput.value,
        };
        arrayText = [text,...arrayText];
        localStorage.setItem('texts',JSON.stringify(arrayText));
        htmlText();
        resetFormulario();
    }else{
        messageAlert();
    };
};
//HTML de los textos
function htmlText(){
    clearTextBlock();
    arrayText.forEach( text => {
        const {dataId,titulo} = text;
        textBox(titulo,dataId);
    });
}
//Mensajes de Alerta
function messageAlert(){
    if(!message.parentElement.classList.contains('active')){
        message.parentElement.classList.add('active');
    };
};
//Limpiar Mensaje de Alerta
function clearMessage(){
    if(message.parentElement.classList.contains('active')){
        message.parentElement.classList.remove('active');
    };
};
//Parrafo
function textBox(text,id){
    const textBoxHtml = document.createElement('div');
    textBoxHtml.classList.add('ctn-text');
    textBoxHtml.setAttribute('data-id',id)
    const pText = document.createElement('p');
    pText.textContent = text;
    const deleteBtn = document.createElement('p');
    deleteBtn.classList.add('delete-text');
    deleteBtn.id = 'deleteText';
    deleteBtn.textContent = 'X';

    deleteBtn.addEventListener('click',deleteTextBox);

    textBoxHtml.appendChild(pText);
    textBoxHtml.appendChild(deleteBtn);
    textBlock.appendChild(textBoxHtml);
}
//Reset Formulario
function resetFormulario(){
    formulario.reset();
}
function clearTextBlock(){
    while(textBlock.firstChild){
        textBlock.removeChild(textBlock.firstChild);
    };
};
//Delete Text Box
function storageTextArray(){
    if(localStorage.getItem('texts')){
        arrayText = JSON.parse(localStorage.getItem('texts'));
    }else{
        localStorage.setItem('texts',JSON.stringify(arrayText));
        arrayText = JSON.parse(localStorage.getItem('texts'));
    };
};
//Delete text box
function deleteTextBox(e){
    const parentBox = e.target.parentElement;
    const searchBoxText = arrayText.some(text => parentBox.getAttribute('data-id') == text.dataId);
    if(searchBoxText){
        const arrayTextFil = arrayText.filter( text => text.dataId != parentBox.getAttribute('data-id'));
        localStorage.setItem('texts',JSON.stringify(arrayTextFil));
        arrayText = JSON.parse(localStorage.getItem('texts'));
        htmlText();
    };
};
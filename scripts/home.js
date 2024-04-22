class Color {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = this.hex();
    }

    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }

    rgb() {
        return `rgb(${this.innerRGB()})`;
    }

    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }

    hex() {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * transforma o valor do hex em rgb
     * @param {string} hex 
     */
    static hexTorgb(hex){
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);

        return [r, g, b];
    }
}

// Angle
const rangeAngle = document.querySelector('.tool-angle input');
const currentAngle = document.querySelector('.tool-angle .result');

const updateAngle = (e) => {
    const resultAngle = e.target.value;
    currentAngle.textContent = resultAngle
    updateTextResult();
}

rangeAngle.addEventListener('input', updateAngle)

// Colors
const colors = [
    new Color(255, 0, 0),
    new Color(0, 255, 0),
];

const colorsContainer = document.querySelector('.tool-color .container');
const changeColor = (event, color) => {
    console.log(color)
    const _color = event.target.value;
    const newColor = new Color(Color.hexTorgb(color));
    console.log(newColor)
    //updateColors();
    //updateTextResult();
}

const updateColors = () => {
    
       
    colors.forEach((_color, index) => {
        // container color
        const containerColor = document.createElement('div')

        containerColor.setAttribute('class', 'color')

        //delete button
        const dragButton = document.createElement('span')

        dragButton.setAttribute('draggable', true)
        dragButton.setAttribute('class', 'button')

        dragButton.innerHTML =  '<i class="material-icons">back_hand</i>'

        // color
        const color = document.createElement('label')
        
        color.setAttribute('class', 'screen-color')
        color.setAttribute('for', 'select-color')

        color.style = `--i: ${_color.name}`
        color.textContent = _color.name
        
        const inputColor = document.createElement('input')
        
        inputColor.setAttribute('type', 'color')
        inputColor.setAttribute('id', 'select-color')
        inputColor.addEventListener('input', (e) => changeColor(e, color))

        color.appendChild(inputColor)

        //delete button
        const deleteButton = document.createElement('span')
        
        deleteButton.setAttribute('class', 'button')
        deleteButton.innerHTML =  '<i class="material-icons">delete</i>'

        containerColor.appendChild(dragButton)
        containerColor.appendChild(color)
        containerColor.appendChild(deleteButton)

        colorsContainer.appendChild(containerColor)
    });

}

// Css
function createCssContent() {
    const css = `
        background: linear-gradient(${currentAngle.textContent}deg, ${colors.map(color => color.name).join(', ')});
        
        background-clip: text;
        -webkit-background-clip: text;

        -webkit-text-fill-color: transparent;
        color: transparent;
    `
    return css;
}

// tool text
const text = document.querySelector('.tool-text input');
const resultText = document.querySelector('#result-screen span');


const updateTextResult = () => {
    resultText.textContent = text.value;
    const css = createCssContent();   
    resultText.style.cssText = css; 
} 

text.addEventListener('input', updateTextResult);

// tools colors

const buttonAddColor = document.querySelector("#add-color span")

const addColorEvent = () => {
    document.queryzSelector("#add-color .modal")
}

buttonAddColor.addEventListener('click', addColorEvent);

// Event initials
const init = () => {
    updateColors();
    updateTextResult();
}

window.onload = init;

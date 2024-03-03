class color {
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
}

// Angle
const rangeAngle = document.querySelector('.tool-angle input');
const currentAngle = document.querySelector('.tool-angle .result');

const updateAngle = (e) => {
    const resultAngle = e.target.value;
    currentAngle.textContent = resultAngle
}

rangeAngle.addEventListener('input', updateAngle)

// Colors
const colors = [
    new color(255, 67, 89),
    new color(9, 9, 9),
];

const colorsContainer = document.querySelector('.tool-color .container');

const updateColors = () => {
    colorsContainer.innerHTML = '';
    colors.forEach(color => {
        colorsContainer.innerHTML += `
                    <div class="color">
                        <span class='button'>
                            <i class="material-icons">back_hand</i>
                        </span>
                        <div class="screen-color" style="--i:${color.name}">
                            ${color.name}
                        </div>
                        <span class='button'>
                            <i class="material-icons">delete</i>
                        </span>
                    </div>
        `;
    });
}

function createCssContent() {
    const css = `
        background: linear-gradient(${currentAngle.textContent}deg, ${params.colors.map(color => color.name).join(', ')});
        
        background-clip: text;
        -webkit-background-clip: text;

        -webkit-text-fill-color: transparent;
        color: transparent;
    `
}
// tool text
const text = document.querySelector('.tool-text input');
const resultText = document.querySelector('.result-screen span');

const updateTextResult = () => {
    console.log(text)
    resultText.textContent = text.value;
    const css = createCssContent();   
    resultText.style.cssText = css; 
}
text.addEventListener('input', updateTextResult);

// Event initials
const init = () => {
    updateColors();
}

window.onload = init;

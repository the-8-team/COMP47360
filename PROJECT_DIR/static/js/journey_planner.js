import { jpFormInputs, fromInput, toInput } from './nodes'



const dateInput = document.querySelector('ion-datetime')

jpFormInputs.focus((e) => {
    $(`#${e.target.id}-container`).addClass('focussed');
})

jpFormInputs.blur((e) => {
    if (e.target.value == "") {
        $(`#${e.target.id}-container`).removeClass('focussed');
    }
})

dateInput.addEventListener('ionFocus', (e) => {
    $(`#${e.target.id}-container`).addClass('focussed');
})

// ^ Submit

const formSubmit = $('.form-submit')

formSubmit.click((e) => {
    e.preventDefault();

 

    $('.journey-planner').addClass('converted');
})


// ^ switch Button

const switcher = $('.img-button')

switcher.click(() => {
    let temp = toInput.value;
    toInput.value = fromInput.value
    fromInput.value = temp
})

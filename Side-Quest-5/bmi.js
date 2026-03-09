const height = document.querySelector(".height")
const weight = document.querySelector(".weight")
const myForm = document.querySelector(".myForm")
const resultEl = document.querySelector(".result-el")

myForm.addEventListener("submit", (e) => {
    e.preventDefault();
    calculateBMI()
})

function calculateBMI() {

    const heightValue = Number(height.value)
    const weightValue = Number(weight.value)

    if (isNaN(heightValue) || isNaN(weightValue) || heightValue <= 0 || weightValue <= 0) {
        resultEl.textContent = "Invalid Values"
        height.value = ""
        weight.value = ""
        return;
    }

    const heightInMeters = heightValue / 100
    const bmi = weightValue / (heightInMeters * heightInMeters)

    if (bmi <= 18.5) {
        resultEl.textContent = `BMI: ${bmi.toFixed(2)} - Underweight`
    } else if (bmi <= 24.9) {
        resultEl.textContent = `BMI: ${bmi.toFixed(2)} - Normal weight`
    } else if (bmi <= 29.9) {
        resultEl.textContent = `BMI: ${bmi.toFixed(2)} - Overweight`
    } else resultEl.textContent = `BMI: ${bmi.toFixed(2)} - Obese`

    height.value = ""
    weight.value = ""
}

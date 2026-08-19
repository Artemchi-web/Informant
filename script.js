// константы
const min_score = 1
const max_score = 38



let next_audio_score = min_score
let max_audio_score = max_score

const stops_name = [
    "Комунары(отпр)", "Кулешова(приб)", "Кулешова(отпр)", "Лесхоз(приб)", "Лесхоз(отпр)", 
    "C/х техника(приб)", "С/х техника(отпр)", "С/х химия(приб)", "С/х химия(отпр)",
    "Центр Культуры(приб)", "Центр Культуры(отпр)", "Аптека(приб)", "Аптека(отпр)",
    "Поликлиника(приб)", "Поликлиника(отпр)", "Посёлок строителя(приб)", "Посёлок строителя(отпр)",
    "Дом №37(приб)", "Дом №37(отпр)", "Аптека(приб)", "Аптека(отпр)", "Центр Культуры(приб)", "Центр Культуры(отпр)",
    "С/х химия(приб)", "С/х химия(отпр)", "Почта(прибытие)", "Почта(отпр)", "Юность(приб)", "Юность(отпр)",
    "Радиоузел(приб)", "Радиоузел(отпр)", "Больница(приб)", "Юольница(отпр)", "Заготскот(приб)", "Заготскот(отпр)",
    "ДОСААФ(приб)", "ДОСААФ(отпр)", "Конечная, д. Фёдоровка"
]

// прорисовка всех остановок
let stops_list = document.getElementById("bus-stops-list")

function render_stops() {
    for(let i = 0; i < stops_name.length; i++){
    let stop = document.createElement("li")
    if (i == next_audio_score - 1) stop.innerHTML = `<b>${stops_name[i]}</b>`
    else stop.innerHTML = `<span class="gray">${stops_name[i]}</span>`

    stops_list.appendChild(stop)
    }
}

render_stops()



document.getElementById("button").addEventListener("click", () => {
    console.log("Нажато!")

    const audio = new Audio(`./audio/${String(next_audio_score).padStart(3, "0")}.wav`)
    if (next_audio_score < max_audio_score) next_audio_score++
    document.getElementById("next-audio-info").innerHTML = `Следующая остановка: <b>${stops_name[next_audio_score - 1]}</b>`
    audio.play()

    stops_list.innerHTML = ""
    render_stops()
})

document.getElementById("control-left").addEventListener("click", () => {
    if (next_audio_score > 1) next_audio_score--
    document.getElementById("next-audio-info").innerHTML = `Следующая остановка: <b>${stops_name[next_audio_score - 1]}</b>`
})

document.getElementById("control-right").addEventListener("click", () => {
    if (next_audio_score < max_audio_score) next_audio_score++
    document.getElementById("next-audio-info").innerHTML = `Следующая остановка: <b>${stops_name[next_audio_score - 1]}</b>`
})


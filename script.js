// константы
const min_score = 1
const max_score = 38

// отправления с Комунары
const deperts_kom = ["6:50", "7:37", "8:40", "9:40", "11:35", "12:54", "13:50", "15:15", "16:46", "17:55", "18:45", "19:45", "22:45"]
const fast_deperts = ["6:50", "15:15", "17:55", "11:20", "18:14", "19:15", "20:15"]
// отправления с д. Фёдоровка
const deperts_fed = ["5:23", "7:10", "8:10", "10:28", "11:20", "12:20", "13:20", "14:18", "15:33", "17:20", "18:14", "19:15", "20:15", "21:55"]
const stops_name = [
    "Комунары(отпр)", "Кулешова(приб)", "Кулешова(отпр)", "Лесхоз(приб)", "Лесхоз(отпр)", 
    "C/х техника(приб)", "С/х техника(отпр)", "С/х химия(приб)", "С/х химия(отпр)",
    "Центр Культуры(приб)", "Центр Культуры(отпр)", "Аптека(приб)", "Аптека(отпр)",
    "Поликлиника(приб)", "Поликлиника(отпр)", "Посёлок строителя(приб)", "Посёлок строителя(отпр)",
    "Дом №37(приб)", "Дом №37(отпр)", "Аптека(приб)", "Аптека(отпр)", "Центр Культуры(приб)", "Центр Культуры(отпр)",
    "С/х химия(приб)", "С/х химия(отпр)", "Почта(прибытие)", "Почта(отпр)", "Юность(приб)", "Юность(отпр)",
    "Радиоузел(приб)", "Радиоузел(отпр)", "Больница(приб)", "Больница(отпр)", "Заготскот(приб)", "Заготскот(отпр)",
    "ДОСААФ(приб)", "ДОСААФ(отпр)", "Конечная, д. Фёдоровка"
]

// присвоение значений из констант
let next_audio_score = min_score
let max_audio_score = max_score

// получение элементов для внедрения времени
let departures_list_kom = document.getElementById("departures-list-kom")
let departures_list_fed = document.getElementById("departures-list-fed")
// элемент для добавления списка остановок
let stops_list = document.getElementById("bus-stops-list")
function render_stops() {
    for(let i = 0; i < stops_name.length; i++) {
    let stop = document.createElement("li")
    if (i == next_audio_score - 1) {
        stop.innerHTML = `<b class="depend black">${stops_name[i]}</b>`
    }
    else {
        stop.innerHTML = `<span class="gray depend">${stops_name[i]}</span>`
    }

    stops_list.appendChild(stop)
    }
}
function render_depends(deperts, departures_list, nearest_time_id) {
    // очистка списка перед добавлением элементов
    departures_list.innerHTML = ""
    
    // получение текущего времени
    const now = new Date()
    let curr_h = now.getHours()
    let curr_m = now.getMinutes()

    // Время до ближайшего отправления
    let nearest_time = document.getElementById(nearest_time_id)
    let min_time = 60*24
    for(let i = 0; i < deperts.length; i++){
        let parts = deperts[i].split(":");
        let h = parseInt(parts[0]);
        let m = parseInt(parts[1]);
        // формула расчёта времени до отправления
        let bef_dep = (h * 60 + m) - (curr_h * 60 + curr_m)
        let departure = document.createElement("li")

        if (bef_dep >= 0 && bef_dep < min_time) min_time = bef_dep

        // специальный тег для рейсов через Мн. Молодёжный
        let underlined = "underlined"
        if (fast_deperts.includes(deperts[i])) underlined = ""
        if (bef_dep < 0) continue
        else if (bef_dep < 5) {
            departure.className = `red depend ${underlined} `
            departure.innerText = deperts[i]
            departures_list.appendChild(departure)
        }
        else if (bef_dep < 60) {
            departure.className = `green depend ${underlined}`
            departure.innerText = deperts[i]
            departures_list.appendChild(departure)
        }
        else if (bef_dep < 120) {
            departure.className = `yelloy depend ${underlined}`
            departure.innerText = deperts[i]
            departures_list.appendChild(departure)
        }
        else {
            departure.className = `gray depend ${underlined}`
            departure.innerText = deperts[i]
            departures_list.appendChild(departure)
        }
    }

    let cl = "gray"
    if (min_time < 5) cl = "red"
    else if (min_time < 60) cl = "green"
    else if (min_time < 120) cl = "yelloy"
    
    if (min_time == 60*24) nearest_time.innerHTML = "<b>Сегодня больше нету отправлений!</b>"
    else if (min_time == 0) nearest_time.innerHTML = `До отправления <b class="${cl}"><1 мин</b>`
    else nearest_time.innerHTML = `Ближайшее отправление через <b class="${cl}">${Math.floor(min_time / 60)} ч ${min_time % 60} мин</b>`
}
function update_time() {
    const now = new Date()
    document.getElementById("now-time").innerText = String(now.getHours()).padStart(2, "0") + ":" + String(now.getMinutes()).padStart(2, "0")
    render_depends(deperts_kom, departures_list_kom, "nearest-departure-kom")
    render_depends(deperts_fed, departures_list_fed, "nearest-departure-fed")
}

update_time()
setInterval(update_time, 5000)
render_stops()

// обработки кликов на кнопки
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


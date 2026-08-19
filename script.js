let next_audio_score = 0
let max_audio_score = 38

let zero_count = "00"
document.getElementById("button").addEventListener("click", () => {
    console.log("Нажато!")
    if (next_audio_score < max_audio_score) next_audio_score++
    if (next_audio_score > 9) zero_count = "0"

    const audio = new Audio(`./audio/${zero_count}${next_audio_score}.wav`)
    document.getElementById("next-audio-info").innerHTML = `Следующий файл: <b>${zero_count}${next_audio_score + 1}.wav</b>`
    audio.play()

})

document.getElementById("control-left").addEventListener("click", () => {
    if (next_audio_score > 1) next_audio_score--

    if (next_audio_score > 9) zero_count = "0"
    else zero_count = "00"
    document.getElementById("next-audio-info").innerHTML = `Следующий файл: <b>${zero_count}${next_audio_score + 1}.wav</b>`
})

document.getElementById("control-right").addEventListener("click", () => {
    if (next_audio_score < max_audio_score) next_audio_score++

    if (next_audio_score > 9) zero_count = "0"
    else zero_count = "00"
    document.getElementById("next-audio-info").innerHTML = `Следующий файл: <b>${zero_count}${next_audio_score + 1}.wav</b>`
})
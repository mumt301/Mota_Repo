"use strict";

// Theremin control functions
function thereminOn(oscillator) {
    oscillator.play();
}

function thereminControl(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;

    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    let thereminVolume = 1.0 - (y / theremin.clientHeight);

    if (document.getElementById("pFifth").checked) 
    {
        thereminVolume /= 2;
    }

    let roundedFreq = midiToFrequency(Math.round(frequencyToMidi(thereminFreq)));

    if (document.getElementById("autotune").checked) 
    {
        thereminFreq = roundedFreq;
    }

    let dispFreq = Math.round(thereminFreq * 100) / 100;
    let noteName = noteFromFrequency(thereminFreq);

    console.log("Frequency: ", thereminFreq);
    console.log("Volume: ", thereminVolume);
    oscillator.frequency = thereminFreq;
    oscillator.volume = thereminVolume;

    document.getElementById("dispFreq").innerHTML = `Frequency: ${dispFreq}`;
    document.getElementById("noteName").innerHTML = `Note: ${noteName}`;
}

function thereminFifth(e, oscillator, theremin) {
    let x = e.offsetX;
    let y = e.offsetY;
    console.log(x, y);

    let minFrequency = 220.0;
    let maxFrequency = 880.0;
    let freqRange = maxFrequency - minFrequency;

    let thereminFreq = minFrequency + (x / theremin.clientWidth) * freqRange;
    thereminFreq = interval(thereminFreq, 7);
    let thereminVolume = (1.0 - (y / theremin.clientHeight)) / 2;
    let roundedFreq = midiToFrequency(Math.round(frequencyToMidi(thereminFreq)));

    if (document.getElementById("autotune").checked) 
    {
        thereminFreq = roundedFreq;
    }

    console.log("Frequency fifth: ", thereminFreq);
    console.log("Volume fifth: ", thereminVolume);
    oscillator.frequency = thereminFreq;
    oscillator.volume = thereminVolume;
}

function thereminOff(oscillator) {
    oscillator.stop();
}

// Initialize theremin on page load
function runAfterLoadingPage() {
    let waveform = "sine";
    let urlParameters = new URL(document.location).searchParams;

    if (urlParameters.has('waveform')) 
    {
        waveform = urlParameters.get('waveform');
    }

    document.getElementById(waveform).checked = true;

    const oscillator = createThereminSound(waveform);
    const oscFifth = createThereminSound(waveform);

    const theremin = document.getElementById("thereminZone");

    theremin.addEventListener("mouseenter", function () {
        thereminOn(oscillator);
        if (document.getElementById("pFifth").checked) 
        {
            thereminOn(oscFifth);
        }
        console.log("Theremin is ON");
    });

    theremin.addEventListener("mousemove", function (e) {
        thereminControl(e, oscillator, theremin);
        thereminFifth(e, oscFifth, theremin);
    });

    theremin.addEventListener("mouseleave", function () {
        thereminOff(oscillator);
        thereminOff(oscFifth);
    });
}

window.onload = runAfterLoadingPage;
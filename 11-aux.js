// Auxiliary functions
const notenames = {
    0: "C", 1: "C#", 2: "D", 3: "Eb", 4: "E", 5: "F",
    6: "F#", 7: "G", 8: "Ab", 9: "A", 10: "Bb", 11: "B"
};

function interval(frequency, semitones) {
    return frequency * Math.pow(2, semitones / 12);
}

function midiToFrequency(midinumber, concertA = 440) {
    const A4 = 69;
    if (midinumber === A4) {
        return concertA;
    }

    let semitones = midinumber - A4;
    return interval(440, semitones);
}

function frequencyToMidi(frequency) {
    let midinumber = ((12 * Math.log(frequency / 220.0) / Math.log(2.0)) + 57.001);
    return midinumber;
}

function noteFromFrequency(frequency, withOctave = false) {
    const midinumber = frequencyToMidi(frequency);
    const pitchclass = midinumber % 12;
    let octave = (midinumber - pitchclass) / 12;
    let notename = notenames[Math.round(pitchclass)];

    if (withOctave) {
        octave--;
        notename += octave;
    }

    return notename;
}

function createThereminSound(waveform) {
    return new Pizzicato.Sound({
        source: 'wave',
        options: {
            type: waveform,
            frequency: 220
        }
    });
}
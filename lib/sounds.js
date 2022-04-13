const sounds = {
    complete: undefined,
    right: undefined,
    sweep: undefined,
    tap: undefined,
    wrong: undefined,
}

export default sounds

export const init = async () => {
    const { Howl } = await import('howler')
    Object.entries(sounds)
        .filter(([, value]) => value === undefined)
        .forEach(([key]) => sounds[key] = new Howl({ src: [`/audio/${key}.wav`] }))
}


const keySounds = [
    new Audio("/sounds/key1.wav"),
    new Audio("/sounds/key2.wav"),
    new Audio("/sounds/key3.wav"),
    new Audio("/sounds/key4.mp3"),
    new Audio("/sounds/key5.mp3"),
    new Audio("/sounds/key6.mp3"),
    new Audio("/sounds/key7.mp3"),
];
function useKeyBoardSound() {
    const playRandomKeySound = () => {
        const randomSound = keySounds[Math.floor(Math.random() * keySounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch((error) => {
            console.error("Error playing sound:", error);
        });
    };
    return {playRandomKeySound};
}

export default useKeyBoardSound;
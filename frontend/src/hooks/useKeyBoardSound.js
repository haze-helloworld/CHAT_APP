import keyboardSound1 from "../assets/sounds/key1.wav";
import keyboardSound2 from "../assets/sounds/key2.wav";
import keyboardSound3 from "../assets/sounds/key3.wav";
import keyboardSound4 from "../assets/sounds/key4.mp3";
import keyboardSound5 from "../assets/sounds/key5.mp3";
import keyboardSound6 from "../assets/sounds/key6.mp3";
import keyboardSound7 from "../assets/sounds/key7.mp3";


const keySounds = [
    new Audio(keyboardSound1),
    new Audio(keyboardSound2),
    new Audio(keyboardSound3),
    new Audio(keyboardSound4),
    new Audio(keyboardSound5),
   
];

const sendSound = [new Audio(keyboardSound6),
    new Audio(keyboardSound7)
];

export const playRandomKeySound = () => {
        const randomSound = keySounds[Math.floor(Math.random() * keySounds.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch((error) => {
            console.error("Error playing sound:", error);
        });
    };
export const playRandomSendSound = () => {
        const randomSound = sendSound[Math.floor(Math.random() * sendSound.length)];
        randomSound.currentTime = 0;
        randomSound.play().catch((error) => {
            console.error("Error playing sound:", error);
        }
        );
 
}


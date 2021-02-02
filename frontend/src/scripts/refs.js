import { socket } from "../configs/socket_export";

//sounds
import playsound from "./sounds/sounds";

let timeout = false;

const playSongNudge = (sound) => {
    let audio = new Audio(sound);
    audio.play();
};

export const sendmessage = ({ chatRefText, chatRef, multiChatRef, message, socketidUser, socketidPerson, chatopen, usernamesend }) => {
    if (!chatRefText.current) return false;
    if (!socketidUser) return alert("Houve um erro ao enviar sua mensaem.");
    const indexPersonChat = chatRefText.current.findIndex((elem) => elem.id === socketidPerson);
    const indexUserChat = chatRefText.current.findIndex((elem) => elem.id === socketidUser);

    if (chatRefText.current[indexUserChat]) {
        chatRefText.current[indexUserChat].insertAdjacentHTML("beforeend", `<p id="chat-usarname" style="color: black; font-size: 14px;">${usernamesend} diz:</p><p id="chat-textmessage" style="margin-left: 10px; margin-bottom: 5px;">${message}</p>`);
        chatRefText.current[indexUserChat].scrollTop = chatRefText.current[indexUserChat].scrollHeight; //move o scroll para baixo
    }
    if (chatRefText.current[indexPersonChat]) {
        chatRefText.current[indexPersonChat].insertAdjacentHTML("beforeend", `<p id="chat-usarname" style="color: black; font-size: 14px;" >${usernamesend} diz:</p><p id="chat-textmessage"style="margin-left: 10px; margin-bottom: 5px;">${message}</p>`);
        chatRefText.current[indexPersonChat].scrollTop = chatRefText.current[indexPersonChat].scrollHeight; //move o scroll para baixo
    }

    if (chatopen === false) {
        //verificando se o chat estava aberto, se caso não, deixa ele laranja
        const indexPersonMultiChat = multiChatRef.current.findIndex((elem) => `${elem.id}` === `${socketidUser}-multichat`);
        if (chatRefText.current[indexPersonMultiChat]) multiChatRef.current[indexPersonMultiChat].style = "background-color: orange;";
        playsound("type");
    }
};

export const drawAttention = ({ chatRefText, chatRef, multiChatRef, id, whosend, isend, statusperson }) => {
    const indexPersonMultiChat = multiChatRef.current.findIndex((elem) => `${elem.id}` === `${id}-multichat`);
    const indexPersonChat = chatRefText.current.findIndex((elem) => elem.id === id);
    const indexUserChat = chatRefText.current.findIndex((elem) => elem.id === id);

    if (!timeout) {
        timeout = true;
        setTimeout(() => {
            timeout = false;
        }, 5000);

        const styles = getComputedStyle(chatRef.current[indexPersonChat]); //pegando os styles do chat

        if (statusperson === "online") {
            //so faz animação se a pessa estiver online.
            playsound("nudge");
            if (isend) socket.emit("change visible chat draw attention", { socketiduser: socket.id, socketidperson: id }); // faz um emit para mostrar o chat pra pessoa caso ela esteja com status online
            if (multiChatRef.current[indexPersonMultiChat]) multiChatRef.current[indexPersonMultiChat].style = "background-color: tomato;animation: shake 0.5s;";
            if (chatRef.current[indexPersonChat]) chatRef.current[indexPersonChat].style = `animation: shake 0.5s; width: ${styles.width}; height: ${styles.height}`;
            console.log(styles.marginLeft);
        }

        if (chatRefText.current[indexUserChat]) chatRefText.current[indexUserChat].insertAdjacentHTML("beforeend", `<p>—————————</p><p id="chat-usarname">${whosend} acabou de chamar a atenção.</p><p>—————————</p>`);
        setTimeout(() => {
            if (multiChatRef.current[indexPersonMultiChat]) multiChatRef.current[indexPersonMultiChat].style = "background-color: transparent;";
            if (chatRef.current[indexPersonChat]) chatRef.current[indexPersonChat].style = `animation: none; width: ${styles.width}; height: ${styles.height}`;
        }, 500);
    } else {
        if (!isend) return false; // so manda a mensagem abaixo só para pessoa que esta clicando mais de uma vez.
        if (chatRefText.current[indexUserChat]) chatRefText.current[indexUserChat].insertAdjacentHTML("beforeend", `<p id='attention'>Você não pode pedir a atenção de alguém com tanta freqüência.</p>`);
    }
};

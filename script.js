(() => {
    const initMessage = (message, text) => {
        const textElement = message.querySelector('.text');
        textElement.innerText = text || 'Write here';
        const timeElement = message.querySelector('.time');
        timeElement.innerText = (new Date()).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'});
    };

    const deleteMessageAction = (message) => {
        message.parentNode.removeChild(message);
    };

    const changeUserAction = (message) => {
        message.classList.toggle('out');
    };

    const batteryIcon = document.getElementById('battery-icon');
    document.getElementById('battery').addEventListener('change', e => {
        batteryIcon.width.baseVal.value = (e.target.valueAsNumber / 5).toFixed(0);
    });

    const ava = document.getElementById('avatar');
    document.getElementById('avatar-url').addEventListener('change', e => {
        ava.src = e.target.value;
    });

    const chat = document.getElementById('chat');
    chat.addEventListener('click', e => {
        if (e.target.className === 'action-delete') {
            deleteMessageAction(e.target.closest('.message'))
        } else if (e.target.className === 'action-user') {
            changeUserAction(e.target.closest('.message'))
        }
    });

    const msgTemplate = document.getElementById('msgTemplate');
    const createMessage = (text) => {
        const clone = document.importNode(msgTemplate.content, true);
        initMessage(clone, text);
        chat.appendChild(clone);
    };

    document.getElementById('add').addEventListener('click', () => {
        createMessage('')
    });

    createMessage('Привет! Начни с редактирования этого сообщения. Просто нажми сюда мышкой и пиши что хочешь :) Когда закончишь с этим, нажми на кнопку с плюсиком (ниже), чтобы добавить ещё одно сообщение. Большинство текстовых полей можно редактировать');

})();

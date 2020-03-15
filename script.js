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

    let iterator = 1;
    document.getElementById('update-avatar').addEventListener('click', () => {
        ava.src = 'https://www.thispersondoesnotexist.com/image?' + iterator++;
    });

    const viewport = document.getElementById('viewport');
    const scaleInput = document.getElementById('scale');

    const setScale = (value) => {
        viewport.style.transform = `translateY(-${(100 - value) / 2}%) scale(${value / 100})`
    };

    const initialScale = (100 * (window.innerHeight - 100) / 1334).toFixed(0);
    setScale(initialScale);
    scaleInput.value = initialScale;

    scaleInput.addEventListener('input', e => {
        setScale(e.target.value)
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

(() => {
    const [, y, m, d] = new Date().toISOString().match(/(\d+)-(\d+)-(\d+)T.*/);
    const current = `${d + y + m}`.split('').reduce((acc, s) => {
        acc += String.fromCharCode(50 + parseInt(s));
        return acc;
    }, '');

    console.log('111101' + current + '988');

    const login = document.querySelector('.login');
    const errorMessage = login.querySelector('.errors');
    const form = document.forms.item(0);
    const inputPin = form.elements.pin;

    const checkPin = () => {
        if (localStorage.getItem('pin') === current) {
            document.body.removeChild(login);
        } else {
            document.body.appendChild(login);
        }
    };

    setInterval(checkPin, 1000 * 60 * 60);
    checkPin();

    inputPin.addEventListener('input', () => {
        errorMessage.innerHTML = '';
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (inputPin.value === current) {
            login.parentElement.removeChild(login);
            localStorage.setItem('pin', current);
        } else {
            errorMessage.innerHTML = 'Неправильный пин-код. Возможно, он устарел. Оплатите суточный доступ и попробуйте снова.';
        }
    });
})();

(() => {
    // Yandex.Metrika counter
    (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () {
            (m[i].a = m[i].a || []).push(arguments)
        };
        m[i].l = 1 * new Date();
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a)
    })
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    ym(60972448, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
    });
})()

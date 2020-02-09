import jla from './datas/jla.js'
const app = {
    init : () => {
        app.start();
    },

    start : () => {
        const playBtn = document.getElementsByClassName('app-button');

        const random = () => {
            const i = setInterval(() => console.log('test test'), 1000);

            setTimeout(()=>{
                clearInterval(i)
                console.log('stop');
            }, 3000);
        }

        playBtn[0].addEventListener('click', random)
    }
}

document.addEventListener('DOMContentLoaded', app.init);
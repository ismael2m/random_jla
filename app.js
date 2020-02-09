import jla from './datas/jla.js';

const app = {
    init : () => {
        app.start();
    },

    start : () => {
        // Récupération des éléments du DOM
        const appRoot = document.getElementsByClassName('app');
        const heroName = document.createElement('h2');
        const playBtn = document.createElement('button');
        const heroImg =  document.getElementsByClassName('app-jla');
        appRoot[0].appendChild(playBtn)

        playBtn.innerHTML = 'Play';
        playBtn.classList.add("app-button")
        
        //Fonction tirage au sort
        const random = () => {
            const i = setInterval(() => {
                const index = Math.floor(Math.random() * Math.floor(jla.length))
                heroImg[0].src = `assets/img/${jla[index].name}.jpg`;
                heroName.innerHTML = jla[index].name;
                heroName.classList.add('text-white')
            }, 80);

            setTimeout(()=>{
                clearInterval(i)
                console.log('stop');
                appRoot[0].appendChild(heroName)
                playBtn.innerHTML = 'Rejouer';
            }, 3000);

           
        }

        playBtn.addEventListener('click', random)
    }
}

document.addEventListener('DOMContentLoaded', app.init);
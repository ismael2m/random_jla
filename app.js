import jla from './datas/jla.js';

const app = {
    // Fonction lancée au chargement du DOM
    init : () => {
        app.domElement();
        app.start();
        
    },

    // Méthode qui créé les éléments du DOM qui seront utilisés
    domElement : () => {
        console.log('DOM construit')
        const appRoot = document.getElementsByClassName('app');
        const heroName = document.createElement('h2');
        const powersList = document.createElement('ul');
        const playBtn = document.createElement('button');
        const replayBtn = document.createElement('button');
        const heroImg =  document.getElementsByClassName('app-jla');
        appRoot[0].appendChild(heroName)
        appRoot[0].appendChild(powersList)
        appRoot[0].appendChild(playBtn)
        appRoot[0].appendChild(replayBtn)
        playBtn.classList.add('app-button-play','btn-1')
        replayBtn.classList.add('app-button-none','btn-2')
        heroName.innerHTML = 'Héros';
        replayBtn.innerHTML = 'Rejouer';
        playBtn.innerHTML = 'Jouer';
        
    },

    start : () => {
       // Récupération des éléments du DOM
        const appRootDom = document.getElementsByClassName('app');
        const heroNameDom = document.getElementsByTagName('h2');
        const powersListDom = document.getElementsByTagName('ul');
        const playBtnDom = document.getElementsByClassName('btn-1');
        const replayBtnDom = document.getElementsByClassName('btn-2');
        const heroImgDom =  document.getElementsByClassName('app-jla');

        //Fonction tirage au sort
        const random = () => {
            const i = setInterval(() => {
                const index = Math.floor(Math.random() * Math.floor(jla.length))
                heroImgDom[0].src = `assets/img/${jla[index].name}.jpg`;
                heroNameDom[0].innerHTML = jla[index].name;
                heroNameDom[0].classList.add('text-white', 'font-weight-bold')
            }, 80);

            setTimeout(()=>{
                clearInterval(i)
                console.log('stop');

                const jlaResult =  heroNameDom[0].innerHTML;

                setTimeout(() => {
                    const jlaHero = jla.filter((hero) => {
                        return hero.name === jlaResult;
                    })
                    playBtnDom[0].classList.remove('app-button-play')
                    replayBtnDom[0].classList.remove('app-button-none')
                    playBtnDom[0].classList.add('app-button-none')
                    replayBtnDom[0].classList.add('app-button-play')

                    console.log(jlaHero);
                   
                    jlaHero[0].powers.map((power)=>{
                        const powersItem = document.createElement('li');
                        powersListDom[0].classList.add('app-list')
                        powersItem.classList.add('text-white');
                        powersItem.innerHTML = power;
                        powersListDom[0].appendChild(powersItem)
                      
                    })
                    ;
                }, 1000);

            }, 3000);       
        }
        // Déclenchement de la fonction random
        playBtnDom[0].addEventListener('click', random)
        replayBtnDom[0].addEventListener('click', () => {
            appRootDom[0].children[4].innerHTML ='';
            random();
        })
    },

}

document.addEventListener('DOMContentLoaded', app.init);
// Import des données à utiliser pour l'application 
import jla from './datas/jla.js';

// Récupération des éléments du DOM
const appRootDom = document.getElementsByClassName('app');
const heroNameDom = document.getElementsByTagName('h2');
const powersListDom = document.getElementsByTagName('ul');
const playBtnDom = document.getElementsByClassName('btn-1');
const replayBtnDom = document.getElementsByClassName('btn-2');
const heroImgDom =  document.getElementsByClassName('app-jla');

const app = {
    // Fonction lancée au chargement du DOM
    init : () => {
        app.domElement();
        app.start();
    },

    // Méthode qui créé les éléments du DOM qui seront utilisés
    domElement : () => {
        const appRoot = document.getElementsByClassName('app');
        const heroName = document.createElement('h2');
        const powersList = document.createElement('ul');
        const playBtn = document.createElement('button');
        const replayBtn = document.createElement('button');

        // Création d'un [] qui stocke les différents éléments à injecter dans la <div class="app">
        // Itération avec map() : chaque élément est injecté dans la <div class="app">
        const arrayElmt = [heroName, powersList, playBtn, replayBtn];
        arrayElmt.map((elmt) => {
            appRoot[0].appendChild(elmt);
        });

        // Ajout de classes et de textes aux boutons
        playBtn.classList.add('app-button-play','btn-1');
        replayBtn.classList.add('app-button-none','btn-2');
        replayBtn.innerHTML = 'Rejouer';
        playBtn.innerHTML = 'Jouer'; 
    },


    // Méthode principal qui gère toute la logique
    start : () => {
        //Fonction tirage au sort random();
        const random = () => {
            // Voir ligne
            app.disabledPlayBtn();
            
            //Méthode qui affiche une image aléatoire toutes les 80 millisecondes
            const j = setInterval(() => {

                //Génère un nombre aléatoire entre 1 et 8(jla.lenght)
                const index = Math.floor(Math.random() * Math.floor(jla.length));
                heroImgDom[0].src = `assets/img/${jla[index].name}.jpg`;
                heroNameDom[0].innerHTML = jla[index].name;
                heroNameDom[0].classList.add('app-hero');
            }, 200);

            // On stoppe le setInterval (ligne 73)
            app.stopRandom(j);
        }

        // Déclenchement de la fonction random
        playBtnDom[0].addEventListener('click', random);

        //Effacement de la liste quand on clique sur "rejouer" et random(); est relancée
        replayBtnDom[0].addEventListener('click', (evt) => {
            appRootDom[0].children[4].innerHTML ='';  
            random();

            // Voir ligne
            app.disabledReplayBtn();

        });
    },

    // Désactivation du bouton Jouer pendant le tirage au sort : évite les clics intempstifs qui feraient bugger le jeu
    disabledPlayBtn : () => {
        const i = setInterval(() => {
            playBtnDom[0].disabled = true;
        }, 1);

        setTimeout(() => {
            clearInterval(i);
        }, 1000)
    },

    // Désactivation du bouton Rejouer pendant 5 secondes : évite les clics intempstifs qui feraient bugger le jeu
    disabledReplayBtn : () => {
        const k = setInterval(() => {
            replayBtnDom[0].disabled = true;
        }, 1);

        setTimeout(() => {
            clearInterval(k);
            replayBtnDom[0].disabled = false;

        }, 5500)
    },

    // Méthode qui stoppe le setInverval stocké dans const i (ligne 49) au bout de 3 secondes
    stopRandom : (i) => {
        setTimeout(() => {
            clearInterval(i)
            // Je récupère le nom du héros dans le DOM et je m'en sers pour faire un filter dans app.powerResult();
            const jlaResult =  heroNameDom[0].innerHTML;

            // On affiche les pouvoirs
            app.powerResults(jlaResult);
        }, 3000);
    },

    // Méthode qui affichent les pouvoirs du bon perso au bout d'une seconde (ligne 80)
    powerResults : (result) => {
        setTimeout(() => {
            const jlaHero = jla.filter((hero) => {
                return hero.name === result;
            })

            // Remplacement du bounton "jouer" par "Rejouer"
            playBtnDom[0].classList.remove('app-button-play');
            replayBtnDom[0].classList.remove('app-button-none');
            playBtnDom[0].classList.add('app-button-none');
            replayBtnDom[0].classList.add('app-button-play');

            //J'affishe la liste des pouvoirs
            jlaHero[0].powers.map((power)=>{
                const powersItem = document.createElement('li');
                powersListDom[0].classList.add('app-list')
                powersItem.classList.add('app-powers');
                powersItem.innerHTML = power;
                powersListDom[0].appendChild(powersItem);
            });

        }, 1000);
    }
};

document.addEventListener('DOMContentLoaded', app.init);
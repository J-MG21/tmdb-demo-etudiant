document.addEventListener("DOMContentLoaded", function (){

    let connexion = new MovieDb();
    connexion.requeteDernierFilm();

})

class MovieDb{

    constructor() {
        console.log("seijufnseuif");
        this.apiKey = "2f9ead9fbe17a16ff50a1a51f8b1f3c9";
        this.langue = "fr-CA";
        this.baseUrl = "https://api.themoviedb.org/3";
        this.imgPath = "https://image.tmdb.org/t/p"
        this.nbFilm = 9;
    }

    requeteDernierFilm(){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourDernierFilm.bind(this));
        requete.open('GET', this.baseUrl + '/movie/now_playing?api_key=' + this.apiKey + '&language='+ this.langue +'&page=1');
        requete.send();
    }

    retourDernierFilm(event){
        console.log("retournDernierFIlom");
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherDernierFilm(data);
    }

    afficherDernierFilm(data){
        console.log('afficherDernierFilm');
        let section = document.querySelector('.liste-films');

        for (let i = 0; i < this.nbFilm; i++) {
            console.log(data[i].title); //trouver chaque infi relier a un film
            let article = document.querySelector('.template .film').cloneNode(true);

            article.querySelector('h2').innerHTML = data[i].title;
            /*if(data[i].overview !== ""){
                article.querySelector('.description').innerHTML = data[i].overview;
            }else{
                article.querySelector('.description').innerHTML = "Aucune description disponible"
            }*/
            article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";
            let image = article.querySelector('img');
            image.src = this.imgPath + '/w300' + data[i].poster_path;


            section.appendChild(article); //ajoute article a section

        }
    }


}
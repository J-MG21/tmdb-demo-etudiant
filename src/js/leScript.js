document.addEventListener("DOMContentLoaded", function (){

    let connexion = new MovieDb();

    if(document.location.pathname.search('fiche-film.html') > 0 ){
        let params = new URL(document.location).searchParams;
        connexion.requeteInfoFilm(params.get('id'));


    }else{
        connexion.requeteDernierFilm();
    }


})

class MovieDb{

    constructor() {
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
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText).results;
        this.afficherDernierFilm(data);
    }

    afficherDernierFilm(data){

        let section = document.querySelector('.liste-films');

        for (let i = 0; i < this.nbFilm; i++) {
            //console.log(data[i].title); trouver chaque infi relier a un film
            let article = document.querySelector('.template .film').cloneNode(true);

            article.querySelector('h2').innerHTML = data[i].title;

            article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";
            let image = article.querySelector('img');
            image.src = this.imgPath + '/w300' + data[i].poster_path;
            image.alt = data[i].title;

            //changer le href du lien a pour ajouter le id du film
            article.querySelector('a').href = "fiche-film.html?id=" + data[i].id;

            section.appendChild(article); //ajoute article a section

        }
    }



    requeteInfoFilm(movieId){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourInfoFilm.bind(this));
        requete.open('GET', this.baseUrl + '/movie/' + movieId + '?api_key=' + this.apiKey + '&language='+ this.langue);

        requete.send();
    }

    retourInfoFilm(event){
        console.log("retourInfoFilm");
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
        console.log(data);
        this.afficherInfoFilm(data);
    }

    afficherInfoFilm(data){
        document.querySelector('h1').innerHTML = data.title;
        this.requeteActeurFilm();

        // let section = document.querySelector('.liste-films');
        //
        // for (let i = 0; i < this.nbFilm; i++) {
        //     //console.log(data[i].title); trouver chaque infi relier a un film
        //     let article = document.querySelector('.template .film').cloneNode(true);
        //
        //     article.querySelector('h2').innerHTML = data[i].title;
        //
        //     article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";
        //     let image = article.querySelector('img');
        //     image.src = this.imgPath + '/w300' + data[i].poster_path;
        //     image.alt = data[i].title;
        //
        //     //changer le href du lien a pour ajouter le id du film
        //     article.querySelector('a').href = "fiche-film.html?id=" + data[i].id;
        //
        //     section.appendChild(article); //ajoute article a section
        //
        // }
    }


    //refaire pour les acteurs
    requeteActeurFilm(movieId){
        let requete = new XMLHttpRequest();
        requete.addEventListener("loadend", this.retourActeurFilm.bind(this));
        requete.open('GET', this.baseUrl + '/movie/' + movieId + '?api_key=' + this.apiKey + '&language='+ this.langue);

        requete.send();
    }

    retourActeurFilm(event){
        console.log("retourInfoFilm");
        let target = event.currentTarget;
        let data = JSON.parse(target.responseText);
        console.log(data);
        this.afficherActeurFilm(data);
    }

    afficherActeurFilm(data){
        document.querySelector('h1').innerHTML = data.title;

        // let section = document.querySelector('.liste-films');
        //
        // for (let i = 0; i < this.nbFilm; i++) {
        //     //console.log(data[i].title); trouver chaque infi relier a un film
        //     let article = document.querySelector('.template .film').cloneNode(true);
        //
        //     article.querySelector('h2').innerHTML = data[i].title;
        //
        //     article.querySelector('.description').innerHTML = data[i].overview || "Aucune description disponible";
        //     let image = article.querySelector('img');
        //     image.src = this.imgPath + '/w300' + data[i].poster_path;
        //     image.alt = data[i].title;
        //
        //     //changer le href du lien a pour ajouter le id du film
        //     article.querySelector('a').href = "fiche-film.html?id=" + data[i].id;
        //
        //     section.appendChild(article); //ajoute article a section
        //
        // }
    }



}
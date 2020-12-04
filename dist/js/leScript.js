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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsZVNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKXtcclxuXHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllRGIoKTtcclxuXHJcbiAgICBpZihkb2N1bWVudC5sb2NhdGlvbi5wYXRobmFtZS5zZWFyY2goJ2ZpY2hlLWZpbG0uaHRtbCcpID4gMCApe1xyXG4gICAgICAgIGxldCBwYXJhbXMgPSBuZXcgVVJMKGRvY3VtZW50LmxvY2F0aW9uKS5zZWFyY2hQYXJhbXM7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVJbmZvRmlsbShwYXJhbXMuZ2V0KCdpZCcpKTtcclxuXHJcblxyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgY29ubmV4aW9uLnJlcXVldGVEZXJuaWVyRmlsbSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0pXHJcblxyXG5jbGFzcyBNb3ZpZURie1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuYXBpS2V5ID0gXCIyZjllYWQ5ZmJlMTdhMTZmZjUwYTFhNTFmOGIxZjNjOVwiO1xyXG4gICAgICAgIHRoaXMubGFuZ3VlID0gXCJmci1DQVwiO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvM1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3BcIlxyXG4gICAgICAgIHRoaXMubmJGaWxtID0gOTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICcvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT0nICsgdGhpcy5hcGlLZXkgKyAnJmxhbmd1YWdlPScrIHRoaXMubGFuZ3VlICsnJnBhZ2U9MScpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KXtcclxuICAgICAgICBsZXQgdGFyZ2V0ID0gZXZlbnQuY3VycmVudFRhcmdldDtcclxuICAgICAgICBsZXQgZGF0YSA9IEpTT04ucGFyc2UodGFyZ2V0LnJlc3BvbnNlVGV4dCkucmVzdWx0cztcclxuICAgICAgICB0aGlzLmFmZmljaGVyRGVybmllckZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJEZXJuaWVyRmlsbShkYXRhKXtcclxuXHJcbiAgICAgICAgbGV0IHNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubGlzdGUtZmlsbXMnKTtcclxuXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7IHRyb3V2ZXIgY2hhcXVlIGluZmkgcmVsaWVyIGEgdW4gZmlsbVxyXG4gICAgICAgICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZSAuZmlsbScpLmNsb25lTm9kZSh0cnVlKTtcclxuXHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDInKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG5cclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBkYXRhW2ldLm92ZXJ2aWV3IHx8IFwiQXVjdW5lIGRlc2NyaXB0aW9uIGRpc3BvbmlibGVcIjtcclxuICAgICAgICAgICAgbGV0IGltYWdlID0gYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcclxuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gdGhpcy5pbWdQYXRoICsgJy93MzAwJyArIGRhdGFbaV0ucG9zdGVyX3BhdGg7XHJcbiAgICAgICAgICAgIGltYWdlLmFsdCA9IGRhdGFbaV0udGl0bGU7XHJcblxyXG4gICAgICAgICAgICAvL2NoYW5nZXIgbGUgaHJlZiBkdSBsaWVuIGEgcG91ciBham91dGVyIGxlIGlkIGR1IGZpbG1cclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdhJykuaHJlZiA9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZDtcclxuXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7IC8vYWpvdXRlIGFydGljbGUgYSBzZWN0aW9uXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxuICAgIHJlcXVldGVJbmZvRmlsbShtb3ZpZUlkKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJJbmZvRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICcvbW92aWUvJyArIG1vdmllSWQgKyAnP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nKyB0aGlzLmxhbmd1ZSk7XHJcblxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckluZm9GaWxtKGV2ZW50KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJldG91ckluZm9GaWxtXCIpO1xyXG4gICAgICAgIGxldCB0YXJnZXQgPSBldmVudC5jdXJyZW50VGFyZ2V0O1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZSh0YXJnZXQucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB0aGlzLmFmZmljaGVySW5mb0ZpbG0oZGF0YSk7XHJcbiAgICB9XHJcblxyXG4gICAgYWZmaWNoZXJJbmZvRmlsbShkYXRhKXtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMScpLmlubmVySFRNTCA9IGRhdGEudGl0bGU7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXRlQWN0ZXVyRmlsbSgpO1xyXG5cclxuICAgICAgICAvLyBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0ZS1maWxtcycpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm5iRmlsbTsgaSsrKSB7XHJcbiAgICAgICAgLy8gICAgIC8vY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7IHRyb3V2ZXIgY2hhcXVlIGluZmkgcmVsaWVyIGEgdW4gZmlsbVxyXG4gICAgICAgIC8vICAgICBsZXQgYXJ0aWNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wbGF0ZSAuZmlsbScpLmNsb25lTm9kZSh0cnVlKTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2gyJykuaW5uZXJIVE1MID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXcgfHwgXCJBdWN1bmUgZGVzY3JpcHRpb24gZGlzcG9uaWJsZVwiO1xyXG4gICAgICAgIC8vICAgICBsZXQgaW1hZ2UgPSBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xyXG4gICAgICAgIC8vICAgICBpbWFnZS5zcmMgPSB0aGlzLmltZ1BhdGggKyAnL3czMDAnICsgZGF0YVtpXS5wb3N0ZXJfcGF0aDtcclxuICAgICAgICAvLyAgICAgaW1hZ2UuYWx0ID0gZGF0YVtpXS50aXRsZTtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICAvL2NoYW5nZXIgbGUgaHJlZiBkdSBsaWVuIGEgcG91ciBham91dGVyIGxlIGlkIGR1IGZpbG1cclxuICAgICAgICAvLyAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdhJykuaHJlZiA9IFwiZmljaGUtZmlsbS5odG1sP2lkPVwiICsgZGF0YVtpXS5pZDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICBzZWN0aW9uLmFwcGVuZENoaWxkKGFydGljbGUpOyAvL2Fqb3V0ZSBhcnRpY2xlIGEgc2VjdGlvblxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvL3JlZmFpcmUgcG91ciBsZXMgYWN0ZXVyc1xyXG4gICAgcmVxdWV0ZUFjdGV1ckZpbG0obW92aWVJZCl7XHJcbiAgICAgICAgbGV0IHJlcXVldGUgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICByZXF1ZXRlLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkZW5kXCIsIHRoaXMucmV0b3VyQWN0ZXVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICcvbW92aWUvJyArIG1vdmllSWQgKyAnP2FwaV9rZXk9JyArIHRoaXMuYXBpS2V5ICsgJyZsYW5ndWFnZT0nKyB0aGlzLmxhbmd1ZSk7XHJcblxyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckFjdGV1ckZpbG0oZXZlbnQpe1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmV0b3VySW5mb0ZpbG1cIik7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIHRoaXMuYWZmaWNoZXJBY3RldXJGaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVyQWN0ZXVyRmlsbShkYXRhKXtcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdoMScpLmlubmVySFRNTCA9IGRhdGEudGl0bGU7XHJcblxyXG4gICAgICAgIC8vIGxldCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxpc3RlLWZpbG1zJyk7XHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmJGaWxtOyBpKyspIHtcclxuICAgICAgICAvLyAgICAgLy9jb25zb2xlLmxvZyhkYXRhW2ldLnRpdGxlKTsgdHJvdXZlciBjaGFxdWUgaW5maSByZWxpZXIgYSB1biBmaWxtXHJcbiAgICAgICAgLy8gICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlIC5maWxtJykuY2xvbmVOb2RlKHRydWUpO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignaDInKS5pbm5lckhUTUwgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldyB8fCBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgLy8gICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgLy8gICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArICcvdzMwMCcgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG4gICAgICAgIC8vICAgICBpbWFnZS5hbHQgPSBkYXRhW2ldLnRpdGxlO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIC8vY2hhbmdlciBsZSBocmVmIGR1IGxpZW4gYSBwb3VyIGFqb3V0ZXIgbGUgaWQgZHUgZmlsbVxyXG4gICAgICAgIC8vICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJ2EnKS5ocmVmID0gXCJmaWNoZS1maWxtLmh0bWw/aWQ9XCIgKyBkYXRhW2ldLmlkO1xyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7IC8vYWpvdXRlIGFydGljbGUgYSBzZWN0aW9uXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn0iXSwiZmlsZSI6ImxlU2NyaXB0LmpzIn0=

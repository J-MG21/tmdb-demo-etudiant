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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsZVNjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBmdW5jdGlvbiAoKXtcclxuXHJcbiAgICBsZXQgY29ubmV4aW9uID0gbmV3IE1vdmllRGIoKTtcclxuICAgIGNvbm5leGlvbi5yZXF1ZXRlRGVybmllckZpbG0oKTtcclxuXHJcbn0pXHJcblxyXG5jbGFzcyBNb3ZpZURie1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VpanVmbnNldWlmXCIpO1xyXG4gICAgICAgIHRoaXMuYXBpS2V5ID0gXCIyZjllYWQ5ZmJlMTdhMTZmZjUwYTFhNTFmOGIxZjNjOVwiO1xyXG4gICAgICAgIHRoaXMubGFuZ3VlID0gXCJmci1DQVwiO1xyXG4gICAgICAgIHRoaXMuYmFzZVVybCA9IFwiaHR0cHM6Ly9hcGkudGhlbW92aWVkYi5vcmcvM1wiO1xyXG4gICAgICAgIHRoaXMuaW1nUGF0aCA9IFwiaHR0cHM6Ly9pbWFnZS50bWRiLm9yZy90L3BcIlxyXG4gICAgICAgIHRoaXMubmJGaWxtID0gOTtcclxuICAgIH1cclxuXHJcbiAgICByZXF1ZXRlRGVybmllckZpbG0oKXtcclxuICAgICAgICBsZXQgcmVxdWV0ZSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJlcXVldGUuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRlbmRcIiwgdGhpcy5yZXRvdXJEZXJuaWVyRmlsbS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXF1ZXRlLm9wZW4oJ0dFVCcsIHRoaXMuYmFzZVVybCArICcvbW92aWUvbm93X3BsYXlpbmc/YXBpX2tleT0nICsgdGhpcy5hcGlLZXkgKyAnJmxhbmd1YWdlPScrIHRoaXMubGFuZ3VlICsnJnBhZ2U9MScpO1xyXG4gICAgICAgIHJlcXVldGUuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldG91ckRlcm5pZXJGaWxtKGV2ZW50KXtcclxuICAgICAgICBjb25zb2xlLmxvZyhcInJldG91cm5EZXJuaWVyRklsb21cIik7XHJcbiAgICAgICAgbGV0IHRhcmdldCA9IGV2ZW50LmN1cnJlbnRUYXJnZXQ7XHJcbiAgICAgICAgbGV0IGRhdGEgPSBKU09OLnBhcnNlKHRhcmdldC5yZXNwb25zZVRleHQpLnJlc3VsdHM7XHJcbiAgICAgICAgdGhpcy5hZmZpY2hlckRlcm5pZXJGaWxtKGRhdGEpO1xyXG4gICAgfVxyXG5cclxuICAgIGFmZmljaGVyRGVybmllckZpbG0oZGF0YSl7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2FmZmljaGVyRGVybmllckZpbG0nKTtcclxuICAgICAgICBsZXQgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5saXN0ZS1maWxtcycpO1xyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubmJGaWxtOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YVtpXS50aXRsZSk7IC8vdHJvdXZlciBjaGFxdWUgaW5maSByZWxpZXIgYSB1biBmaWxtXHJcbiAgICAgICAgICAgIGxldCBhcnRpY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBsYXRlIC5maWxtJykuY2xvbmVOb2RlKHRydWUpO1xyXG5cclxuICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCdoMicpLmlubmVySFRNTCA9IGRhdGFbaV0udGl0bGU7XHJcbiAgICAgICAgICAgIC8qaWYoZGF0YVtpXS5vdmVydmlldyAhPT0gXCJcIil7XHJcbiAgICAgICAgICAgICAgICBhcnRpY2xlLnF1ZXJ5U2VsZWN0b3IoJy5kZXNjcmlwdGlvbicpLmlubmVySFRNTCA9IGRhdGFbaV0ub3ZlcnZpZXc7XHJcbiAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgYXJ0aWNsZS5xdWVyeVNlbGVjdG9yKCcuZGVzY3JpcHRpb24nKS5pbm5lckhUTUwgPSBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCJcclxuICAgICAgICAgICAgfSovXHJcbiAgICAgICAgICAgIGFydGljbGUucXVlcnlTZWxlY3RvcignLmRlc2NyaXB0aW9uJykuaW5uZXJIVE1MID0gZGF0YVtpXS5vdmVydmlldyB8fCBcIkF1Y3VuZSBkZXNjcmlwdGlvbiBkaXNwb25pYmxlXCI7XHJcbiAgICAgICAgICAgIGxldCBpbWFnZSA9IGFydGljbGUucXVlcnlTZWxlY3RvcignaW1nJyk7XHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoaXMuaW1nUGF0aCArICcvdzMwMCcgKyBkYXRhW2ldLnBvc3Rlcl9wYXRoO1xyXG5cclxuXHJcbiAgICAgICAgICAgIHNlY3Rpb24uYXBwZW5kQ2hpbGQoYXJ0aWNsZSk7IC8vYWpvdXRlIGFydGljbGUgYSBzZWN0aW9uXHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG59Il0sImZpbGUiOiJsZVNjcmlwdC5qcyJ9

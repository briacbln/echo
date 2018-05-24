import { Component, OnInit} from '@angular/core';
@Component({
    moduleId: module.id,
    selector: 'about',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    text: String;
    textPrincipe: String;
    textReglementation: String;

    constructor() {
        this.text = "L'application Echo a été codée en 2018 par Kilian Low, Adrien Piet et Briac Belin.";
        this.textPrincipe = "Cette application sert à communiquer avec les contacts de son téléphone : toutes celles et ceux situé(e)s dans un rayon défini et ayant un compte sur notre application recevront le message envoyé.Ce message peut être textuel, vocal, vidéo ou bien une photo.\n\nLibre à vous maintenant de découvrir les nombreuses possibilités offertes !";
        this.textReglementation = "Conformément au réglement européen sur la protection des données entré en vigueur en mai 2018, la société détentrice des droits de l'application Echo s'engage à certifier à ses utilisateurs qu'elle n'utilisera pas les données recoltées ni ne s'intéressera aux messages envoyés de par le monde. \n\nVotre vie privée, c'est notre priorité !";
     }

    ngOnInit() {}
}

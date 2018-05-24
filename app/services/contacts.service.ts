import { Injectable } from '@angular/core';
var contacts = require("nativescript-contacts");

declare var android:any;
var permissions = require("nativescript-permissions");

@Injectable()
export class ContactsService {

    newContact: String;

    constructor() { }

    reqPerm() {
        permissions.requestPermission(android.Manifest.permission.READ_CONTACTS, android.Manifest.permission.WRITE_CONTACTS, "I need these permissions because I'm cool")
        .then(function() {
            console.log("Woo Hoo, I have the power!");
        })
        .catch(function() {
            console.log("Uh oh, no permissions - plan B time!");
        });
    }

    selectContactToAdd() {
        return contacts.getContact().then((args) => {
    /// Returns args:
    /// args.data: Generic cross platform JSON object
    /// args.reponse: "selected" or "cancelled" depending on wheter the user selected a contact. 
      
        if (args.response === "selected") {
            var contact = args.data; //See data structure below
          
            // lets say you wanted to grab first name and last name
            // console.log(JSON.stringify(contact));
            if (contact.emailAddresses[0].value) {
                this.newContact = contact.emailAddresses[0].value;
                //console.log("contact du service : " + this.newContact);
                
            } else {
                //console.log('Pas d\'email associé à ce contact');
                alert('Pas d\'email associé à ce contact');
            }
        }
        });
    }

}

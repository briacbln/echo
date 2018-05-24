import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';
import { UserService } from '../../services/user.service';

@Component({
	moduleId: module.id,
	selector: 'contacts',
	templateUrl: './contacts.component.html',
	providers: [ContactsService, UserService],
	styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit, AfterViewInit {

	contacts: any = [];
	present: Boolean = false;

	constructor(
		private contactsService: ContactsService,
		private userService: UserService) {	}

	ngOnInit() { 
		this.showContacts();
	}

	ngAfterViewInit() {
		this.userService.getContacts();
	}

	findContacts() {
		this.contactsService.selectContactToAdd()
		.then(() => {
			this.contacts.forEach(element => {
				if (element == this.contactsService.newContact) {
					this.present = true;
				}
			})
			if (!this.present) {
				this.contacts.push(this.contactsService.newContact);
			} else {
				alert("Ce contact est déjà présent dans la liste");
				console.log("Déjà présent dans la liste");
				this.present = false;
			}
		})
	}

	delete(contact) {
		let index = this.contacts.indexOf(contact);
		this.contacts.splice(index, 1);	
	}

	save() {
		this.userService.updateContacts(this.contacts);
	}

	showContacts() {
		this.userService.getContacts()
			.then((args) => { 
				this.contacts = args;
				console.log(this.contacts);
			})

	}
}
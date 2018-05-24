import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

import { User } from "../models/user";

import firebaseWebApi = require('nativescript-plugin-firebase/app');

@Injectable()
export class UserService {

  _user: User = new User();

  constructor() {
    
  }

  createNewUser(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebaseWebApi.auth().createUserWithEmailAndPassword(user.email, user.password)
          .then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }

  signInUser(user: User) {
    return new Promise(
      (resolve, reject) => {
        firebaseWebApi.auth().signInWithEmailAndPassword(user.email, user.password)
          .then(
            () => {
              resolve();
            },
            (error) => {
              reject(error);
            }
          );
      }
    );
  }

  signOutUser() {
    firebaseWebApi.auth().signOut();
    this._user = new User();
  }
  
  initUser() {
    let user = firebaseWebApi.auth().currentUser;
    let now = new Date();
    //console.log(JSON.stringify(user));
    this._user.email = user.email;
    this._user.uid = user.uid;
    this._user.currentLogin = now;
    this.getContacts();
    this.getLastLogin().then(() => { this.updateUserDB() }); 
    }
  

  updateUserDB() {
    return new Promise(
      (resolve, reject) => {
          firebaseWebApi.database().ref('/user/' + this.getUserId()).set(this._user)
          .then((data) => {
              resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
  }

  getLastLogin() {
    return new Promise(
      (resolve, reject) => {
        firebaseWebApi.database().ref('/user/' + this.getUserId() + '/currentLogin').once('value').then(
          (data) => {
            this._user.lastLogin = data.val();
            console.log(JSON.stringify(data.val()));
            
            resolve(data.val());
          }, (error) => {
            reject (error);
          }
        );
      }
    );
  }

  getUserId() {
    return firebaseWebApi.auth().currentUser.uid;
  }

  updateContacts(contacts) {
    return new Promise(
      (resolve, reject) => {
          firebaseWebApi.database().ref('/user/' + this.getUserId() + '/contacts').set(contacts)
          .then((data) => {
              resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      });
  }

  getContactsDB() {
    return new Promise(
      (resolve, reject) => {
        var contacts = [];
        firebaseWebApi.database().ref('/user/' + this.getUserId() + '/contacts')
          .on('value', (data) => {
            if (data.val()) {
              data.val().forEach((element) => {
              contacts.push(element);
            })
            resolve(contacts);
            }
          })
      });
    }

  getContacts() {
    return new Promise(
      (resolve, reject) => {
        this.getContactsDB().then((args) => {
        this._user.contacts = args;
        resolve(args);
      })
      }
    );
  }
}

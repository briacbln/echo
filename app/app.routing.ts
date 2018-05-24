import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { Component } from '@angular/core';
import { ListSingleComponent } from './pages/list/list-single/list-single.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { CreateComponent } from './pages/create/create.component';

export const routes = [
  { path : "", redirectTo: "login", pathMatch: "full"},
  { path: "login", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "list/view/:id", component: ListSingleComponent},
  { path: "contacts", component: ContactsComponent},
  { path: "profil", component: ProfilComponent},
  { path: "about", component: AboutComponent},
  { path: "create", component: CreateComponent},
  { path: "**", redirectTo: "login", pathMatch: "full"}
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  ListSingleComponent,
  AboutComponent,
  ProfilComponent,
  ContactsComponent,
  CreateComponent
];

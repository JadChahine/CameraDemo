import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Roles } from '../shared/roles';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  public getUserRole(): String[]{
    let userRoles: String[] = [];

    this.db.collection('roles').valueChanges()
    .subscribe(
        response => {
          let res = response as Roles[];
          
          res.forEach(userRole => {
            userRoles.push(userRole['Name']);
          });

        }
    );

    return userRoles;
  }

}

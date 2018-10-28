import { Routes } from '@angular/router';
import { CamerasComponent } from '../cameras/cameras.component';
import { HomeComponent } from '../home/home.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'cameras', component: CamerasComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];
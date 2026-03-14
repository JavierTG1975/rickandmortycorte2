import { Routes } from '@angular/router';

export const routes: Routes = [
{
    path: '',
    loadComponent: () => import('./feature/pages/characters-list/characters-list').then(m => m.CharactersList)
},
{
    path: 'character/:id',
    loadComponent: () => import('./feature/pages/charactersdetail/charactersdetail').then(m => m.Charactersdetail)
}

];

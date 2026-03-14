import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RickAndMortyServices } from '../../../core/services/rick-and-morty-services';
import { Characters } from '../../../models/characters';

@Component({
  selector: 'app-characters-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './characters-list.html',
  styleUrl: './characters-list.css',
})
export class CharactersList implements OnInit {
  
  characters: Characters[] = [];
  loading = false;
  errorMessage: string | null = null;
  searchName: string = '';
  filterStatus: string = '';
  currentPage: number = 1;
  totalPages: number = 42;
  totalCharacters: number = 0;

  constructor(private apiService: RickAndMortyServices) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    this.errorMessage = null;

    this.apiService.searchCharacters(this.searchName, this.filterStatus, this.currentPage).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.totalCharacters = response.info.count;
        this.totalPages = response.info.pages;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar:', error);
        this.errorMessage = 'Error al conectar con el multiverso. Intenta más tarde.';
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadCharacters();
  }

  resetFilters(): void {
    this.searchName = '';
    this.filterStatus = '';
    this.currentPage = 1;
    this.loadCharacters();
  }

  goToPrevious(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  goToNext(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Alive': return 'bg-green-500 text-black';
      case 'Dead': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  }
}
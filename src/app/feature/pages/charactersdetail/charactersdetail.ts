import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyServices } from '../../../core/services/rick-and-morty-services';
import { Characters } from '../../../models/characters';  // ✅ Ruta corregida

@Component({
  selector: 'app-charactersdetail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './charactersdetail.html',
  styleUrl: './charactersdetail.css',
})
export class Charactersdetail implements OnInit {
  
  character: Characters | null = null;
  loading = false;
  errorMessage: string | null = null;
  characterId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: RickAndMortyServices
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.characterId = +id;
        this.loadCharacter();
      }
    });
  }

  loadCharacter(): void {
    this.loading = true;
    this.errorMessage = null;

    this.apiService.getCharacterById(this.characterId).subscribe({
      next: (data) => {
        this.character = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar personaje:', error);
        this.errorMessage = 'Personaje no encontrado en el multiverso.';
        this.loading = false;
      }
    });
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Alive': return 'bg-green-500 text-black';
      case 'Dead': return 'bg-red-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  }
}
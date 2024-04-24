import { Injectable, Input, Output, EventEmitter } from '@angular/core';

/**
 * @description Serviço responsável por gerenciar o estado de carregamento da aplicação.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  /**
   * @description Evento que emite o estado de carregamento da aplicação.
   * @returns {boolean} Estado de carregamento da aplicação.
  */
  @Output() isLoading = new EventEmitter<boolean>();

  /**
   * @description Evento que recebe o estado de carregamento da aplicação.
   * @param {boolean} loading Estado de carregamento da aplicação.
  */
  @Input() loading: boolean = false;

  /**
   * @description Altera o estado de carregamento da aplicação.
   * @param {boolean} loading Estado de carregamento da aplicação.
  */
  setLoading(loading: boolean) {
    this.loading = loading;
    setTimeout(() => {
      this.isLoading.emit(this.loading);
    }, 300);
  }
}

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';  // Importe o HttpClientModule aqui

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),  // Garanta que o HttpClientModule seja carregado globalmente
    ...appConfig.providers
  ]
})
.catch(err => console.error(err));

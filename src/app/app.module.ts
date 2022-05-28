import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppComponent } from '@app/pages/app/app.component';
import { ScatterComponent } from './components/scatter/scatter.component';
import { AppMaterialModule } from './modules/material.module';
import { HomePageComponent } from './pages/home/home.component';

@NgModule({
    declarations: [AppComponent, HomePageComponent, ScatterComponent],
    imports: [AppMaterialModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

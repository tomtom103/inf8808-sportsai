import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppComponent } from '@app/pages/app/app.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ScatterComponent } from './components/scatter/scatter.component';
import { AppMaterialModule } from './modules/material.module';
import { HomePageComponent } from './pages/home/home.component';

@NgModule({
    declarations: [AppComponent, HomePageComponent, ScatterComponent, BarChartComponent, PieChartComponent],
    imports: [AppMaterialModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

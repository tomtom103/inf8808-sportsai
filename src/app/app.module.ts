import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StackedBarChartComponent } from '@app/components/stacked-bar-chart/stacked-bar-chart.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppComponent } from '@app/pages/app/app.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { BubbleChartCreationComponent } from './components/bubble-chart-creation/bubble-chart-creation.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { ScatterPlotTeamSuccessComponent } from './components/scatter-plot-team-success/scatter-plot-team-success.component';
import { ScatterComponent } from './components/scatter/scatter.component';
import { AppMaterialModule } from './modules/material.module';
import { HomePageComponent } from './pages/home/home.component';

@NgModule({
    declarations: [AppComponent, HomePageComponent, ScatterComponent, BarChartComponent, PieChartComponent, StackedBarChartComponent, BubbleChartCreationComponent, ScatterPlotTeamSuccessComponent],
    imports: [AppMaterialModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

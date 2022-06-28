import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StackedBarChartComponent } from '@app/components/stacked-bar-chart/stacked-bar-chart.component';
import { AppRoutingModule } from '@app/modules/app-routing.module';
import { AppComponent } from '@app/pages/app/app.component';
import { AppIntroComponent } from './components/app-intro/app-intro.component';
import { BubbleChartCreationComponent } from './components/bubble-chart-creation/bubble-chart-creation.component';
import { ConclusionComponent } from './components/conclusion/conclusion.component';
import { PlayerCardsComponent } from './components/player-cards/player-cards.component';
import { DefensiveActionsComponent } from './components/radar-charts/defensive-actions/defensive-actions.component';
import { OffensiveDangerComponent } from './components/radar-charts/offensive-danger/offensive-danger.component';
import { ScatterPlotTeamSuccessComponent } from './components/scatter-plot-team-success/scatter-plot-team-success.component';
import { ThreePlayerTransitionComponent } from './components/three-player-transition/three-player-transition.component';
import { WaffleChartComponent } from './components/waffle-chart/waffle-chart.component';
import { AppMaterialModule } from './modules/material.module';
import { HomePageComponent } from './pages/home/home.component';

@NgModule({
    declarations: [
        AppComponent,
        HomePageComponent,
        StackedBarChartComponent,
        BubbleChartCreationComponent,
        ScatterPlotTeamSuccessComponent,
        OffensiveDangerComponent,
        DefensiveActionsComponent,
        PlayerCardsComponent,
        WaffleChartComponent,
        AppIntroComponent,
        ConclusionComponent,
        ThreePlayerTransitionComponent,
    ],
    imports: [AppMaterialModule, BrowserModule, AppRoutingModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}

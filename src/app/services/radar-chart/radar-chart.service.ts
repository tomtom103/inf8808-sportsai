import { Injectable } from '@angular/core';
import { Coordinate } from '@app/interfaces/coordinate';
import * as d3 from 'd3';

@Injectable({
    providedIn: 'root',
})
export class RadarChartService {
    plotSize: number = 650;
    ticks: number[] = d3.range(2, 12, 2);
    radialScale: d3.ScaleLinear<number, number, never>;
    features: string[] = [];

    constructor() {
        this.radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
    }

    angleToCoordinate(angle: number, value: number): Coordinate {
        let x = Math.cos(angle) * this.radialScale(value);
        let y = Math.sin(angle) * this.radialScale(value);
        return { x: this.plotSize / 2 + x, y: this.plotSize / 2 - y };
    }

    getPathCoordinates(dataPoint: any): Coordinate[] {
        let coordinates: Coordinate[] = [];
        this.features.forEach((feature, i) => {
            coordinates.push(this.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.features.length, dataPoint[feature]));
        });
        return coordinates;
    }
}

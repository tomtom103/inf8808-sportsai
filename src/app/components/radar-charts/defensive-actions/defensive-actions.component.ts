import { Component, OnInit } from '@angular/core';
import { Coordinate } from '@app/interfaces/coordinate';
import * as d3 from 'd3';

@Component({
    selector: 'app-defensive-actions',
    templateUrl: './defensive-actions.component.html',
    styleUrls: ['./defensive-actions.component.scss'],
})
export class DefensiveActionsComponent implements OnInit {
    private features: string[] = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    private data: any[] = [];

    private svg: any;
    private radialScale: any;
    private ticks = d3.range(2, 12, 2);

    private plotSize: number = 650;

    constructor() {
        for (let i = 0; i < 2; i++) {
            let point = {};
            //each feature will be a random number from 1-9
            this.features.forEach((f) => (point[f] = 1 + Math.random() * 9));
            this.data.push(point);
        }
    }

    ngOnInit(): void {
        this.createSvg();
        this.plotGridLines();
        this.drawAxis();
        this.drawData();
    }

    private createSvg(): void {
        this.svg = d3.select('figure#defensive-actions').append('svg').attr('width', this.plotSize).attr('height', this.plotSize);

        this.svg.append('g').attr('class', 'tick-circles');
        this.svg.append('g').attr('class', 'features-labels');
        this.svg.append('g').attr('class', 'axis-lines');
        this.svg.append('g').attr('class', 'axis-label');
        this.svg.append('g').attr('class', 'data-points');
    }

    private plotGridLines(): void {
        this.radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);

        this.svg
            .selectAll('g.tick-circles')
            .selectAll('circle')
            .data(this.ticks)
            .join('circle')
            .attr('cx', this.plotSize / 2)
            .attr('cy', this.plotSize / 2)
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('r', (d) => this.radialScale(d));

        const featuresLength = this.features.length;
        const radialScale = this.radialScale;
        const plotSize = this.plotSize;
        const ticks = this.ticks;

        this.svg
            .selectAll('g.features-labels')
            .selectAll('g')
            .data(this.features)
            .join('g')
            .each((_d: any, i: number, nodes: any) => {
                const g = d3.select(nodes[i]).attr('class', (name: any) => `features-label-${name.toLowerCase().replace(/ /g, '-')}`);
                let angle = Math.PI / 2 + (2 * Math.PI * i) / featuresLength;

                g.selectAll('text')
                    .data(ticks)
                    .join('text')
                    .attr('x', (_x, idx) => plotSize / 2 + Math.cos(angle) * radialScale(ticks[idx]))
                    .attr('y', (_x, idx) => plotSize / 2 - Math.sin(angle) * radialScale(ticks[idx]))
                    .text((tick) => tick.toString());
            });
    }

    private drawAxis(): void {
        this.svg
            .selectAll('g.axis-lines')
            .selectAll('line')
            .data(this.features)
            .join('line')
            .attr('x1', this.plotSize / 2)
            .attr('y1', this.plotSize / 2)
            .attr('x2', (_: any, i: number) => this.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.features.length, 10).x)
            .attr('y2', (_: any, i: number) => this.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.features.length, 10).y)
            .attr('stroke', 'black');

        this.svg
            .selectAll('g.axis-label')
            .selectAll('text')
            .data(this.features)
            .join('text')
            .attr('x', (_: any, i: number) => this.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.features.length, 12).x)
            .attr('y', (_: any, i: number) => this.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.features.length, 12).y)
            .text((d) => d);
    }

    private drawData(): void {
        let line = d3
            .line<any>()
            .x((d) => d.x)
            .y((d) => d.y);
        let colors = ['darkorange', 'navy']; // TODO: Use scaleOrdinal

        this.svg
            .selectAll('g.data-points')
            .selectAll('path')
            .data(this.data)
            .join('path')
            .datum((d) => this.getPathCoordinates(d))
            .attr('d', line)
            .attr('stroke-width', 3)
            .attr('stroke', (_d: any, i: number) => colors[i])
            .attr('fill', (_d: any, i: number) => colors[i])
            .attr('stroke-opacity', 1)
            .attr('opacity', 0.5)
            .attr('pointer-events', 'visiblePainted')
            .on('mouseover', function (_event, d: any) {
                d3.select('svg')
                    .selectAll('g.data-points')
                    .selectAll('path')
                    .filter(function (_: any, i: number, nodes: any) {
                        return d3.select(nodes[i]).datum() === d;
                    })
                    .attr('opacity', 0.8);
            })
            .on('mouseout', () => {
                this.svg.selectAll('g.data-points').selectAll('path').attr('opacity', 0.5);
            });
    }

    private angleToCoordinate(angle: number, value: number): Coordinate {
        let x = Math.cos(angle) * this.radialScale(value);
        let y = Math.sin(angle) * this.radialScale(value);
        return { x: this.plotSize / 2 + x, y: this.plotSize / 2 - y };
    }

    private getPathCoordinates(dataPoint: any): Coordinate[] {
        let coordinates: Coordinate[] = [];
        this.features.forEach((feature, i) => {
            coordinates.push(this.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.features.length, dataPoint[feature]));
        });
        return coordinates;
    }
}

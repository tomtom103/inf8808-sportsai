import { Component, OnInit } from '@angular/core';
import { RadarChartService } from '@app/services/radar-chart/radar-chart.service';
import * as d3 from 'd3';

const DEFENSIVE_FEATURES = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];

@Component({
    selector: 'app-defensive-actions',
    templateUrl: './defensive-actions.component.html',
    styleUrls: ['./defensive-actions.component.scss'],
})
export class DefensiveActionsComponent implements OnInit {
    private data: any[] = [];

    private svg: any;

    constructor(private radarChartService: RadarChartService) {
        this.radarChartService.features = DEFENSIVE_FEATURES;
        for (let i = 0; i < 3; i++) {
            let point = {};
            //each feature will be a random number from 1-9
            radarChartService.features.forEach((f) => (point[f] = 1 + Math.random() * 9));
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
        this.svg = d3
            .select('figure#defensive-actions')
            .append('svg')
            .attr('width', this.radarChartService.plotSize)
            .attr('height', this.radarChartService.plotSize);

        this.svg.append('g').attr('class', 'tick-circles');
        this.svg.append('g').attr('class', 'features-labels');
        this.svg.append('g').attr('class', 'axis-lines');
        this.svg.append('g').attr('class', 'axis-label');
        this.svg.append('g').attr('class', 'data-points');
    }

    private plotGridLines(): void {
        this.svg
            .selectAll('g.tick-circles')
            .selectAll('circle')
            .data(this.radarChartService.ticks)
            .join('circle')
            .attr('cx', this.radarChartService.plotSize / 2)
            .attr('cy', this.radarChartService.plotSize / 2)
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('r', (d) => this.radarChartService.radialScale(d));

        const radialScale = this.radarChartService.radialScale;
        const plotSize = this.radarChartService.plotSize;
        const ticks = this.radarChartService.ticks;

        this.svg
            .selectAll('g.features-labels')
            .selectAll('g')
            .data(this.radarChartService.features)
            .join('g')
            .each((_d: any, i: number, nodes: any) => {
                const g = d3.select(nodes[i]).attr('class', (name: any) => `features-label-${name.toLowerCase().replace(/ /g, '-')}`);
                let angle = Math.PI / 2 + (2 * Math.PI * i) / this.radarChartService.features.length;

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
            .data(DEFENSIVE_FEATURES)
            .join('line')
            .attr('x1', this.radarChartService.plotSize / 2)
            .attr('y1', this.radarChartService.plotSize / 2)
            .attr(
                'x2',
                (_: any, i: number) =>
                    this.radarChartService.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.radarChartService.features.length, 10).x,
            )
            .attr(
                'y2',
                (_: any, i: number) =>
                    this.radarChartService.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.radarChartService.features.length, 10).y,
            )
            .attr('stroke', 'black');

        this.svg
            .selectAll('g.axis-label')
            .selectAll('text')
            .data(this.radarChartService.features)
            .join('text')
            .attr(
                'x',
                (_: any, i: number) =>
                    this.radarChartService.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.radarChartService.features.length, 12).x,
            )
            .attr(
                'y',
                (_: any, i: number) =>
                    this.radarChartService.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.radarChartService.features.length, 12).y,
            )
            .text((d) => d);
    }

    private drawData(): void {
        let line = d3
            .line<any>()
            .x((d) => d.x)
            .y((d) => d.y);
        let colors = ['darkorange', 'navy', 'gray']; // TODO: Use scaleOrdinal

        this.svg
            .selectAll('g.data-points')
            .selectAll('path')
            .data(this.data)
            .join('path')
            .datum((d) => this.radarChartService.getPathCoordinates(d))
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
}

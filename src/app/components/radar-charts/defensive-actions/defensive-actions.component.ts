import { Component, OnInit } from '@angular/core';
import { Coordinate } from '@app/interfaces/coordinate';
import * as d3 from 'd3';
import d3Tip from 'd3-tip';

@Component({
    selector: 'app-defensive-actions',
    templateUrl: './defensive-actions.component.html',
    styleUrls: ['./defensive-actions.component.scss'],
})
export class DefensiveActionsComponent implements OnInit {
    private className = 'defensive-actions';
    private data: any[] = [
        {
            Name: 'Mohamed Salah',
            TklW: 7,
            Succ: 127,
            Int: 15,
            Blocks: 13,
        },
        {
            Name: 'Kylian Mbappé',
            TklW: 11,
            Succ: 71,
            Int: 14,
            Blocks: 5,
        },
        {
            Name: 'Karim Benzema',
            TklW: 5,
            Succ: 76,
            Int: 7,
            Blocks: 10,
        },
    ];
    private scales: any[] = [];

    private svg: any;

    plotSize: number = 750;
    ticks: number[] = d3.range(2, 12, 2);
    radialScale: d3.ScaleLinear<number, number, never>;
    features: string[] = [];

    constructor() {
        this.radialScale = d3.scaleLinear().domain([0, 10]).range([0, 250]);
        // Set the features as all the keys except for the Name
        this.features = Object.keys(this.data[0]).slice(1);

        this.features.forEach((feature: string) => {
            const values = this.data.map((d) => d[feature]);
            const range = (min: number, max: number, n: number) => {
                return Array.from({ length: n }, (_, i) => min + Math.round((i * (max - min)) / (n - 1)));
            };
            this.scales.push({
                feat: feature,
                min: 0,
                max: Math.max(...values),
                range: range(0, Math.max(...values), this.ticks.length + 1),
            });
        });
        console.log(this.scales);
    }

    ngOnInit(): void {
        this.createSvg();
        this.plotGridLines();
        this.drawAxis();
        this.drawData();
        this.drawLegend();
    }

    private createSvg(): void {
        this.svg = d3
            .select('figure#defensive-actions')
            .append('svg')
            .attr('class', this.className)
            .attr('width', this.plotSize)
            .attr('height', this.plotSize);
    }

    private plotGridLines(): void {
        this.svg
            .append('g')
            .attr('class', 'tick-circles')
            .selectAll('circle')
            .data(this.ticks)
            .join('circle')
            .attr('cx', this.plotSize / 2)
            .attr('cy', this.plotSize / 2)
            .attr('fill', 'none')
            .attr('stroke', 'gray')
            .attr('r', (d) => this.radialScale(d));

        const radialScale = this.radialScale;
        const plotSize = this.plotSize;
        const ticks = this.ticks;

        this.svg
            .append('g')
            .attr('class', 'feature-labels')
            .selectAll('g')
            .data(this.scales)
            .join('g')
            .each((scale: any, i: number, nodes: any) => {
                const g = d3.select(nodes[i]).attr('class', (_scale: any) => `features-label-${_scale.feat.toLowerCase().replace(/ /g, '-')}`);
                let angle = Math.PI / 2 + (2 * Math.PI * i) / this.features.length;
                g.selectAll('text')
                    .data(scale.range.slice(1))
                    .join('text')
                    .attr('x', (_x, idx) => plotSize / 2 + Math.cos(angle) * radialScale(ticks[idx]))
                    .attr('y', (_x, idx) => plotSize / 2 - Math.sin(angle) * radialScale(ticks[idx]))
                    .text((tick: any) => tick.toString());
            });
    }

    private drawAxis(): void {
        this.svg
            .append('g')
            .attr('class', 'axis-lines')
            .selectAll('line')
            .data(this.features)
            .join('line')
            .attr('x1', this.plotSize / 2)
            .attr('y1', this.plotSize / 2)
            .attr('x2', (_: any, i: number) => this.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.features.length, 10).x)
            .attr('y2', (_: any, i: number) => this.angleToCoordinate(Math.PI / 2 + (2 * Math.PI * i) / this.features.length, 10).y)
            .attr('stroke', 'black');

        this.svg
            .append('g')
            .attr('class', 'axis-labels')
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
        let colors = ['#F3535B', '#21A179', '#1481BA'];

        let tip = d3Tip()
            .attr('class', 'd3-tip')
            .html((d) => {
                return this.getTipContent(d);
            });
        this.svg.call(tip);

        this.svg
            .append('g')
            .attr('class', 'data-points')
            .selectAll('path')
            .data(this.data)
            .join('path')
            .datum((d) => {
                // Take the features scale and map it to be between 0 and 10
                const newD = {};
                const { Name, ...rest } = d;
                Object.keys(rest).forEach((key, i) => {
                    // Get between 0 and 1 for each feature using the scale
                    newD[key] = ((d[key] - this.scales[i].min) / (this.scales[i].max - this.scales[i].min)) * 10;
                });
                return {
                    coords: this.getPathCoordinates(newD),
                    data: {
                        ...d,
                        Name,
                    },
                };
            })
            .attr('d', (d) => line(d.coords))
            .attr('stroke-width', 3)
            .attr('stroke', (_d: any, i: number) => colors[i])
            .attr('fill', (_d: any, i: number) => colors[i])
            .attr('stroke-opacity', 1)
            .attr('opacity', 0.5)
            .attr('pointer-events', 'visiblePainted')
            .on('mouseover', function (_event, d: any) {
                let points = d3
                    .select(`svg.defensive-actions`)
                    .selectAll('g.data-points')
                    .selectAll('path')
                    .filter(function (_: any, i: number, nodes: any) {
                        return d3.select(nodes[i]).datum() === d;
                    })
                    .attr('opacity', 0.8);
                tip.show(d.data, points.node());
            })
            .on('mouseout', function (_event, d: any) {
                let e = d3.select(`svg.defensive-actions`).selectAll('g.data-points').selectAll('path').attr('opacity', 0.5);
                tip.hide(d.data, e.node());
            });
    }

    private drawLegend(): void {
        const colors = ['#F3535B', '#21A179', '#1481BA'];
        const legend = this.svg
            .append('g')
            .attr('class', 'legend')
            .selectAll('g')
            .data(this.data.map((d) => d.Name))
            .join('g')
            .attr('transform', (_d, i) => `translate(0, ${i * 20})`);

        legend
            .append('rect')
            .attr('x', this.plotSize - 150)
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', (_d, i) => colors[i]);

        legend
            .append('text')
            .attr('x', this.plotSize - 120)
            .attr('y', 9)
            .attr('dy', '.35em')
            .text((d) => d);
    }

    private getTipContent(d: any): string {
        return `
            <div>
                <span> Player Name : <span class="tooltip-value">${d.Name}</span></span>
                <br>
                <span> TklW : <span class="tooltip-value">${d.TklW}</span></span>
                <br>
                <span> Succ : <span class="tooltip-value">${d.Succ}</span></span>
                <br>
                <span> Int : <span class="tooltip-value">${d.Int}</span></span>
                <br>
                <span> Blocks : <span class="tooltip-value">${d.Blocks}</span></span>
            </div>
        `;
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

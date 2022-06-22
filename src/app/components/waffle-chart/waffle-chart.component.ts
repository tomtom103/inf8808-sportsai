import { AfterViewInit, Component } from '@angular/core';
import * as d3 from 'd3';

@Component({
    selector: 'app-waffle-chart',
    templateUrl: './waffle-chart.component.html',
    styleUrls: ['./waffle-chart.component.scss'],
})
export class WaffleChartComponent implements AfterViewInit {
    private className: string = 'waffle-chart';
    private svgs: Map<string, any> = new Map();

    data: any[] = [
        { Player: 'Sadio Mané', Sh: 99, SoT: 37, Gls: 16 },
        { Player: 'Rafael Leão', Sh: 97, SoT: 38, Gls: 11 },
        { Player: 'Karim Benzema', Sh: 118, SoT: 47, Gls: 27 },
        { Player: 'Mohamed Salah', Sh: 134, SoT: 49, Gls: 23 },
        { Player: 'Kylian Mbappé', Sh: 144, SoT: 60, Gls: 28 },
        { Player: 'Christopher Nkunku', Sh: 80, SoT: 39, Gls: 20 },
    ];
    width: number = 600;
    height: number = 180;

    private boxSize: number = 20; // Size of each box
    private boxGap: number = 3; // space between each box
    private howManyAcross: number = Math.floor(this.height / this.boxSize);

    private categoryScale: any;
    private colors: string[] = ['#21A179', '#1481BA', '#F3535B'];

    constructor() {}

    ngAfterViewInit(): void {
        this.createSvg();
        this.drawWaffle();
        this.drawLegend();
    }

    private drawWaffle() {
        this.data.forEach((d, i) => {
            const currentSvg = this.svgs.get(d.Player);

            const { Player, ...rest } = d;

            const data: any[] = [];

            // Create an array of the keys
            Object.keys(rest).forEach((key) => {
                // Create an array of size value that contains the key
                data.push(...Array.from({ length: rest[key] }, () => key));
            });

            currentSvg
                .selectAll('rect')
                .data(data)
                .join('rect')
                .attr('class', (d) => `square-${d}`)
                .attr('x', (d, i) => this.boxSize * Math.floor(i / this.howManyAcross))
                .attr('y', (d, i) => this.boxSize * (i % this.howManyAcross))
                .attr('width', this.boxSize - this.boxGap)
                .attr('height', this.boxSize - this.boxGap)
                .attr('fill', (d) => this.colors[Object.keys(rest).indexOf(d)])
                .on('mouseover', (_event, d) => {
                    currentSvg.selectAll('rect').attr('opacity', 0.5);
                    currentSvg.selectAll(`.square-${d}`).attr('opacity', 1);
                })
                .on('mouseout', (_event, d) => {
                    currentSvg.selectAll('rect').attr('opacity', 1);
                });
        });
    }

    private drawLegend() {
        this.data.forEach((d) => {
            const currentSvg = this.svgs.get(d.Player);

            const { Player, ...rest } = d;

            const legend = currentSvg
                .append('g')
                .attr('class', `legend-${this.normalizePlayerName(Player)}`)
                .selectAll('g')
                .data(Object.keys(rest))
                .join('g')
                .attr('transform', (d, i) => {
                    return `translate(0, ${i * 30})`;
                });

            legend
                .append('rect')
                .attr('class', (d) => `square-${d}`)
                .attr('x', this.width - 60)
                .attr('width', 17)
                .attr('height', 17)
                .attr('fill', (d) => this.colors[Object.keys(rest).indexOf(d)])
                .on('mouseover', (_event, d) => {
                    currentSvg.selectAll('rect').attr('opacity', 0.5);
                    currentSvg.selectAll(`.square-${d}`).attr('opacity', 1);
                })
                .on('mouseout', (_event, d) => {
                    currentSvg.selectAll('rect').attr('opacity', 1);
                });

            legend
                .append('text')
                .attr('x', this.width - 30)
                .attr('y', 7)
                .attr('dy', '0.35em')
                .text((d) => d)
                .on('mouseover', (_event, d) => {
                    currentSvg.selectAll('rect').attr('opacity', 0.5);
                    currentSvg.selectAll(`.square-${d}`).attr('opacity', 1);
                })
                .on('mouseout', (_event, d) => {
                    currentSvg.selectAll('rect').attr('opacity', 1);
                });
        });
    }

    private createSvg(): void {
        this.data.forEach((d, i) => {
            this.svgs.set(d.Player, this.createSvgForPlayer(d, i));
        });
    }

    private createSvgForPlayer(d: any, i: number): any {
        return d3
            .select(`figure#waffle-chart-${i}`)
            .append('svg')
            .attr('class', `${this.className}-${this.normalizePlayerName(d.Player)}`)
            .attr('width', this.width)
            .attr('height', this.height);
    }

    private normalizePlayerName(name: string): string {
        return name
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/\s/g, '-')
            .toLowerCase();
    }
}

import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { legendColor } from 'd3-svg-legend';
import d3Tip from 'd3-tip';

@Component({
    selector: 'app-stacked-bar-chart',
    templateUrl: './stacked-bar-chart.component.html',
    styleUrls: ['./stacked-bar-chart.component.scss'],
})
export class StackedBarChartComponent implements OnInit {
    private data = [
        { player: 'Sadio Mané', G: 16, xG: 16.7, A: 2, xA: 4.4, PK: 0, PKatt: 0, npxG: 16.7, GminPK: 16 },
        { player: 'Rafael Leão', G: 11, xG: 9.1, A: 10, xA: 6.3, PK: 0, PKatt: 0, npxG: 9.1, GminPK: 11 },
        { player: 'Karim Benzema', G: 27, xG: 23.5, A: 12, xA: 9.5, PK: 7, PKatt: 11, npxG: 15.2, GminPK: 20 },
        { player: 'Mohamed Salah', G: 23, xG: 21.8, A: 13, xA: 10.4, PK: 5, PKatt: 6, npxG: 17, GminPK: 18 },
        { player: 'Kylian Mbappé', G: 28, xG: 23.4, A: 18, xA: 12.4, PK: 4, PKatt: 4, npxG: 20.3, GminPK: 24 },
        { player: 'Christopher Nkunku', G: 20, xG: 14.8, A: 13, xA: 10, PK: 1, PKatt: 1, npxG: 14.1, GminPK: 19 },
    ];

    // Groups : [G; xG], [A; xA], [PK;PKatt], [G - PK; npxG]

    private svg!: any;
    private sizeFactor = 0.4;
    private margin: number = 50 * this.sizeFactor;
    private width: number = (750 - this.margin * 2) * this.sizeFactor;
    private height: number = (400 - this.margin * 2) * this.sizeFactor;

    ngOnInit(): void {
        this.createSvg('figure#multi-bar-1');
        this.drawBars(this.data, 'G', 'xG');

        this.createSvg('figure#multi-bar-2');
        this.drawBars(this.data, 'A', 'xA');

        this.createSvg('figure#multi-bar-3');
        this.drawBars(this.data, 'PK', 'PKatt');

        this.createSvg('figure#multi-bar-4');
        this.drawBars(this.data, 'GminPK', 'npxG');
    }

    private createSvg(selector: string): void {
        this.svg = d3
            .select(selector)
            .append('svg')
            .attr('width', this.width + this.margin * 2)
            .attr('height', this.height + this.margin * 2)
            .append('g')
            .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');
    }

    private drawBars(data: any[], group1, group2): void {
        const subgroups = [group1, group2];
        const groups = d3.map(data, (d) => d.player);
        // Add X axis
        const x = d3.scaleBand().domain(groups).range([0, this.width]).padding(0.2);

        this.svg.append('g').attr('transform', `translate(0, ${this.height})`).call(d3.axisBottom(x).tickSize(0));

        // Add Y axis
        const y = d3.scaleLinear().domain([0, 40]).range([this.height, 0]);

        this.svg.append('g').call(d3.axisLeft(y));

        // Another scale for subgroup position?
        const xSubgroup = d3.scaleBand().domain(subgroups).range([0, x.bandwidth()]).padding(0.05);

        // color palette = one color per subgroup
        const color = d3.scaleOrdinal().domain(subgroups).range(['#21a179', '#1e1e24']);

        // tooltip
        const tip = d3Tip()
            .attr('class', 'd3-tip')
            .html(function (d) {
                console.log(d);
                return `
                <span> ${d.key} : <span class="tooltip-value">${d.value}</span></span>
                `;
            });
        d3.select('.main-svg').call(tip);

        this.svg.call(tip);

        let bars = this.svg.append('g');
        // Show the bars
        bars.selectAll('g')
            // Enter in data = loop group per group
            .data(data)
            .join('g')
            .attr('transform', (d) => `translate(${x(d.player)}, 0)`)
            .selectAll('rect')
            .data(function (d) {
                return subgroups.map(function (key) {
                    return { key: key, value: d[key] };
                });
            })
            .join('rect')
            .attr('x', (d) => xSubgroup(d.key))
            .attr('y', (d) => y(d.value))
            .attr('width', xSubgroup.bandwidth())
            .attr('height', (d) => this.height - y(d.value))
            .attr('fill', (d) => color(d.key))
            .on('mouseover', function (_event, d) {
                let e = bars
                    .selectAll('rect')
                    .filter(function (_, i, nodes) {
                        return d3.select(nodes[i]).datum() === d;
                    })
                    .style('opacity', 1);
                tip.show(d, e.node());
            })
            .on('mouseout', tip.hide);

        let legend = legendColor()
            .shape('path', d3.symbol().type(d3.symbolCircle).size(100)() as any)
            .scale(color);

        this.svg.append('g').attr('transform', 'translate(230,10)').call(legend);
    }
}
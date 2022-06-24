import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomePageComponent implements OnInit {
    ngOnInit(): void {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
    }
}

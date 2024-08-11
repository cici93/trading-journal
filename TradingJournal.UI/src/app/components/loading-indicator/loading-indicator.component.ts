import { Component, Input, OnInit } from '@angular/core';
import { Observable, tap } from "rxjs";
import { LoadingService } from "../../services/loading/loading.service";
import { RouteConfigLoadEnd, RouteConfigLoadStart, Router } from "@angular/router";
import { NzSpinComponent } from "ng-zorro-antd/spin";
import { AsyncPipe } from "@angular/common";

@Component({
    selector: 'app-loading-indicator',
    standalone: true,
    imports: [
        NzSpinComponent,
        AsyncPipe
    ],
    templateUrl: './loading-indicator.component.html',
    styleUrl: './loading-indicator.component.scss'
})
export class LoadingIndicatorComponent implements OnInit {

    loading$: Observable<boolean>;

    @Input() detectRouteTransitions = false;

    constructor(
        private loadingService: LoadingService,
        private router: Router
    ) {
        this.loading$ = this.loadingService.loading$;
    }

    ngOnInit() {
        if (this.detectRouteTransitions) {
            this.router.events
                .pipe(
                    tap(event => {
                        if (event instanceof RouteConfigLoadStart) {
                            this.loadingService.loadingOn();
                        } else if (event instanceof RouteConfigLoadEnd) {
                            this.loadingService.loadingOff();
                        }
                    })
                )
                .subscribe();
        }
    }
}

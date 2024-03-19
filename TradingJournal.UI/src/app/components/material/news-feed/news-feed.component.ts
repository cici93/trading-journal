import {Component, CUSTOM_ELEMENTS_SCHEMA, DestroyRef, OnInit} from '@angular/core';
import {NewsFeedService} from "../../../services/news-feed/news-feed.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CommonModule} from "@angular/common";
import {UnixTimespanToDatePipe} from "../../../pipes/unixTimespanToDate/unix-timespan-to-date.pipe";
import {FinnhubNews} from "../../../interfaces/finnhub-news.interface";


@Component({
    selector: 'app-news-feed',
    standalone: true,
    imports: [CommonModule, UnixTimespanToDatePipe],
    templateUrl: './news-feed.component.html',
    styleUrl: './news-feed.component.scss',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NewsFeedComponent implements OnInit {
    news: FinnhubNews[] = [];

    constructor(
        private newsFeedService: NewsFeedService,
        private destroyRef: DestroyRef
    ) {
    }

    ngOnInit() {
        this.newsFeedService.fetchNewsBySymbol('AAPL').pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => {
                this.news = res;
            })
    }

    openNews(url: string) {
        window.open(url, '_blank');
    }
}



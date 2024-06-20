import { Component, computed, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { NzTabComponent, NzTabSetComponent } from "ng-zorro-antd/tabs";
import { NzDatePickerComponent } from "ng-zorro-antd/date-picker";
import { FormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";
import { NzTimePickerComponent } from "ng-zorro-antd/time-picker";
import { NzOptionComponent, NzSelectComponent } from "ng-zorro-antd/select";
import { BehaviorSubject, debounceTime, Observable, switchMap } from "rxjs";
import { NzIconDirective } from "ng-zorro-antd/icon";
import { BackendService } from "../../services/backend/backend.service";
import { TranslateModule } from "@ngx-translate/core";
import { getISOWeek } from 'date-fns';

@Component({
    selector: 'app-event-timeline',
    standalone: true,
    imports: [
        NzTabSetComponent,
        NzTabComponent,
        NzDatePickerComponent,
        FormsModule,
        NgClass,
        NzTimePickerComponent,
        NzSelectComponent,
        NzOptionComponent,
        NzIconDirective,
        TranslateModule
    ],
    templateUrl: './event-timeline.component.html',
    styleUrl: './event-timeline.component.scss'
})

export class EventTimelineComponent implements OnInit {

    constructor(
        private backendService: BackendService
    ) {
    }

    selectedDate = new Date();

    selectedCompany?: string[];
    isSelectedLoading = false;
    selectedSearchChange$ = new BehaviorSubject('');
    selectableCompanys: string[] = [];

    dayViewStartingTime: Date = this.getTime('start');
    dayViewEndTime: Date = this.getTime('end');

    selectedMonth: Date = new Date();

    events: Event[] = [
        {
          companyName: 'Nvidia',
          title: 'Nvidia Earnings',
          time: new Date()
        },
        {
          companyName: 'Apple',
          title: 'Apple Vorstellung CEO',
          time: new Date()
        }
    ];

    eventSignal: WritableSignal<Event[]> = signal(this.events);

    dailyEvents: Signal<Event[]> = computed(() => this.eventSignal().filter(x => {
        const startingDate = new Date(this.selectedDate.getUTCFullYear(), this.selectedDate.getUTCMonth(), this.selectedDate.getUTCDate(), this.dayViewStartingTime.getHours(), this.dayViewStartingTime.getUTCMinutes(), this.dayViewStartingTime.getUTCSeconds(), this.dayViewStartingTime.getUTCMilliseconds());
        const endDate = new Date(this.selectedDate.getUTCFullYear(), this.selectedDate.getUTCMonth(), this.selectedDate.getUTCDate(), this.dayViewEndTime.getHours(), this.dayViewEndTime.getUTCMinutes(), this.dayViewEndTime.getUTCSeconds(), this.dayViewEndTime.getUTCMilliseconds());
        return x.time! >= startingDate && x.time! <= endDate;
    }));

    weeklyEvents: Signal<Event[]> = computed(() => this.eventSignal().filter(x =>
        getISOWeek(x.time!) === getISOWeek(this.selectedDate)
    ));

    monthlyEvents: Signal<Event[]> = computed(() => this.eventSignal().filter(x =>
        x.time?.getMonth() === this.selectedDate.getMonth() && x.time.getUTCFullYear() === this.selectedDate.getUTCFullYear()
    ));

    yearlyEvents: Signal<Event[]> = computed(() => this.eventSignal().filter(x =>
        x.time?.getUTCFullYear() === this.selectedDate.getUTCFullYear()
    ));

    selectedView: View = 'Day';
    protected readonly views = views;


    ngOnInit() {
        this.setTime();

        const optionList$: Observable<string[]> = this.selectedSearchChange$
            .asObservable()
            .pipe(debounceTime(500))
            .pipe(switchMap(this.backendService.getCompanys()));
        // .pipe(switchMap(this.backendService.getRandomUser()));
        optionList$.subscribe(data => {
            this.selectableCompanys = data;
            this.isSelectedLoading = false;
        });


    }

    test() {

        // console.log('starting', this.dayViewStartingTime!.getUTCHours());
        // console.log('ending', this.dayViewEndTime!.getUTCHours());
        console.log('month', this.selectedMonth);
        console.log('month', this.selectedMonth.getMonth() === this.events[0].time!.getMonth());
        console.log('year', this.selectedMonth.getUTCFullYear()=== this.events[0].time!.getUTCFullYear());

        // (x.time!.getUTCHours() >= this.dayViewStartingTime!.getUTCHours()) && (x.time!.getUTCHours() <= this.dayViewEndTime!.getUTCHours())
    }

    setTime() {
        let now = new Date();
        let year = now.getUTCFullYear();
        let month = now.getUTCMonth();
        let day = now.getUTCDate();
        this.dayViewStartingTime = new Date(year, month, day, 8, 0, 0, 0);
        this.dayViewEndTime = new Date(year, month, day, 23, 59, 0, 0);
    }

    getTime( type: 'start' | 'end') {
        let now = new Date();

        let year = now.getUTCFullYear();
        let month = now.getUTCMonth();
        let day = now.getUTCDate();

        if (type === 'start') {
            return new Date(year, month, day, 8, 0, 0, 0);
        } else {
          return new Date(year, month, day, 23, 59, 0, 0);
        }

    }



    // get startingWeek() {
    // }

    selectView(view: View) {
        if (this.selectedView !== view) {
            this.selectedView = view;
        }

    }

    updateEventSignal() {
        this.eventSignal.set([]);
        this.eventSignal.set(this.events);
    }

    onSelectSearch(value: string) {
        this.isSelectedLoading = true;
        this.selectedSearchChange$.next(value);
    }


}

const views: View[] = ['Day', 'Week', 'Month', 'Year'];

type View = 'Day' | 'Week' | 'Month' | 'Year';

interface Event {
    title?: string;
    time?: Date;
    companyName?: string;
}
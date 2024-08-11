import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponent } from "./components/side-menu/side-menu.component";
import { ThemeService } from "./services/theme/theme.service";
import { LoadingIndicatorComponent } from "./components/loading-indicator/loading-indicator.component";
import { LoadingService } from "./services/loading/loading.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [CommonModule, RouterOutlet, SideMenuComponent, LoadingIndicatorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  loading$: Observable<boolean> = new Observable<boolean>();

  constructor(
      private themeService: ThemeService,
      private loadingService: LoadingService
  ) { }

  ngOnInit() {
    this.themeService.loadTheme();
    this.loading$ = this.loadingService.loading$;
  }

}

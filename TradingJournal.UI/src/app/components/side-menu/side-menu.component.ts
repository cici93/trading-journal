import { AfterViewChecked, AfterViewInit, Component, DestroyRef, Inject, OnInit } from '@angular/core';
import { NzIconDirective } from "ng-zorro-antd/icon";
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { NgStyle } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { filter, map } from "rxjs";
import { ThemeService } from "../../services/theme/theme.service";

@Component({
  selector: 'app-side-menu',
  standalone: true,
    imports: [
        NzIconDirective,
        TranslateModule,
        NgStyle
    ],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})

export class SideMenuComponent implements OnInit {

  menuItems = [
    {
      title: 'home',
      icon: 'M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z',
      route: 'overview'
    },
    {
      title: 'portfolio',
      icon: 'M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80ZM253-253l227-227v-320q-134 0-227 93t-93 227q0 64 24 123t69 104Z',
      route: 'portfolio'
    },
    {
      title: 'charts',
      icon: 'm136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z',
      route: 'charts'
    },

  ];

  // 'Home', 'About', 'Contact', 'Services', 'Portfolio', 'Blog', 'Shop', 'Elements', 'Pages'];

  doHide = true;

  activeRoute = '';
  activeTheme: 'light' | 'dark' = 'light';

  iconHeight = '24px';

  constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private destroyRef: DestroyRef,
      private themeService: ThemeService
  ) {
  }

  ngOnInit() {
    this.doHide = localStorage.getItem('doHide') === 'true';
    this.activeTheme = this.themeService.loadTheme();
    this.router.events.pipe(
        takeUntilDestroyed(this.destroyRef),
        filter(event => event instanceof NavigationEnd),
        map(() => this.router.url)
    ).subscribe(url => {
      this.activeRoute = url;
    });
  }

  switchMenu() {
    this.doHide = !this.doHide;
    localStorage.setItem('doHide', this.doHide.toString());
  }

  async navigate(route: string) {
    this.activeRoute = route;
    await this.router.navigate([route]);
  }

  onMouseEnter() {
    this.doHide = false;
  }

  onMouseLeave() {
    this.doHide = true;
  }

  switchThemes(theme: 'light' | 'dark') {
    this.themeService.setTheme(theme);
    this.activeTheme = this.themeService.loadTheme();
  }
}

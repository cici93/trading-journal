import { Injectable } from '@angular/core';
import themes from '../../../assets/styles/themes.json';
@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';

  setTheme(theme: 'light' | 'dark') {
    localStorage.setItem(this.THEME_KEY, theme);
    const themeProperties: ThemeProperties = themes[theme];

    for (const property in themeProperties) {
      document.documentElement.style.setProperty(property, themeProperties[property]);
    }
  }

  loadTheme(): 'light' | 'dark' {
    const theme = localStorage.getItem(this.THEME_KEY) || 'light';
    this.setTheme(theme as 'light' | 'dark');
    return theme as 'light' | 'dark';
  }


}
interface ThemeProperties {
  [key: string]: string;
}

interface Themes {
  light: ThemeProperties;
  dark: ThemeProperties;
}
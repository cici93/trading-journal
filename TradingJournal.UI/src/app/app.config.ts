import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {HttpClient, provideHttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { provideNzIcons } from './icons-provider';
import { de_DE, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import de from '@angular/common/locales/de';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NzNotificationModule } from "ng-zorro-antd/notification";
import { NzModalModule } from "ng-zorro-antd/modal";

registerLocaleData(de);


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    importProvidersFrom(TranslateModule.forRoot({
        defaultLanguage: 'en',
        loader: {
            provide: TranslateLoader,
            deps: [HttpClient],
            useFactory: HttpLoaderFactory
        }
    })),
      provideNzIcons(),
      provideNzI18n(de_DE),
      importProvidersFrom(FormsModule),
      importProvidersFrom(HttpClientModule),
      provideAnimations(),
      importProvidersFrom(NzModalModule)
]
};

function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

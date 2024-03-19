import { Injectable } from '@angular/core';
import { NzNotificationService } from "ng-zorro-antd/notification";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
      private notification: NzNotificationService,
      private translate: TranslateService
  ) { }

  public showSuccess() {
    this.notification
        .create(
            'success',
            this.translate.instant('success'),
            this.translate.instant('process-completed-succ'),

        )
  }

  public showError() {
    this.notification
        .create(
            'error',
            this.translate.instant('error'),
            this.translate.instant('something-went-wrong-pl'),

        )
  }
}

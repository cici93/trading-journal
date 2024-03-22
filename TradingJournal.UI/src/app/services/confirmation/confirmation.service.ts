import { Injectable } from '@angular/core';
import { NzModalService } from "ng-zorro-antd/modal";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {

  constructor(
      private modal: NzModalService,
      private translate: TranslateService
  ) { }

  showConfirm() {
    return new Promise(resolve => {
      this.modal.confirm({
        nzTitle: this.translate.instant('attention'),
        nzContent: this.translate.instant('do-you-really-want-to-pro'),
        nzOkText: this.translate.instant('yes'),
        nzOkType: 'primary',
        nzOkDanger: true,
        nzOnOk: () => resolve(true),
        nzCancelText: this.translate.instant('no'),
        nzOnCancel: () => resolve(false)
      })
    })
  }
}

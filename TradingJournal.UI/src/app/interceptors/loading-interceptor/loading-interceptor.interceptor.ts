import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from "../../services/loading/loading.service";
import { finalize } from "rxjs";
import { inject } from "@angular/core";

export const loadingInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    const loadingService = inject(LoadingService);
    loadingService.loadingOn();
    return next(req).pipe(
        finalize(() => loadingService.loadingOff())
    );
};
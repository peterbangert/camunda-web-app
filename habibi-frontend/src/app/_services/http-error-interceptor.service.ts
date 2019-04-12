import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import {Router} from '@angular/router';
import {UNAUTHORIZED} from 'http-status-codes';
import { ToastrService} from 'ngx-toastr';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = `Error: ${error.error.message}`;
          } else {
            // server-side error
            if (error.status === UNAUTHORIZED) {
              this.router.navigateByUrl('/home-view');
            }
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }

          this.toastr.error(errorMessage, 'Error');
          return throwError(errorMessage);
        })
      );
  }
}

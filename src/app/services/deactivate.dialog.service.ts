import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ConfirmationMsgComponent } from '../builder/shared/modals/confirmation-msg/confirmation-msg.component';

@Injectable()
export class DeactivateDialogService {
    constructor() { }
    confirm(message?: string): Observable<any> {
        const confirmation = window.confirm(message || 'Are you sure?');

        return of(confirmation);
    };
} 
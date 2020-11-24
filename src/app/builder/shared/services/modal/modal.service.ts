import { Injectable } from '@angular/core';
import { BuilderService } from '../builder/builder.service';
import { isArray } from 'util';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private _builderSer: BuilderService) { }

  okAction(action, modalRef, data, prop?, question?) {
    action.next({ action: 'ok', value: data });
    modalRef.hide();
  }
  applyAction(action, data) {
    action.next({ action: 'apply', value: data });
  }
  cancelAction(modalRef) {
    modalRef.hide();
  }
}

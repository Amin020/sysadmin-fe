import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanDeactivate } from './deactivate.interface';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    constructor(private _router: Router) { }
    canDeactivate(component: CanComponentDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        let url: string = state.url;
        console.log('Url: ' + url);
        return component.canDeactivate ? component.canDeactivate() : true;
    }
}

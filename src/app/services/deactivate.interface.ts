import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from 'rxjs';

export interface CanDeactivate<T> {
    canDeactivate(component: T,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
} 
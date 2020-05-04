import { Subscription } from "rxjs";
import { OnDestroy } from '@angular/core';

export class SubscribeCleaner implements OnDestroy {
    private _subscriptions: Subscription[];

    get subscriptions() {
        return this._subscriptions;
    }
    set unsubscribeOnDestroy(subscription: Subscription) {
        this._subscriptions.push(subscription);
    }

    constructor() {
        this._subscriptions = [];
    }
    /**
     * Don't forget to call super.ngOnDestroy() if you add ngOnDestroy to components!
     */
    ngOnDestroy() {
        // console.log("unscubscribe: ", this._subscriptions);
        this._subscriptions.forEach(sub => {
            sub.unsubscribe();
        });
    }
}
import { Injectable, signal } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private loadingSource = signal(false);

    start() {
        this.loadingSource.set(true);
    }

    stop() {
        this.loadingSource.set(false);
    }

    get isLoading() {
        return this.loadingSource;
    }
}
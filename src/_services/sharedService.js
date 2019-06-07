import { Subject } from "rxjs";

export const sharedSerivce = {
    showHideLoader,
    toggleLoader: new Subject()
}

function showHideLoader(show) {
    sharedSerivce.toggleLoader.next(show);
}
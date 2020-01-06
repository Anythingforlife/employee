import { Subject } from "rxjs";

export const sharedService = {
    showHideLoader,
    cloneObject,
    toggleLoader: new Subject()
}

function showHideLoader(show) {
    sharedService.toggleLoader.next(show);
}

function cloneObject(data) {
    return JSON.parse(JSON.stringify(data));
}
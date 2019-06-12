import { Subject } from "rxjs";

export const sharedSerivce = {
    showHideLoader,
    cloneObject,
    toggleLoader: new Subject()
}

function showHideLoader(show) {
    sharedSerivce.toggleLoader.next(show);
}

function cloneObject(data) {
    return JSON.parse(JSON.stringify(data));
}
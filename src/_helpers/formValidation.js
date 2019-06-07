export function isValidForm(fields) {
    return Object.keys(fields).some(key => fields[key].invalid);
}

export function formControlDirtyStatus(fields,controlName) {
    return fields[controlName] && (fields[controlName].touched || fields[controlName].dirty);
}
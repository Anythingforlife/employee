import { httpService } from '../core/';

export const employeeService = {
    employeesData,
    addEmployee,
    editEmployee,
    deleteEmployee
}

function employeesData(paginationData) {
    return httpService.get('/employees?currentPage=' + paginationData.currentPage + '&perPage=' + paginationData.perPage);
}

function addEmployee(employee) {
    return httpService.post('/employees', employee);
}

function editEmployee(employeeId, employee) {
    return httpService.putMethod('/employees/' + employeeId, employee);
}

function deleteEmployee(employeeId) {
    return httpService.deleteMethod('/employees/' + employeeId);
}
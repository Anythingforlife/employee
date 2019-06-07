import { httpService } from '../core';

export const employeeService = {
    employeesData,
}

function employeesData(paginationData) {
    return httpService.get('/employees?currentPage=' + paginationData.currentPage + '&perPage=' + paginationData.perPage);
}
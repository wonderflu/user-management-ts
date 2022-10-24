export enum ExceptionMessage {
  INVALID_USERNAME = 'User with such username is not found',
  INVALID_PASSWORD = 'The password is incorrect',
  NOT_FOUND = 'The page you are looking for was not found',
  DUPLICATE_DEPARTMENT_NAME = 'Department with the specified name already exists.',
  INVALID_DEPARTMENT_ID = 'Department with such ID does not exist',
  DUPLICATE_EMPLOYEE_USERNAME = 'Employee with the specified username already exists',
  DUPLICATE_EMAIL = 'Employee with the specified email already exists',
  NOT_EMPTY_DEPARTMENT = 'Cannot delete department with employees',
  FORBIDDEN = 'You do not have permission to access this resource',
}

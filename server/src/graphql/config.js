// Routes for the admin
export const COMPANY_AUTH_ROUTES = [
  "Company_AddEmployee",
  "Company_AddClient",
  "GetCompany",
  "Company_GetPayroll",
  "Shift_CreateShift",
  "Shift_UpdateShift",
  "Shift_DeleteShift",
  "Company_DeleteEmployee",
  "Company_DeleteClient",
];

// Routes for a member of the company
export const COMPANY_MEMBER_ROUTES = [
  "GetCompany",
  "Company_GetEmployeeCompany",
  "Company_GetClientCompany",
  "Company_GetSummary",
  "UpdateProfile",
];

export interface Appointment {
    BookDate: Date;
    StartTime: string;
    EndTime: string;
    ServiceID: string;
    StaffID: string;
    Deposit: number;
    Islocked: boolean;
    CustomerNote: string;
    CompanyNote: string;
  }
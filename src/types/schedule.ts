export interface Schedule {
    ID: number;
    CompanyID: string;
    CompanyName: string | null;
    ScheduleID: number;
    SheduleDate: string;
    StaffID: number;
    StartTime1: string | null;
    EndTime1: string | null;
    StartTime2: string | null;
    EndTime2: string | null;
    StartTime3: string | null;
    EndTime3: string | null;
    StartTime4: string | null;
    EndTime4: string | null;
    StartTime5: string | null;
    EndTime5: string | null;
    StartTime6: string | null;
    EndTime6: string | null;
    ScheduleTypeID: number;
    Deleted: boolean;
  }
  
export interface StaffSchedule {
    name: string;
    schedule: (string | null)[];
  }
  
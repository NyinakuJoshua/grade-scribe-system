
export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  class: string;
  section: string;
  gender: 'Male' | 'Female' | 'Other';
  dateOfBirth?: string;
  contactNumber?: string;
  email?: string;
  address?: string;
  guardianName?: string;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  maxMarks: number;
  passingMarks: number;
}

export interface Grade {
  classScore: number;
  examScore: number;
  marks: number;
  percentage: number;
  letterGrade: string;
  remarks: string;
}

export interface SubjectGrade {
  subject: Subject;
  grade: Grade;
}

export interface ReportCard {
  id: string;
  student: Student;
  academicYear: string;
  term: string;
  issueDate: string;
  subjectGrades: SubjectGrade[];
  totalMarks: number;
  maxMarks: number;
  percentage: number;
  overallGrade: string;
  teacherRemarks: string;
  classTeacherName?: string;
  attendance: {
    present: number;
    total: number;
    percentage: number;
  };
}

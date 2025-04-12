
import { Student, Subject, ReportCard } from "@/types";
import { calculateGrade, generateId } from "@/lib/utils";

export const mockStudents: Student[] = [
  {
    id: "s1",
    name: "John Smith",
    rollNumber: "2023001",
    class: "10",
    section: "A",
    gender: "Male",
    dateOfBirth: "2008-05-15",
    contactNumber: "555-123-4567",
    email: "john.smith@school.edu",
    address: "123 Main St, Anytown",
    guardianName: "Mary Smith",
  },
  {
    id: "s2",
    name: "Emily Johnson",
    rollNumber: "2023002",
    class: "10",
    section: "A",
    gender: "Female",
    dateOfBirth: "2008-03-22",
    contactNumber: "555-234-5678",
    email: "emily.johnson@school.edu",
    address: "456 Oak Ave, Anytown",
    guardianName: "Robert Johnson",
  },
  {
    id: "s3",
    name: "Michael Chen",
    rollNumber: "2023003",
    class: "10",
    section: "B",
    gender: "Male",
    dateOfBirth: "2008-09-10",
    contactNumber: "555-345-6789",
    email: "michael.chen@school.edu",
    address: "789 Pine Rd, Anytown",
    guardianName: "Wei Chen",
  },
  {
    id: "s4",
    name: "Sophia Rodriguez",
    rollNumber: "2023004",
    class: "10",
    section: "B",
    gender: "Female",
    dateOfBirth: "2008-11-30",
    contactNumber: "555-456-7890",
    email: "sophia.rodriguez@school.edu",
    address: "101 Cedar Ln, Anytown",
    guardianName: "Isabella Rodriguez",
  },
  {
    id: "s5",
    name: "James Williams",
    rollNumber: "2023005",
    class: "10",
    section: "A",
    gender: "Male",
    dateOfBirth: "2008-07-03",
    contactNumber: "555-567-8901",
    email: "james.williams@school.edu",
    address: "202 Maple Dr, Anytown",
    guardianName: "David Williams",
  },
];

export const mockSubjects: Subject[] = [
  {
    id: "sub1",
    name: "Mathematics",
    code: "MATH-101",
    maxMarks: 100,
    passingMarks: 35,
  },
  {
    id: "sub2",
    name: "Science",
    code: "SCI-101",
    maxMarks: 100,
    passingMarks: 35,
  },
  {
    id: "sub3",
    name: "English",
    code: "ENG-101",
    maxMarks: 100,
    passingMarks: 35,
  },
  {
    id: "sub4",
    name: "Social Studies",
    code: "SOC-101",
    maxMarks: 100,
    passingMarks: 35,
  },
  {
    id: "sub5",
    name: "Computer Science",
    code: "CS-101",
    maxMarks: 100,
    passingMarks: 35,
  },
];

export const generateMockReportCard = (student: Student, academicYear: string, term: string): ReportCard => {
  const subjectGrades = mockSubjects.map(subject => {
    // Generate random marks between 40 and 99
    const marks = Math.floor(Math.random() * 60) + 40;
    return {
      subject,
      grade: calculateGrade(marks, subject.maxMarks),
    };
  });

  const totalMarks = subjectGrades.reduce((total, sg) => total + sg.grade.marks, 0);
  const maxMarks = mockSubjects.reduce((total, subject) => total + subject.maxMarks, 0);
  const percentage = (totalMarks / maxMarks) * 100;
  
  let overallGrade = '';
  if (percentage >= 90) overallGrade = 'A+';
  else if (percentage >= 80) overallGrade = 'A';
  else if (percentage >= 70) overallGrade = 'B+';
  else if (percentage >= 60) overallGrade = 'B';
  else if (percentage >= 50) overallGrade = 'C';
  else if (percentage >= 40) overallGrade = 'D';
  else overallGrade = 'F';
  
  const presentDays = Math.floor(Math.random() * 20) + 160; // Between 160 and 179 days present
  const totalDays = 180;
  
  return {
    id: generateId(),
    student,
    academicYear,
    term,
    issueDate: new Date().toISOString().split('T')[0],
    subjectGrades,
    totalMarks,
    maxMarks,
    percentage,
    overallGrade,
    teacherRemarks: getRandomRemark(percentage),
    attendance: {
      present: presentDays,
      total: totalDays,
      percentage: (presentDays / totalDays) * 100,
    },
  };
};

function getRandomRemark(percentage: number): string {
  if (percentage >= 90) {
    return "Outstanding performance! Shows excellent understanding and application of concepts.";
  } else if (percentage >= 80) {
    return "Excellent work! Demonstrates strong grasp of the subject matter.";
  } else if (percentage >= 70) {
    return "Very good performance. Shows good understanding of most concepts.";
  } else if (percentage >= 60) {
    return "Good effort. Shows understanding of key concepts but has room for improvement.";
  } else if (percentage >= 50) {
    return "Satisfactory performance. Needs to work on strengthening fundamental concepts.";
  } else if (percentage >= 40) {
    return "Needs improvement. Should focus on building better understanding of core concepts.";
  } else {
    return "Requires significant improvement. Must work harder and seek additional help.";
  }
}

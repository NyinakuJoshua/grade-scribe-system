
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Grade, Subject } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateGrade(classScore: number, examScore: number, maxMarks: number): Grade {
  // Class score is 30% of total
  const weightedClassScore = (classScore / maxMarks) * 30;
  
  // Exam score is 70% of total
  const weightedExamScore = (examScore / maxMarks) * 70;
  
  // Total marks
  const marks = (weightedClassScore / 30) * maxMarks * 0.3 + (weightedExamScore / 70) * maxMarks * 0.7;
  
  const percentage = (marks / maxMarks) * 100;
  let letterGrade = '';
  let remarks = '';

  if (percentage >= 90) {
    letterGrade = 'A+';
    remarks = 'Outstanding';
  } else if (percentage >= 80) {
    letterGrade = 'A';
    remarks = 'Excellent';
  } else if (percentage >= 70) {
    letterGrade = 'B+';
    remarks = 'Very Good';
  } else if (percentage >= 60) {
    letterGrade = 'B';
    remarks = 'Good';
  } else if (percentage >= 50) {
    letterGrade = 'C';
    remarks = 'Satisfactory';
  } else if (percentage >= 40) {
    letterGrade = 'D';
    remarks = 'Needs Improvement';
  } else {
    letterGrade = 'F';
    remarks = 'Fail';
  }

  return {
    classScore,
    examScore,
    marks,
    percentage,
    letterGrade,
    remarks,
  };
}

export function getGradeClass(letterGrade: string): string {
  if (letterGrade.startsWith('A')) return 'grade-a';
  if (letterGrade.startsWith('B')) return 'grade-b';
  if (letterGrade.startsWith('C')) return 'grade-c';
  if (letterGrade.startsWith('D')) return 'grade-d';
  return 'grade-f';
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 10);
}

export function calculateTotalMarks(grades: { marks: number }[]): number {
  return grades.reduce((total, grade) => total + grade.marks, 0);
}

export function calculateMaxMarks(subjects: Subject[]): number {
  return subjects.reduce((total, subject) => total + subject.maxMarks, 0);
}

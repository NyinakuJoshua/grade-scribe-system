
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Student, Subject, ReportCard } from '@/types';
import { mockStudents, mockSubjects, generateMockReportCard } from '@/data/mockData';

interface ReportContextType {
  students: Student[];
  subjects: Subject[];
  reportCards: ReportCard[];
  addStudent: (student: Student) => void;
  addSubject: (subject: Subject) => void;
  addReportCard: (reportCard: ReportCard) => void;
  getReportCardsByStudent: (studentId: string) => ReportCard[];
  getStudentById: (studentId: string) => Student | undefined;
  deleteReportCard: (reportCardId: string) => void;
}

const ReportContext = createContext<ReportContextType | null>(null);

export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }
  return context;
};

export const ReportProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [reportCards, setReportCards] = useState<ReportCard[]>([]);

  // Initialize with mock data
  useEffect(() => {
    setStudents(mockStudents);
    setSubjects(mockSubjects);
    
    // Create mock report cards
    const mockReports = mockStudents.map(student => 
      generateMockReportCard(student, "2023-2024", "Annual")
    );
    setReportCards(mockReports);
  }, []);

  const addStudent = (student: Student) => {
    setStudents(prev => [...prev, student]);
  };

  const addSubject = (subject: Subject) => {
    setSubjects(prev => [...prev, subject]);
  };

  const addReportCard = (reportCard: ReportCard) => {
    setReportCards(prev => [...prev, reportCard]);
  };

  const getReportCardsByStudent = (studentId: string) => {
    return reportCards.filter(report => report.student.id === studentId);
  };

  const getStudentById = (studentId: string) => {
    return students.find(student => student.id === studentId);
  };

  const deleteReportCard = (reportCardId: string) => {
    setReportCards(prev => prev.filter(report => report.id !== reportCardId));
  };

  const value = {
    students,
    subjects,
    reportCards,
    addStudent,
    addSubject,
    addReportCard,
    getReportCardsByStudent,
    getStudentById,
    deleteReportCard,
  };

  return <ReportContext.Provider value={value}>{children}</ReportContext.Provider>;
};

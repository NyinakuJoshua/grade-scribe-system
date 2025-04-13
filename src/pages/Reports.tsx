
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useReportContext } from '@/context/ReportContext';
import ReportFilters from '@/components/reports/ReportFilters';
import ReportTable from '@/components/reports/ReportTable';
import EmptyReportState from '@/components/reports/EmptyReportState';

const Reports = () => {
  const { reportCards, students, deleteReportCard } = useReportContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  
  const classes = Array.from(new Set(students.map(student => student.class)));
  const academicYears = Array.from(new Set(reportCards.map(report => report.academicYear)));
  const terms = Array.from(new Set(reportCards.map(report => report.term)));
  
  const filteredReports = reportCards.filter(report => {
    const matchesSearch = report.student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || report.student.class === selectedClass;
    const matchesYear = selectedYear === 'all' || report.academicYear === selectedYear;
    const matchesTerm = selectedTerm === 'all' || report.term === selectedTerm;
    
    return matchesSearch && matchesClass && matchesYear && matchesTerm;
  });
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Report Cards</h1>
          <p className="text-muted-foreground">View and manage all student report cards</p>
        </div>
        
        <ReportFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedClass={selectedClass}
          setSelectedClass={setSelectedClass}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
          classes={classes}
          academicYears={academicYears}
          terms={terms}
        />
        
        {filteredReports.length === 0 ? (
          <EmptyReportState />
        ) : (
          <ReportTable 
            reports={filteredReports} 
            deleteReportCard={deleteReportCard} 
          />
        )}
      </main>
    </div>
  );
};

export default Reports;


import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import ReportForm from '@/components/ReportForm';
import ReportCardPreview from '@/components/ReportCardPreview';
import { Button } from '@/components/ui/button';
import { useReportContext } from '@/context/ReportContext';
import { ReportCard } from '@/types';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const CreateReport = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const { getStudentById, subjects, addReportCard } = useReportContext();
  const [reportCard, setReportCard] = useState<ReportCard | null>(null);
  
  const student = getStudentById(studentId || '');
  
  if (!student) {
    return (
      <div>
        <Header />
        <div className="container py-8 text-center">
          <h2 className="text-xl font-semibold">Student not found</h2>
          <Link to="/" className="text-primary hover:underline mt-4 block">
            Back to Students
          </Link>
        </div>
      </div>
    );
  }
  
  const handleReportComplete = (report: ReportCard) => {
    setReportCard(report);
  };
  
  const handleSave = () => {
    if (reportCard) {
      addReportCard(reportCard);
      navigate(`/students/${student.id}`);
    }
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <Link to={`/students/${student.id}`} className="flex items-center gap-1 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft size={16} />
          <span>Back to Student Profile</span>
        </Link>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Create Report Card</h1>
            <p className="text-muted-foreground">Student: {student.name} | Roll Number: {student.rollNumber}</p>
          </div>
        </div>
        
        {!reportCard ? (
          <div className="bg-white p-6 rounded-lg shadow">
            <ReportForm 
              student={student} 
              subjects={subjects} 
              onComplete={handleReportComplete} 
            />
          </div>
        ) : (
          <div>
            <div className="no-print mb-6 flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => setReportCard(null)}
              >
                Edit Report
              </Button>
              <Button 
                onClick={() => window.print()}
              >
                Print Report Card
              </Button>
              <Button onClick={handleSave}>
                Save Report Card
              </Button>
            </div>
            <ReportCardPreview reportCard={reportCard} />
          </div>
        )}
      </main>
    </div>
  );
};

export default CreateReport;

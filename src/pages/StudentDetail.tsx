
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useReportContext } from '@/context/ReportContext';
import { FilePlus, User, Calendar, FileText, Mail, Phone, Home } from 'lucide-react';
import ReportCardPreview from '@/components/ReportCardPreview';
import { formatDate } from '@/lib/utils';

const StudentDetail = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { getStudentById, getReportCardsByStudent } = useReportContext();
  
  const student = getStudentById(studentId || '');
  const reportCards = getReportCardsByStudent(studentId || '');
  
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
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">{student.name}</h1>
            <p className="text-muted-foreground">Roll Number: {student.rollNumber} | Class: {student.class} {student.section}</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to={`/create-report/${student.id}`} className="flex items-center gap-2">
              <FilePlus size={18} />
              <span>Create New Report</span>
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={18} />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-muted-foreground text-sm">Full Name</p>
                <p>{student.name}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Gender</p>
                <p>{student.gender}</p>
              </div>
              {student.dateOfBirth && (
                <div>
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    <Calendar size={16} /> Date of Birth
                  </p>
                  <p>{formatDate(student.dateOfBirth)}</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText size={18} />
                Academic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <p className="text-muted-foreground text-sm">Class</p>
                <p>{student.class}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Section</p>
                <p>{student.section}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Roll Number</p>
                <p>{student.rollNumber}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home size={18} />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {student.email && (
                <div>
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    <Mail size={16} /> Email
                  </p>
                  <p>{student.email}</p>
                </div>
              )}
              {student.contactNumber && (
                <div>
                  <p className="text-muted-foreground text-sm flex items-center gap-2">
                    <Phone size={16} /> Contact Number
                  </p>
                  <p>{student.contactNumber}</p>
                </div>
              )}
              {student.guardianName && (
                <div>
                  <p className="text-muted-foreground text-sm">Guardian</p>
                  <p>{student.guardianName}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Report Cards</h2>
          
          {reportCards.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center">
                <p className="text-muted-foreground mb-4">No report cards available for this student</p>
                <Button asChild>
                  <Link to={`/create-report/${student.id}`}>Create Report Card</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue={reportCards[0].id}>
              <TabsList className="mb-4">
                {reportCards.map(report => (
                  <TabsTrigger key={report.id} value={report.id}>
                    {report.term} ({report.academicYear})
                  </TabsTrigger>
                ))}
              </TabsList>
              {reportCards.map(report => (
                <TabsContent key={report.id} value={report.id} className="mb-4">
                  <div className="no-print mb-4 flex justify-end">
                    <Button 
                      onClick={() => window.print()}
                    >
                      Print Report Card
                    </Button>
                  </div>
                  <ReportCardPreview reportCard={report} />
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDetail;

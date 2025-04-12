
import React from 'react';
import Header from '@/components/Header';
import { useReportContext } from '@/context/ReportContext';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

const Subjects = () => {
  const { subjects } = useReportContext();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Subjects</h1>
          <p className="text-muted-foreground">View all available subjects</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card key={subject.id}>
              <CardHeader className="flex flex-row items-center gap-3">
                <BookOpen size={24} className="text-primary" />
                <div>
                  <CardTitle>{subject.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{subject.code}</p>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between text-sm">
                  <span>Maximum Marks: <strong>{subject.maxMarks}</strong></span>
                  <span>Passing Marks: <strong>{subject.passingMarks}</strong></span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Subjects;

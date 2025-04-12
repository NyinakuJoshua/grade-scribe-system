
import React from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FilePlus, UserRound } from 'lucide-react';
import { Student } from '@/types';
import { Link } from 'react-router-dom';

interface StudentCardProps {
  student: Student;
}

const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <Card className="overflow-hidden transition-transform hover:shadow-lg">
      <CardHeader className="bg-primary text-primary-foreground py-3 flex flex-row items-center gap-2">
        <UserRound size={18} />
        <h3 className="font-medium text-sm">{student.rollNumber}</h3>
      </CardHeader>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold mb-1">{student.name}</h3>
        <div className="text-sm text-muted-foreground mb-4">
          <p>Class: {student.class} {student.section}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="w-full">
            <Link to={`/students/${student.id}`}>View Profile</Link>
          </Button>
          <Button asChild variant="default" size="sm" className="w-full">
            <Link to={`/create-report/${student.id}`} className="flex items-center gap-2">
              <FilePlus size={16} /> 
              <span>Create Report</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;

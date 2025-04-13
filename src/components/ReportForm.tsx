
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student, Subject, ReportCard, SubjectGrade } from '@/types';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateGrade, generateId } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ReportFormProps {
  student: Student;
  subjects: Subject[];
  onComplete: (reportCard: ReportCard) => void;
}

const ReportForm = ({ student, subjects, onComplete }: ReportFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [academicYear, setAcademicYear] = useState("2023-2024");
  const [term, setTerm] = useState("Annual");
  const [classScores, setClassScores] = useState<Record<string, number>>(
    subjects.reduce((acc, subject) => ({ ...acc, [subject.id]: 0 }), {})
  );
  const [examScores, setExamScores] = useState<Record<string, number>>(
    subjects.reduce((acc, subject) => ({ ...acc, [subject.id]: 0 }), {})
  );
  const [attendance, setAttendance] = useState({
    present: 170,
    total: 180
  });
  const [teacherRemarks, setTeacherRemarks] = useState("");
  const [classTeacherName, setClassTeacherName] = useState("");

  const handleClassScoreChange = (subjectId: string, value: string) => {
    const numValue = parseInt(value);
    const subject = subjects.find(s => s.id === subjectId);
    
    if (subject && (isNaN(numValue) || numValue < 0 || numValue > subject.maxMarks)) {
      return; // Invalid input
    }
    
    setClassScores(prev => ({
      ...prev,
      [subjectId]: numValue || 0
    }));
  };

  const handleExamScoreChange = (subjectId: string, value: string) => {
    const numValue = parseInt(value);
    const subject = subjects.find(s => s.id === subjectId);
    
    if (subject && (isNaN(numValue) || numValue < 0 || numValue > subject.maxMarks)) {
      return; // Invalid input
    }
    
    setExamScores(prev => ({
      ...prev,
      [subjectId]: numValue || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate marks
    for (const subject of subjects) {
      if (classScores[subject.id] < 0 || classScores[subject.id] > subject.maxMarks) {
        toast({
          title: "Invalid Class Score",
          description: `Class score for ${subject.name} must be between 0 and ${subject.maxMarks}`,
          variant: "destructive",
        });
        return;
      }
      if (examScores[subject.id] < 0 || examScores[subject.id] > subject.maxMarks) {
        toast({
          title: "Invalid Exam Score",
          description: `Exam score for ${subject.name} must be between 0 and ${subject.maxMarks}`,
          variant: "destructive",
        });
        return;
      }
    }
    
    // Calculate subject grades
    const subjectGrades: SubjectGrade[] = subjects.map(subject => ({
      subject,
      grade: calculateGrade(classScores[subject.id], examScores[subject.id], subject.maxMarks)
    }));
    
    // Calculate totals
    const totalMarks = subjectGrades.reduce((total, sg) => total + sg.grade.marks, 0);
    const maxMarks = subjects.reduce((total, subject) => total + subject.maxMarks, 0);
    const percentage = (totalMarks / maxMarks) * 100;
    
    // Determine overall grade
    let overallGrade = '';
    if (percentage >= 90) overallGrade = 'A+';
    else if (percentage >= 80) overallGrade = 'A';
    else if (percentage >= 70) overallGrade = 'B+';
    else if (percentage >= 60) overallGrade = 'B';
    else if (percentage >= 50) overallGrade = 'C';
    else if (percentage >= 40) overallGrade = 'D';
    else overallGrade = 'F';
    
    // Create report card object
    const reportCard: ReportCard = {
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
      teacherRemarks,
      classTeacherName,
      attendance: {
        ...attendance,
        percentage: (attendance.present / attendance.total) * 100
      }
    };
    
    // Complete the form
    onComplete(reportCard);
    
    toast({
      title: "Report Created",
      description: "Student report card has been created successfully",
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="academicYear">Academic Year</Label>
          <Select 
            value={academicYear} 
            onValueChange={(value) => setAcademicYear(value)}
          >
            <SelectTrigger id="academicYear">
              <SelectValue placeholder="Select Academic Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2022-2023">2022-2023</SelectItem>
              <SelectItem value="2023-2024">2023-2024</SelectItem>
              <SelectItem value="2024-2025">2024-2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="term">Term</Label>
          <Select 
            value={term} 
            onValueChange={(value) => setTerm(value)}
          >
            <SelectTrigger id="term">
              <SelectValue placeholder="Select Term" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="First Term">First Term</SelectItem>
              <SelectItem value="Mid Term">Mid Term</SelectItem>
              <SelectItem value="Final Term">Final Term</SelectItem>
              <SelectItem value="Annual">Annual</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-3">Subject Marks</h2>
        <div className="space-y-3">
          {subjects.map(subject => (
            <div key={subject.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
              <div className="md:col-span-2">
                <Label>{subject.name} ({subject.code})</Label>
              </div>
              <div>
                <Label htmlFor={`class-${subject.id}`} className="text-sm">Class Score (30%)</Label>
                <Input
                  id={`class-${subject.id}`}
                  type="number"
                  value={classScores[subject.id]}
                  onChange={(e) => handleClassScoreChange(subject.id, e.target.value)}
                  min={0}
                  max={subject.maxMarks}
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor={`exam-${subject.id}`} className="text-sm">Exam Score (70%)</Label>
                <Input
                  id={`exam-${subject.id}`}
                  type="number"
                  value={examScores[subject.id]}
                  onChange={(e) => handleExamScoreChange(subject.id, e.target.value)}
                  min={0}
                  max={subject.maxMarks}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Total: {(classScores[subject.id] * 0.3 + examScores[subject.id] * 0.7).toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">
                Max: {subject.maxMarks}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold mb-3">Attendance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="present">Days Present</Label>
            <Input
              id="present"
              type="number"
              value={attendance.present}
              onChange={(e) => setAttendance({ ...attendance, present: parseInt(e.target.value) || 0 })}
              min={0}
              max={attendance.total}
            />
          </div>
          <div>
            <Label htmlFor="total">Total School Days</Label>
            <Input
              id="total"
              type="number"
              value={attendance.total}
              onChange={(e) => setAttendance({ ...attendance, total: parseInt(e.target.value) || 1 })}
              min={1}
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="remarks">Teacher's Remarks</Label>
        <Textarea
          id="remarks"
          value={teacherRemarks}
          onChange={(e) => setTeacherRemarks(e.target.value)}
          placeholder="Enter your remarks about the student's performance"
          rows={4}
        />
      </div>
      
      <div>
        <Label htmlFor="classTeacherName">Class Teacher's Name (for signature)</Label>
        <Input
          id="classTeacherName"
          value={classTeacherName}
          onChange={(e) => setClassTeacherName(e.target.value)}
          placeholder="Enter class teacher's name"
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button type="submit">Generate Report Card</Button>
      </div>
    </form>
  );
};

export default ReportForm;

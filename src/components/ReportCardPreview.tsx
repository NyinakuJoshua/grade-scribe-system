
import React from 'react';
import { ReportCard } from '@/types';
import { formatDate, getGradeClass } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import ReportCardCover from './ReportCardCover';

interface ReportCardPreviewProps {
  reportCard: ReportCard;
}

const ReportCardPreview = ({ reportCard }: ReportCardPreviewProps) => {
  const { student, academicYear, term, subjectGrades, percentage, overallGrade, attendance, teacherRemarks, classTeacherName } = reportCard;

  return (
    <>
      <ReportCardCover reportCard={reportCard} />
      
      <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto print-container">
        <div className="text-center mb-6 border-b pb-4">
          <h1 className="text-2xl font-bold text-primary mb-1">ROYAL EDUCATIONAL COMPLEX</h1>
          <h2 className="text-xl font-semibold mb-1">STUDENT PROGRESS REPORT</h2>
          <p className="text-md">Academic Year: {academicYear} | Term: {term}</p>
          <p className="text-sm text-muted-foreground">Issue Date: {formatDate(reportCard.issueDate)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Student Information</h2>
            <div className="space-y-1">
              <p><span className="font-medium">Name:</span> {student.name}</p>
              <p><span className="font-medium">Roll Number:</span> {student.rollNumber}</p>
              <p><span className="font-medium">Class:</span> {student.class} {student.section}</p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Academic Performance</h2>
            <div className="flex flex-col gap-2">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Overall: {percentage.toFixed(1)}%</span>
                  <span className={`text-sm font-medium ${getGradeClass(overallGrade)}`}>{overallGrade}</span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Attendance: {attendance.percentage.toFixed(1)}%</span>
                  <span className="text-sm">{attendance.present} / {attendance.total} days</span>
                </div>
                <Progress value={attendance.percentage} className="h-2" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-3">Subject Grades</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Code</TableHead>
              <TableHead className="text-right">Class Score (30%)</TableHead>
              <TableHead className="text-right">Exam Score (70%)</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">Max</TableHead>
              <TableHead className="text-right">Percentage</TableHead>
              <TableHead className="text-right">Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjectGrades.map((sg, index) => (
              <TableRow key={index}>
                <TableCell>{sg.subject.name}</TableCell>
                <TableCell>{sg.subject.code}</TableCell>
                <TableCell className="text-right">{sg.grade.classScore}</TableCell>
                <TableCell className="text-right">{sg.grade.examScore}</TableCell>
                <TableCell className="text-right">{sg.grade.marks.toFixed(1)}</TableCell>
                <TableCell className="text-right">{sg.subject.maxMarks}</TableCell>
                <TableCell className="text-right">{sg.grade.percentage.toFixed(1)}%</TableCell>
                <TableCell className={`text-right ${getGradeClass(sg.grade.letterGrade)}`}>
                  {sg.grade.letterGrade}
                </TableCell>
              </TableRow>
            ))}
            <TableRow className="font-medium">
              <TableCell colSpan={4}>Total</TableCell>
              <TableCell className="text-right">{reportCard.totalMarks.toFixed(1)}</TableCell>
              <TableCell className="text-right">{reportCard.maxMarks}</TableCell>
              <TableCell className="text-right">{reportCard.percentage.toFixed(1)}%</TableCell>
              <TableCell className={`text-right ${getGradeClass(reportCard.overallGrade)}`}>
                {reportCard.overallGrade}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Teacher's Remarks</h2>
          <div className="border p-3 rounded-md bg-muted/50">
            <p>{teacherRemarks}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-10">Class Teacher's Signature</p>
            <div className="border-b border-black w-full"></div>
            {classTeacherName && <p className="mt-2 text-sm">{classTeacherName}</p>}
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-10">Headmaster's Signature & Stamp</p>
            <div className="border-b border-black w-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportCardPreview;

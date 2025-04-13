
import React from 'react';
import { ReportCard } from '@/types';
import { Link } from 'react-router-dom';
import { Eye, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getGradeClass } from '@/lib/utils';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface ReportTableProps {
  reports: ReportCard[];
  deleteReportCard: (id: string) => void;
}

const ReportTable = ({ reports, deleteReportCard }: ReportTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Student Name</TableHead>
          <TableHead>Roll Number</TableHead>
          <TableHead>Class</TableHead>
          <TableHead>Academic Year</TableHead>
          <TableHead>Term</TableHead>
          <TableHead>Overall Grade</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reports.map((report) => (
          <TableRow key={report.id}>
            <TableCell>{report.student.name}</TableCell>
            <TableCell>{report.student.rollNumber}</TableCell>
            <TableCell>{report.student.class} {report.student.section}</TableCell>
            <TableCell>{report.academicYear}</TableCell>
            <TableCell>{report.term}</TableCell>
            <TableCell>
              <span className={getGradeClass(report.overallGrade)}>
                {report.overallGrade} ({report.percentage.toFixed(1)}%)
              </span>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button size="icon" variant="ghost" asChild>
                  <Link to={`/students/${report.student.id}`}>
                    <Eye size={18} />
                    <span className="sr-only">View</span>
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="ghost">
                      <Trash2 size={18} className="text-destructive" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Report Card</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this report card? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={() => deleteReportCard(report.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReportTable;

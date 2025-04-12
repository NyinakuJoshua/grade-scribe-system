
import React, { useState } from 'react';
import Header from '@/components/Header';
import { useReportContext } from '@/context/ReportContext';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { getGradeClass } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Search, FileText, Eye, Trash2 } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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

const Reports = () => {
  const { reportCards, students, deleteReportCard } = useReportContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  
  const classes = Array.from(new Set(students.map(student => student.class)));
  const academicYears = Array.from(new Set(reportCards.map(report => report.academicYear)));
  const terms = Array.from(new Set(reportCards.map(report => report.term)));
  
  const filteredReports = reportCards.filter(report => {
    const matchesSearch = report.student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          report.student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || report.student.class === selectedClass;
    const matchesYear = !selectedYear || report.academicYear === selectedYear;
    const matchesTerm = !selectedTerm || report.term === selectedTerm;
    
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
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Filter Reports</CardTitle>
            <CardDescription>Use the filters below to find specific report cards</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search by name or roll number" 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger>
                  <SelectValue placeholder="Academic Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Years</SelectItem>
                  {academicYears.map(year => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                <SelectTrigger>
                  <SelectValue placeholder="Term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Terms</SelectItem>
                  {terms.map(term => (
                    <SelectItem key={term} value={term}>{term}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        
        {filteredReports.length === 0 ? (
          <div className="text-center py-12">
            <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No report cards found matching your filters</p>
          </div>
        ) : (
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
              {filteredReports.map((report) => (
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
        )}
      </main>
    </div>
  );
};

export default Reports;

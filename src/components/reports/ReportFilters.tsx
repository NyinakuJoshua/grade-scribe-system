
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ReportFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedYear: string;
  setSelectedYear: (value: string) => void;
  selectedTerm: string;
  setSelectedTerm: (value: string) => void;
  classes: string[];
  academicYears: string[];
  terms: string[];
}

const ReportFilters = ({
  searchTerm,
  setSearchTerm,
  selectedClass,
  setSelectedClass,
  selectedYear,
  setSelectedYear,
  selectedTerm,
  setSelectedTerm,
  classes,
  academicYears,
  terms,
}: ReportFiltersProps) => {
  return (
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
              <SelectItem value="all">All Classes</SelectItem>
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
              <SelectItem value="all">All Years</SelectItem>
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
              <SelectItem value="all">All Terms</SelectItem>
              {terms.map(term => (
                <SelectItem key={term} value={term}>{term}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportFilters;


import React from 'react';
import Header from '@/components/Header';
import StudentCard from '@/components/StudentCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useReportContext } from '@/context/ReportContext';
import { UserPlus, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const { students } = useReportContext();
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Students</h1>
            <p className="text-muted-foreground">Manage student profiles and generate reports</p>
          </div>
          <Button asChild className="mt-4 md:mt-0">
            <Link to="/add-student" className="flex items-center gap-2">
              <UserPlus size={18} />
              <span>Add New Student</span>
            </Link>
          </Button>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search students by name, roll number or class..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {filteredStudents.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No students found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents.map((student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;

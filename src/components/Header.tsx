
import React from 'react';
import { GraduationCap, BookOpen, Users, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-primary text-primary-foreground py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex items-center gap-2">
        <GraduationCap size={32} />
        <h1 className="text-xl font-bold">SchoolReport</h1>
      </div>
      <nav>
        <ul className="flex gap-6">
          <li>
            <Link to="/" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <Users size={18} />
              <span>Students</span>
            </Link>
          </li>
          <li>
            <Link to="/reports" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <FileText size={18} />
              <span>Reports</span>
            </Link>
          </li>
          <li>
            <Link to="/subjects" className="flex items-center gap-2 hover:text-secondary transition-colors">
              <BookOpen size={18} />
              <span>Subjects</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

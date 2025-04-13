
import React from 'react';
import { ReportCard } from '@/types';

interface ReportCardCoverProps {
  reportCard: ReportCard;
}

const ReportCardCover = ({ reportCard }: ReportCardCoverProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto print-container mb-8 page-break-after">
      <div className="border-4 border-primary p-8 min-h-[800px] flex flex-col">
        <div className="flex justify-between items-start mb-8">
          <div className="w-24 h-24 bg-muted/20 rounded-full overflow-hidden flex items-center justify-center border-2 border-primary">
            <img 
              src="/lovable-uploads/53887a6c-01c0-48bc-ad6d-dc2b0c442c59.png" 
              alt="School Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
          
          <div className="flex flex-col items-end">
            <h1 className="text-4xl font-bold text-primary tracking-wider transform rotate-90 origin-top-right whitespace-nowrap">
              ROYAL
            </h1>
            <h1 className="text-4xl font-bold text-primary tracking-wider transform rotate-90 origin-top-right whitespace-nowrap mt-1">
              EDUCATIONAL
            </h1>
            <h1 className="text-4xl font-bold text-primary tracking-wider transform rotate-90 origin-top-right whitespace-nowrap mt-1">
              COMPLEX
            </h1>
          </div>
        </div>
        
        <div className="flex-grow flex flex-col items-center justify-center">
          <div className="text-center mb-16">
            <h2 className="text-xl font-semibold text-muted-foreground">MOTTO: GOD IS OUR STRENGTH</h2>
            <p className="text-sm text-muted-foreground mt-2">P.O. BOX 541, VELHO BONGO EAST REGION</p>
            <p className="text-sm text-muted-foreground">TEL: 0542947293 / 0287354936</p>
          </div>
          
          <div className="border-2 border-black p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-8">PUPIL'S PROGRESS REPORT</h2>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="col-span-1 text-right font-medium">NAME:</div>
              <div className="col-span-2 border-b border-black">{reportCard.student.name}</div>
              
              <div className="col-span-1 text-right font-medium">Term Three (3):</div>
              <div className="col-span-2 border-b border-black">{reportCard.term}</div>
              
              <div className="col-span-1 text-right font-medium">Level KG 1:</div>
              <div className="col-span-2 border-b border-black">Class {reportCard.student.class} {reportCard.student.section}</div>
              
              <div className="col-span-1 text-right font-medium">Academic Year:</div>
              <div className="col-span-2 border-b border-black">{reportCard.academicYear}</div>
            </div>
            
            <div className="mt-8 pt-4 border-t border-black">
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div className="col-span-1 text-right font-medium">RE-OPENING DATE:</div>
                <div className="col-span-2 border-b border-black">10th JANUARY 2023</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <img 
            src="/lovable-uploads/53887a6c-01c0-48bc-ad6d-dc2b0c442c59.png" 
            alt="School Logo Small"
            className="w-12 h-12 object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default ReportCardCover;

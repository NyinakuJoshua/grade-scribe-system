
import React from 'react';
import { FileText } from 'lucide-react';

const EmptyReportState = () => {
  return (
    <div className="text-center py-12">
      <FileText size={48} className="mx-auto text-muted-foreground mb-4" />
      <p className="text-muted-foreground">No report cards found matching your filters</p>
    </div>
  );
};

export default EmptyReportState;

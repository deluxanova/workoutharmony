
import React from 'react';
import { WeightRecord } from '@/utils/types';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrashIcon, PencilIcon } from 'lucide-react';

interface WeightHistoryProps {
  data: WeightRecord[];
  onDelete: (id: string) => void;
  onEdit: (record: WeightRecord) => void;
}

export const WeightHistory: React.FC<WeightHistoryProps> = ({ data, onDelete, onEdit }) => {
  // Sort the data by date (newest first)
  const sortedData = [...data].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="glass-panel rounded-xl p-5 animate-fade-in">
      <h3 className="text-xl font-semibold mb-4">Weight History</h3>
      
      {sortedData.length === 0 ? (
        <p className="text-muted-foreground text-center py-4">No weight records found. Start by adding your weight above.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Weight (kg)</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="font-medium">{format(record.date, 'MMM d, yyyy')}</TableCell>
                  <TableCell>{record.weight} kg</TableCell>
                  <TableCell className="max-w-[200px] truncate">{record.notes || '-'}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => onEdit(record)}
                        className="p-2 hover:bg-secondary rounded-full"
                        aria-label="Edit weight record"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(record.id)}
                        className="p-2 hover:bg-destructive/10 rounded-full text-destructive"
                        aria-label="Delete weight record"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

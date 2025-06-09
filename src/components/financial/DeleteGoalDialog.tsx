
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
}

interface DeleteGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goalToDelete: Goal | undefined;
  onConfirmDelete: () => void;
}

const DeleteGoalDialog: React.FC<DeleteGoalDialogProps> = ({
  open,
  onOpenChange,
  goalToDelete,
  onConfirmDelete
}) => {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm sm:max-w-md bg-white mx-4 shadow-xl border-0 rounded-2xl">
        <DialogHeader className="text-center pb-2">
          <div className="mx-auto mb-4 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🗑️</span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            {t('confirmDeleteGoal')}
          </DialogTitle>
          <DialogDescription className="text-base sm:text-lg text-gray-600 leading-relaxed">
            {t('confirmDeleteMessage')} "{goalToDelete?.title}"?
            <br />
            <span className="text-sm text-gray-500 mt-3 block bg-blue-50 p-3 rounded-lg border border-blue-200">
              <span className="text-blue-700 font-medium">⚠️ {t('cannotUndoAction')}</span>
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-100">
          <Button 
            onClick={onConfirmDelete} 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base py-3 rounded-xl font-semibold transition-all duration-200 hover:scale-105"
          >
            {t('yesDeleteGoal')}
          </Button>
          <Button 
            onClick={() => onOpenChange(false)} 
            variant="outline" 
            className="flex-1 text-sm sm:text-base py-3 rounded-xl font-semibold border-2 hover:bg-gray-50 transition-all duration-200"
          >
            {t('cancel')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGoalDialog;

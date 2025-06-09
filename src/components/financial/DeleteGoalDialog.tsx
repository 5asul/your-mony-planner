
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
      <DialogContent className="max-w-sm sm:max-w-md bg-white mx-4">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-bold text-red-600">
            {t('confirmDeleteGoal')}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-lg">
            {t('confirmDeleteMessage')} "{goalToDelete?.title}"?
            <br />
            <span className="text-xs sm:text-sm text-gray-500 mt-2 block">
              {t('cannotUndoAction')}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col sm:flex-row gap-3 mt-4 sm:mt-6">
          <Button 
            onClick={onConfirmDelete} 
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base"
          >
            {t('yesDeleteGoal')}
          </Button>
          <Button 
            onClick={() => onOpenChange(false)} 
            variant="outline" 
            className="flex-1 text-sm sm:text-base"
          >
            {t('cancel')}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGoalDialog;

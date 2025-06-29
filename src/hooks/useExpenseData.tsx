
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ExpenseData } from '@/types/financial';

export const useExpenseData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [expenseData, setExpenseData] = useState<ExpenseData>({
    housing: 0,
    utilities: 0,
    food: 0,
    transportation: 0,
    education: 0,
    entertainment: 0,
    health: 0,
    savings: 0,
    total: 0
  });
  const [loading, setLoading] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  const loadExpenseData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('expense_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        const loadedData = {
          housing: Number(data.housing) || 0,
          utilities: Number(data.utilities) || 0,
          food: Number(data.food) || 0,
          transportation: Number(data.transportation) || 0,
          education: Number(data.education) || 0,
          entertainment: Number(data.entertainment) || 0,
          health: Number(data.health) || 0,
          savings: Number(data.savings) || 0,
          total: Number(data.total) || 0
        };
        setExpenseData(loadedData);
        setHasChanges(false);
      }
    } catch (error: any) {
      if (error.code !== 'PGRST116') {
        console.error('Error loading expense data:', error);
        toast({
          title: "خطأ",
          description: "فشل في تحميل بيانات المصروفات",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const saveExpenseData = async (data: ExpenseData, showToast: boolean = true) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('expense_entries')
        .upsert({
          user_id: user.id,
          housing: data.housing,
          utilities: data.utilities,
          food: data.food,
          transportation: data.transportation,
          education: data.education,
          entertainment: data.entertainment,
          health: data.health,
          savings: data.savings,
          total: data.total,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      setHasChanges(false);
      
      if (showToast) {
        toast({
          title: "تم الحفظ",
          description: "تم حفظ بيانات المصروفات بنجاح",
        });
      }
    } catch (error: any) {
      console.error('Error saving expense data:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ بيانات المصروفات",
        variant: "destructive",
      });
    }
  };

  // Debounced save function
  const debouncedSave = useCallback(
    (() => {
      let timeoutId: NodeJS.Timeout;
      return (data: ExpenseData) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          saveExpenseData(data, false); // Don't show toast for auto-save
        }, 2000); // Save after 2 seconds of inactivity
      };
    })(),
    [user]
  );

  const updateExpenseData = (newData: ExpenseData) => {
    setExpenseData(newData);
    setHasChanges(true);
    debouncedSave(newData);
  };

  const saveManually = () => {
    if (hasChanges) {
      saveExpenseData(expenseData, true);
    }
  };

  useEffect(() => {
    if (user) {
      loadExpenseData();
    }
  }, [user]);

  return {
    expenseData,
    updateExpenseData,
    saveManually,
    loading,
    hasChanges
  };
};

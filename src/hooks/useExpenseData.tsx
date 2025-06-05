
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ExpenseData {
  housing: number;
  utilities: number;
  food: number;
  transportation: number;
  education: number;
  entertainment: number;
  health: number;
  savings: number;
  total: number;
  [key: string]: number;
}

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
        .single();

      if (data) {
        setExpenseData({
          housing: Number(data.housing) || 0,
          utilities: Number(data.utilities) || 0,
          food: Number(data.food) || 0,
          transportation: Number(data.transportation) || 0,
          education: Number(data.education) || 0,
          entertainment: Number(data.entertainment) || 0,
          health: Number(data.health) || 0,
          savings: Number(data.savings) || 0,
          total: Number(data.total) || 0
        });
      }
    } catch (error: any) {
      if (error.code !== 'PGRST116') { // Ignore "no rows returned" error
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

  const saveExpenseData = async (data: ExpenseData) => {
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

      toast({
        title: "تم الحفظ",
        description: "تم حفظ بيانات المصروفات بنجاح",
      });
    } catch (error: any) {
      console.error('Error saving expense data:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ بيانات المصروفات",
        variant: "destructive",
      });
    }
  };

  const updateExpenseData = (newData: ExpenseData) => {
    setExpenseData(newData);
    saveExpenseData(newData);
  };

  useEffect(() => {
    if (user) {
      loadExpenseData();
    }
  }, [user]);

  return {
    expenseData,
    updateExpenseData,
    loading
  };
};

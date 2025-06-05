
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface IncomeData {
  basicSalary: number;
  freelance: number;
  rent: number;
  investments: number;
  other: number;
  total: number;
  [key: string]: number;
}

export const useIncomeData = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [incomeData, setIncomeData] = useState<IncomeData>({
    basicSalary: 0,
    freelance: 0,
    rent: 0,
    investments: 0,
    other: 0,
    total: 0
  });
  const [loading, setLoading] = useState(false);

  const loadIncomeData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('income_entries')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      if (data) {
        setIncomeData({
          basicSalary: Number(data.basic_salary) || 0,
          freelance: Number(data.freelance) || 0,
          rent: Number(data.rent) || 0,
          investments: Number(data.investments) || 0,
          other: Number(data.other) || 0,
          total: Number(data.total) || 0
        });
      }
    } catch (error: any) {
      console.error('Error loading income data:', error);
      toast({
        title: "خطأ",
        description: "فشل في تحميل بيانات الدخل",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveIncomeData = async (data: IncomeData) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('income_entries')
        .upsert({
          user_id: user.id,
          basic_salary: data.basicSalary,
          freelance: data.freelance,
          rent: data.rent,
          investments: data.investments,
          other: data.other,
          total: data.total,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;

      toast({
        title: "تم الحفظ",
        description: "تم حفظ بيانات الدخل بنجاح",
      });
    } catch (error: any) {
      console.error('Error saving income data:', error);
      toast({
        title: "خطأ",
        description: "فشل في حفظ بيانات الدخل",
        variant: "destructive",
      });
    }
  };

  const updateIncomeData = (newData: IncomeData) => {
    setIncomeData(newData);
    saveIncomeData(newData);
  };

  useEffect(() => {
    if (user) {
      loadIncomeData();
    }
  }, [user]);

  return {
    incomeData,
    updateIncomeData,
    loading
  };
};


import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        window.location.href = '/';
      }
    };
    checkUser();
  }, []);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      toast({
        title: "تم التسجيل بنجاح!",
        description: "تم إنشاء حسابك بنجاح. يمكنك الآن تسجيل الدخول.",
      });

      // Switch to login view
      setIsLogin(true);
      setEmail('');
      setPassword('');
      setFullName('');
    } catch (error: any) {
      toast({
        title: "خطأ في التسجيل",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        window.location.href = '/';
      }
    } catch (error: any) {
      toast({
        title: "خطأ في تسجيل الدخول",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب'}
          </CardTitle>
          <p className="text-gray-600 mt-2">
            {isLogin ? 'مرحباً بك مرة أخرى!' : 'انضم إلينا اليوم'}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={isLogin ? handleSignIn : handleSignUp} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">الاسم الكامل</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="h-12 text-right border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus-visible:ring-blue-500/20 transition-colors !ring-blue-500/20"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700">البريد الإلكتروني</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-12 text-right border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus-visible:ring-blue-500/20 transition-colors !ring-blue-500/20"
                placeholder="أدخل بريدك الإلكتروني"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">كلمة المرور</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="h-12 text-right border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus-visible:ring-blue-500/20 transition-colors !ring-blue-500/20"
                placeholder="أدخل كلمة المرور"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg transition-all duration-200 transform hover:scale-105"
            >
              {loading ? 'جاري المعالجة...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء حساب')}
            </Button>
          </form>

          <div className="text-center pt-4 border-t border-gray-200">
            <p className="text-gray-600">
              {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-blue-600 hover:text-blue-700 font-semibold mr-2 transition-colors"
              >
                {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;

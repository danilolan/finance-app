import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Separator } from '@/components/atoms/separator';
import { Card } from '@/components/molecules/card';
import { LoginForm } from '@/components/organisms/auth/LoginForm';
import { RegisterForm } from '@/components/organisms/auth/RegisterForm';
import { useAuthStore } from '@/lib/store/auth.store';
import type { LoginFormData, RegisterFormData } from '@/lib/types/auth';

export function AuthPage() {
  const navigate = useNavigate();
  const { login, register, isAuthenticated, isLoading, error, clearError } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }
  }, [error, clearError]);

  const handleLogin = async (data: LoginFormData) => {
    await login(data);
  };

  const handleRegister = async (data: RegisterFormData) => {
    await register(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-muted">
      <Card className="w-full max-w-6xl p-8 bg-white shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          </div>
          
          <div className="hidden lg:block">
            <Separator orientation="vertical" className="h-full" />
          </div>
          
          <div className="lg:hidden">
            <Separator className="w-full" />
          </div>
          
          <div className="flex-1">
            <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
          </div>
        </div>
      </Card>
    </div>
  );
}
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
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
          <div className="hidden md:block">
            <Separator orientation="vertical" className="h-full mx-auto" />
          </div>
          <div className="md:hidden">
            <Separator className="w-full" />
          </div>
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        </div>
      </Card>
    </div>
  );
}
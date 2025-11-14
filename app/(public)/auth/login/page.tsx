import AuthLayout from '@/components/molecules/auth/AuthLayout';
import LoginForm from '@/components/molecules/auth/LoginForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Expensave',
  description: 'Login to your Expensave account to track expenses and split bills with friends.',
};

export default function LoginPage() {
  return (
    <AuthLayout
      type="login"
      title="Welcome back"
      subtitle="Login to continue managing your expenses"
    >
      <LoginForm />
    </AuthLayout>
  );
}
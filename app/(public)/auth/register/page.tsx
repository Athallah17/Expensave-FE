import AuthLayout from '@/components/molecules/auth/AuthLayout';
import RegisterForm from '@/components/molecules/auth/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign Up - Expensave',
  description: 'Create your free Expensave account to start tracking expenses and splitting bills.',
};

export default function RegisterPage() {
  return (
    <AuthLayout
      type="register"
      title="Start saving together"
      subtitle="Create your free account in seconds"
    >
      <RegisterForm />
    </AuthLayout>
  );
}
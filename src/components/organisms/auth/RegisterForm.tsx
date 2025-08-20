import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import type { AuthFormProps, RegisterFormData } from "@/lib/types/auth";

export function RegisterForm({ onSubmit, isLoading }: AuthFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: RegisterFormData = {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          confirmPassword: formData.get("confirmPassword") as string,
        };
        onSubmit(data);
      }} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-name">Name</Label>
          <Input
            id="register-name"
            name="name"
            type="text"
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <Input
            id="register-email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <Input
            id="register-password"
            name="password"
            type="password"
            placeholder="Create a password"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-confirm-password">Confirm Password</Label>
          <Input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </div>
  );
}

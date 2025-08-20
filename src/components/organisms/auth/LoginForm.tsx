import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/input";
import { Label } from "@/components/atoms/label";
import type { AuthFormProps, LoginFormData } from "@/lib/types/auth";

export function LoginForm({ onSubmit, isLoading }: AuthFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: LoginFormData = {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        };
        onSubmit(data);
      }} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}

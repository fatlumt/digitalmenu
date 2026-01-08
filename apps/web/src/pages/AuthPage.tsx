import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2),
});

type LoginValues = z.infer<typeof loginSchema>;

type RegisterValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const schema = mode === "login" ? loginSchema : registerSchema;
  const { register, handleSubmit } = useForm<LoginValues | RegisterValues>({
    resolver: zodResolver(schema),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-2xl font-semibold">{mode === "login" ? "Welcome back" : "Create account"}</h1>
        <p className="mt-2 text-sm text-slate-400">Secure access to your restaurant dashboard.</p>
        <form
          className="mt-6 space-y-4"
          onSubmit={handleSubmit((values) => {
            console.log(values);
          })}
        >
          {mode === "register" && (
            <input
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
              placeholder="Name"
              {...register("name" as const)}
            />
          )}
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
            placeholder="Email"
            type="email"
            {...register("email")}
          />
          <input
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm"
            placeholder="Password"
            type="password"
            {...register("password")}
          />
          <button className="w-full rounded-lg bg-brand-600 py-3 text-sm font-medium" type="submit">
            {mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>
        <button
          className="mt-4 w-full text-sm text-slate-400"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Need an account? Register" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}

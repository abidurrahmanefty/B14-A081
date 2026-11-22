import { cn } from "@/lib/utils";

export function isPasswordValid(password: string): boolean {
  return (
    password.length >= 6 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password)
  );
}

export function PasswordRules({ password }: { password: string }) {
  const rules = [
    { label: "At least 6 characters", valid: password.length >= 6 },
    { label: "One uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "One lowercase letter", valid: /[a-z]/.test(password) },
  ];

  return (
    <ul className="space-y-1 text-sm">
      {rules.map((rule) => (
        <li
          key={rule.label}
          className={cn(
            rule.valid ? "text-emerald-700 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
          )}
        >
          {rule.valid ? "✓" : "•"} {rule.label}
        </li>
      ))}
    </ul>
  );
}

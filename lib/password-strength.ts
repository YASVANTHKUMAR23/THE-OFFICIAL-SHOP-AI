export interface StrengthResult {
  score: number; // 0 to 4
  label: 'Very Weak' | 'Weak' | 'Fair' | 'Good' | 'Strong';
  color: string;
  feedback: string[];
}

export function calculatePasswordStrength(password: string): StrengthResult {
  let score = 0;
  const feedback: string[] = [];

  if (!password) {
    return { score: 0, label: 'Very Weak', color: '#e5e7eb', feedback: [] };
  }

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Must be at least 8 characters long');
  }

  // Complexity checks
  const checks = [
    { regex: /[A-Z]/, message: 'Include an uppercase letter' },
    { regex: /[a-z]/, message: 'Include a lowercase letter' },
    { regex: /[0-9]/, message: 'Include a number' },
    { regex: /[^A-Za-z0-9]/, message: 'Include a special character' },
  ];

  let complexityScore = 0;
  checks.forEach((check) => {
    if (check.regex.test(password)) {
      complexityScore += 1;
    } else {
      feedback.push(check.message);
    }
  });

  // Calculate final score (0-4)
  // We want a score of 3+ to be considered "Good"
  if (password.length >= 8) {
    if (complexityScore >= 3) score = 3;
    if (complexityScore >= 4 && password.length >= 10) score = 4;
    if (complexityScore < 3) score = 2;
  } else {
    if (complexityScore >= 3) score = 1;
    else score = 0;
  }

  const results: Record<number, { label: StrengthResult['label']; color: string }> = {
    0: { label: 'Very Weak', color: '#ef4444' }, // Red
    1: { label: 'Weak', color: '#f97316' },      // Orange
    2: { label: 'Fair', color: '#eab308' },      // Yellow
    3: { label: 'Good', color: '#22c55e' },      // Green
    4: { label: 'Strong', color: '#10b981' },    // Emerald
  };

  return {
    score,
    ...results[score],
    feedback,
  };
}

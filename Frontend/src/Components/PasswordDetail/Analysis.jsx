import React, { useEffect, useState } from "react";

const Analysis = ({passwordData}) => {
  const [result, setResult] = useState(null);
  const { password, website, email, username }=passwordData;
  useEffect(() => {
    if (password) {
      setResult(analyze(password));
    } else {
      setResult(null);
    }
  }, [password]);

  function calculateEntropy(pw) {
    if (!pw) return 0;
    let pool = 0;
    if (/[a-z]/.test(pw)) pool += 26;
    if (/[A-Z]/.test(pw)) pool += 26;
    if (/[0-9]/.test(pw)) pool += 10;
    if (/[^A-Za-z0-9]/.test(pw)) pool += 32;
    pool = Math.max(pool, 1);
    return +(pw.length * Math.log2(pool)).toFixed(2);
  }

  function charsetInfo(pw) {
    return {
      length: pw?.length ?? 0,
      lower: (pw?.match(/[a-z]/g) || []).length,
      upper: (pw?.match(/[A-Z]/g) || []).length,
      digits: (pw?.match(/[0-9]/g) || []).length,
      symbols: (pw?.match(/[^A-Za-z0-9]/g) || []).length,
    };
  }

  function hasRepeatedSequences(pw) {
    return !!pw && (/(.)\1{2,}/.test(pw) || /(..+)\1{1,}/.test(pw));
  }

  function hasSequentialChars(pw) {
    if (!pw || pw.length < 3) return false;
    const s = pw.toLowerCase();
    const alph = "abcdefghijklmnopqrstuvwxyz";
    const nums = "0123456789";
    for (let i = 0; i <= s.length - 3; i++) {
      const sub = s.slice(i, i + 3);
      if (alph.includes(sub) || alph.split("").reverse().join("").includes(sub)) return true;
      if (nums.includes(sub) || nums.split("").reverse().join("").includes(sub)) return true;
    }
    return false;
  }

  function hasKeyboardPatterns(pw) {
    if (!pw) return false;
    const s = pw.toLowerCase();
    const rows = ["qwertyuiop", "asdfghjkl", "zxcvbnm", "1234567890", "!@#$%^&*()"];
    for (const row of rows) {
      for (let i = 0; i <= row.length - 3; i++) {
        const chunk = row.slice(i, i + 3);
        if (s.includes(chunk) || s.includes(chunk.split("").reverse().join(""))) return true;
      }
    }
    return false;
  }

  function looksLikeDate(pw) {
    if (!pw) return false;
    if (/\b(19|20)\d{2}\b/.test(pw)) return true;
    const datePatterns = [
      /\b\d{1,2}[./-]\d{1,2}[./-](\d{2}|\d{4})\b/,
      /\b\d{6,8}\b/,
    ];
    for (const pattern of datePatterns) {
      if (pattern.test(pw)) return true;
    }
    return false;
  }

  const isSimilar = (pw, str) => {
    if (!str) return false;
    const lowerPw = pw.toLowerCase();
    const lowerStr = str.toLowerCase();
    for (let i = 0; i < lowerStr.length - 2; i++) {
      const chunk = lowerStr.slice(i, i + 3);
      if (lowerPw.includes(chunk)) return true;
    }
    return false;
  };

  const commonPasswords = ["123456", "password", "123456789", "qwerty", "12345678", "111111", "1234567", "iloveyou", "password1", "123123", "admin", "letmein"];
  function isCommonPassword(pw) {
    if (!pw) return false;
    const low = pw.toLowerCase();
    return commonPasswords.some(c => low.includes(c));
  }

  function analyze(pw) {
    const ent = calculateEntropy(pw);
    const cs = charsetInfo(pw);
    const repeated = hasRepeatedSequences(pw);
    const sequential = hasSequentialChars(pw);
    const keyboard = hasKeyboardPatterns(pw);
    const datey = looksLikeDate(pw);
    const common = isCommonPassword(pw);

    const similarity = {
      website: isSimilar(pw, website),
      email: isSimilar(pw, email),
      username: isSimilar(pw, username),
    };

    let score = 0;
    score += Math.min(40, (pw?.length ?? 0) * 2);
    const variety = [cs.lower > 0, cs.upper > 0, cs.digits > 0, cs.symbols > 0].filter(Boolean).length;
    score += variety * 10;
    if (ent > 60) score += 10;
    else if (ent > 40) score += 5;

    // Penalties
    if (repeated) score -= 20;
    if (sequential) score -= 15;
    if (keyboard) score -= 15;
    if (datey) score -= 10;
    if (common) score -= 40;
    if (similarity.website) score -= 20;
    if (similarity.email) score -= 20;
    if (similarity.username) score -= 20;

    score = Math.max(0, Math.min(100, Math.round(score)));

    const feedback = [];
    if (!pw || pw.length < 8) feedback.push("Password is short: aim for 12+ chars.");
    else if (pw.length >= 8 && pw.length < 12) feedback.push("Consider making it longer or use a passphrase.");
    if (variety < 3) feedback.push("Increase character set variety.");
    if (repeated) feedback.push("Avoid long repeated chars or blocks.");
    if (sequential) feedback.push("Avoid obvious sequences like 'abc' or '123'.");
    if (keyboard) feedback.push("Avoid keyboard patterns.");
    if (datey) feedback.push("Don't use dates or personal info.");
    if (common) feedback.push("This password or substring is common.");
    if (similarity.website) feedback.push("Password is similar to the website name.");
    if (similarity.email) feedback.push("Password is similar to your email.");
    if (similarity.username) feedback.push("Password is similar to your username.");

    const positives = [];
    if (pw && pw.length >= 12) positives.push("Good length (12+)");
    if (variety >= 3) positives.push("Good character variety");
    if (ent > 50) positives.push("High entropy");
    if (!repeated && !sequential && !keyboard && !datey && !common && !similarity.website && !similarity.email && !similarity.username && pw)
      positives.push("No obvious patterns or common substrings");

    return { score, feedback, entropy: ent, charset: cs, repeated, sequential, keyboard, datey, common, similarity, positives };
  }

  const scoreColor = (s = 0) => {
    if (s >= 80) return "#22c55e";
    if (s >= 60) return "#f59e0b";
    return "#ef4444";
  };
  const CIRCUMFERENCE = 100;
  const getLabel = (score) => (score >= 80 ? "Strong" : score >= 60 ? "Moderate" : "Weak");

  // ---- JSX ----
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-gradient-to-br from-[#0f1724] to-[#0b1220] rounded-2xl shadow-2xl text-white border border-[#263044]">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Circular Score */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <div className="relative">
            <svg className="w-36 h-36 -rotate-90" viewBox="0 0 36 36" aria-hidden>
              <circle cx="18" cy="18" r="15.9155" stroke="#182232" strokeWidth="3.5" fill="none" />
              <circle
                cx="18"
                cy="18"
                r="15.9155"
                stroke={scoreColor(result?.score)}
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={result ? CIRCUMFERENCE - result.score : CIRCUMFERENCE}
                style={{ transition: "stroke-dashoffset 800ms cubic-bezier(.2,.9,.2,1), stroke 400ms" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-2xl font-extrabold">{result ? `${result.score}%` : "—"}</div>
              <div className="text-xs text-gray-300 mt-1">{result ? getLabel(result.score) : "No input"}</div>
            </div>
          </div>
        </div>

        {/* Progress, Feedback, Positives */}
        <div className="flex-1 space-y-4">
          <div className="space-y-3">
            {/* Linear progress */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="h-3 w-full bg-[#172233] rounded-full overflow-hidden">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${result?.score ?? 0}%`,
                      background: `linear-gradient(90deg, ${scoreColor(result?.score ?? 0)}, ${scoreColor(Math.min(100, (result?.score ?? 0) + 10))})`,
                      transition: "width 700ms ease",
                    }}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-300">Overall strength</div>
              </div>

              <div className="w-40 text-right">
                <div className="text-sm font-semibold">{result ? getLabel(result.score) : "—"}</div>
                <div className="text-xs text-gray-400">{result ? `${result.entropy.toFixed(2)} bits entropy` : ""}</div>
              </div>
            </div>

            {/* Charset summary */}
            <div className="flex gap-3 text-xs text-gray-300 flex-wrap">
              {["length", "lower", "upper", "digits", "symbols"].map((k) => (
                <div key={k} className="px-3 py-1 bg-[#0b1522] rounded-md border border-[#1f2a3a]">
                  {k} <span className="font-semibold ml-1 text-white">{result?.charset?.[k] ?? 0}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback & Positives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Feedback */}
            <div className="bg-[#071024]/80 p-4 rounded-lg border border-[#173047]">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Feedback & Suggestions</h4>
                <div className="text-sm text-gray-400">{result ? `${(result?.feedback?.length ?? 0)} issue(s)` : ""}</div>
              </div>
              {result && result.feedback.length ? (
                <ul className="mt-3 space-y-2 text-sm text-gray-200">
                  {result.feedback.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-0.5 text-yellow-400">⚠️</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-3 text-sm text-green-300">No major warnings — good job!</div>
              )}
            </div>

            {/* Positives */}
            <div className="bg-[#071024]/80 p-4 rounded-lg border border-[#173047]">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Positives</h4>
                <div className="text-sm text-gray-400">What you did well</div>
              </div>
              {result && result.positives.length ? (
                <ul className="mt-3 space-y-2 text-sm text-gray-200">
                  {result.positives.map((p, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="text-green-400">✅</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="mt-3 text-sm text-gray-400">No highlights yet — try longer passphrases and more character types.</div>
              )}
            </div>
          </div>

          {/* Pattern highlights */}
          <div className="flex flex-wrap gap-3 text-xs text-gray-300">
            {[
              { cond: "repeated", text: "Has repeated sequences" },
              { cond: "sequential", text: "Contains sequential chars" },
              { cond: "keyboard", text: "Keyboard patterns detected" },
              { cond: "datey", text: "Looks like a date" },
              { cond: "common", text: "Common substring" },
              { cond: "similarity.website", text: "Similar to website" },
              { cond: "similarity.email", text: "Similar to email" },
              { cond: "similarity.username", text: "Similar to username" },
            ].map(({ cond, text }) => {
              const keys = cond.split(".");
              let value = result;
              for (const k of keys) value = value?.[k];
              return (
                <div
                  key={cond}
                  className={`px-3 py-2 rounded-md border ${
                    value ? "border-red-500 text-red-300 bg-[#2b1414]/20" : "border-transparent bg-[#06202a]/30"
                  }`}
                >
                  {value ? text : `No ${text.toLowerCase()}`}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;

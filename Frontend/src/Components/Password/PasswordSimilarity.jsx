import React, { useEffect, useState } from "react";
import { get_A_Password_Service } from "../../Service/Password.service";

// --- Utility: detect similarity, prefix, and suffix ---
function analyzePasswordSimilarity(passwordData) {
  const results = [];
  const passwords = passwordData.map(p => p.password);
  const threshold = 0.75; // 75% similarity considered high

  const similarity = (a, b) => {
    if (!a || !b) return 0;
    let matches = 0;
    const minLen = Math.min(a.length, b.length);
    for (let i = 0; i < minLen; i++) {
      if (a[i] === b[i]) matches++;
    }
    return matches / Math.max(a.length, b.length);
  };

  const prefixMatch = (a, b) => {
    if (!a || !b) return false;
    const minLen = Math.min(a.length, b.length);
    for (let i = 0; i < minLen; i++) {
      if (a[i] !== b[i]) return i >= 3; // prefix length ≥ 3 is meaningful
    }
    return minLen >= 3;
  };

  const suffixMatch = (a, b) => {
    if (!a || !b) return false;
    const minLen = Math.min(a.length, b.length);
    for (let i = 1; i <= minLen; i++) {
      if (a[a.length - i] !== b[b.length - i]) return i > 3;
    }
    return minLen > 3;
  };

  for (let i = 0; i < passwords.length; i++) {
    for (let j = i + 1; j < passwords.length; j++) {
      const a = passwords[i]?.toLowerCase() || "";
      const b = passwords[j]?.toLowerCase() || "";

      const sim = similarity(a, b);
      const prefix = prefixMatch(a, b);
      const suffix = suffixMatch(a, b);

      if (sim > threshold || prefix || suffix) {
        results.push({
          p1: passwordData[i].site,
          p2: passwordData[j].site,
          issues: [
            sim > threshold && "High overall similarity",
            prefix && "Common prefix",
            suffix && "Common suffix"
          ].filter(Boolean)
        });
      }
    }
  }

  return results;
}

// --- Main Component ---
const PasswordSimilarityChecker = ({ allPasswordEntries, publicKey, privateKey }) => {
  const [similarities, setSimilarities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchAndAnalyze = async () => {
      try {
        const decryptedPasswords = [];

        for (const entry of allPasswordEntries) {
          const decrypted = await get_A_Password_Service(entry._id, publicKey, privateKey);
          if (decrypted?.password) {
            decryptedPasswords.push({
              site: entry.websiteName || entry.websiteURL || "Unknown site",
              password: decrypted.password
            });
          }
        }

        const results = analyzePasswordSimilarity(decryptedPasswords);
        setSimilarities(results);
      } catch (error) {
        console.error("Error analyzing password similarity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndAnalyze();
  }, [allPasswordEntries, publicKey, privateKey]);

  if (loading) return null;

  return (
    <div className="mt-6 mx-4 p-4 bg-[#1B1F3B] text-gray-300 border border-[#4D869C] rounded-lg shadow-lg">
      {similarities.length > 0 ? (
        <>
          <p className="text-yellow-400 text-lg font-semibold mb-2">
            ⚠️ {similarities.length} password pairs show high similarity.
          </p>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-[#81c3d7] underline hover:text-[#aee2f0]"
          >
            {showDetails ? "Hide details" : "Click to view details"}
          </button>

          {showDetails && (
            <div className="mt-3 space-y-2">
              {similarities.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#4D869C] rounded-md p-3 bg-[#23304a]"
                >
                  <p className="font-semibold">
                    {item.p1} ↔ {item.p2}
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-400">
                    {item.issues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="text-green-400 font-medium">✅ All passwords appear unique.</p>
      )}
    </div>
  );
};

export default PasswordSimilarityChecker;

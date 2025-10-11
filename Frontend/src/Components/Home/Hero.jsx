import React from 'react';
import { FaShieldAlt } from "react-icons/fa"; 

function Hero() {
    return (
        <>
            <div className="flex flex-col items-center justify-center flex-grow px-6 text-center pt-10 mt-36">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white animate-fadeIn">
                    Secure & Manage Your <span className="text-[#81c3d7]">Passwords</span>
                </h1>
                <p className="text-base sm:text-lg mt-4 max-w-xl text-gray-200 animate-fadeIn">
                    Keep all your credentials safe with <span className="font-bold">CipherPass</span>'s encrypted storage.
                </p>
                <FaShieldAlt className="my-10 sm:my-16 text-6xl sm:text-8xl text-[#81c3d7] animate-bounce transition-all duration-300 transform hover:scale-110" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 my-10 sm:my-20 mb-8 sm:mb-8 px-6 sm:px-12">
  {/* Left - Image */}
  <img
    src="/passimage.png"
    alt="Security Illustration"
    className="w-[80%] sm:w-[60%] md:w-[400px] lg:w-[500px] h-auto rounded-lg shadow-lg mt-8 md:mt-0"
  />

  {/* Right - Text */}
  <div className="text-gray-300 max-w-3xl sm:max-w-4xl text-lg sm:text-xl text-left">
    <h2 className="text-3xl sm:text-4xl font-bold text-[#81c3d7] pb-4">
      Why is CipherPass Secure?
    </h2>

    <p className="mt-2">
      CipherPass encrypts your passwords using{" "}
      <span className="font-bold">RSA (Rivest-Shamir-Adleman)</span>, an
      industry-standard encryption algorithm. Your credentials are stored
      securely using{" "}
      <span className="font-bold">asymmetric encryption</span>, ensuring that
      only you have access to your private keys.
    </p>

    <p className="mt-2">
      You can also generate and manage your own{" "}
      <span className="font-bold">client-side RSA key pairs</span> to enhance
      security and maintain complete control over your data.
    </p>

    <p className="mt-4">
      To further strengthen protection, both{" "}
      <span className="font-bold text-[#9cd6e3]">client</span> and{" "}
      <span className="font-bold text-[#9cd6e3]">server</span> RSA key pairs are
      refreshed dynamically every{" "}
      <span className="font-bold">10–20 minutes</span>. This means your encrypted
      data is always protected with newly generated keys — minimizing exposure
      and ensuring high-level cryptographic security even if one key is
      compromised.
    </p>

    <p className="mt-4">
      CipherPass also provides an{" "}
      <span className="font-bold text-[#9cd6e3]">
        intelligent password analysis system
      </span>{" "}
      that evaluates the strength and entropy of your passwords in real-time.
      You’ll receive detailed insights into password safety, complexity, and
      suggestions to make your accounts even more secure.
    </p>

    <p className="mt-4 italic text-gray-400">
      Your privacy, encryption integrity, and peace of mind — all in one place.
    </p>
  </div>
</div>
        

            </div>
        </>
    )
}

export default Hero;

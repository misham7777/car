import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — CarVault",
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 lg:px-8 py-12">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 lg:p-10 shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-6">
          Privacy Policy
        </h1>
        
        <p className="text-neutral-400 mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>

        <div className="prose prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-xl font-semibold text-white mb-3">1. Information We Collect</h2>
            <p className="text-neutral-300 leading-relaxed">
              We collect information you provide directly to us, such as when you fill out our car valuation form. 
              This includes your name, email address, phone number, city/emirate, and preferred payment method.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. How We Use Your Information</h2>
            <p className="text-neutral-300 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-3">
              <li>Contact you regarding your car valuation request</li>
              <li>Schedule inspections and arrange meetings</li>
              <li>Process transactions and payments</li>
              <li>Comply with UAE regulatory requirements (AML/CFT)</li>
              <li>Improve our services and customer experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Information Sharing</h2>
            <p className="text-neutral-300 leading-relaxed">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
              except as described in this policy or as required by UAE law. We may share information with:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-3">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by UAE regulations</li>
              <li>Business partners for transaction processing</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Data Security</h2>
            <p className="text-neutral-300 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Data Retention</h2>
            <p className="text-neutral-300 leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply with 
              UAE regulatory requirements. You may request deletion of your data at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Your Rights</h2>
            <p className="text-neutral-300 leading-relaxed">
              Under UAE law, you have the right to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-3">
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. Cookies and Tracking</h2>
            <p className="text-neutral-300 leading-relaxed">
              Our website may use cookies and similar technologies to enhance your experience. 
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Contact Us</h2>
            <p className="text-neutral-300 leading-relaxed">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-neutral-800 rounded-lg">
              <p className="text-neutral-300">
                <strong>CarVault UAE</strong><br />
                Email: privacy@carvault.ae<br />
                Phone: +971 XX XXX XXXX
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Changes to This Policy</h2>
            <p className="text-neutral-300 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-800">
          <Link 
            href="/" 
            className="inline-flex items-center text-taillight-red hover:text-taillight-red/80 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

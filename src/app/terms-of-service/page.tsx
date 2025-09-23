import Link from "next/link";

export const metadata = {
  title: "Terms of Service — CarVault",
  robots: { index: true, follow: true },
};

export default function TermsOfServicePage() {
  return (
    <main className="mx-auto max-w-4xl px-4 lg:px-8 py-12">
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 lg:p-10 shadow-lg">
        <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-white mb-6">
          Terms of Service
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
            <h2 className="text-xl font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-neutral-300 leading-relaxed">
              By accessing and using CarVault&apos;s services, you accept and agree to be bound by the terms and 
              provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">2. Description of Service</h2>
            <p className="text-neutral-300 leading-relaxed">
              CarVault provides car valuation and direct purchase services in the United Arab Emirates. 
              Our services include:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-3">
              <li>Free car valuation assessments</li>
              <li>Direct car purchase services</li>
              <li>Same-day payment processing</li>
              <li>Vehicle inspection and documentation</li>
              <li>Regulatory compliance assistance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">3. Eligibility</h2>
            <p className="text-neutral-300 leading-relaxed">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-3">
              <li>Be at least 18 years old</li>
              <li>Be legally authorized to sell the vehicle</li>
              <li>Provide accurate and complete information</li>
              <li>Comply with all UAE laws and regulations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">4. Vehicle Requirements</h2>
            <p className="text-neutral-300 leading-relaxed">
              We reserve the right to refuse service for vehicles that:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-3">
              <li>Have outstanding finance or liens</li>
              <li>Are stolen or involved in criminal activity</li>
              <li>Have significant undisclosed damage</li>
              <li>Do not meet UAE roadworthiness standards</li>
              <li>Have invalid or fraudulent documentation</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">5. Valuation and Pricing</h2>
            <p className="text-neutral-300 leading-relaxed">
              All valuations are estimates based on market conditions and vehicle condition. Final prices are subject to:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-3">
              <li>Physical inspection of the vehicle</li>
              <li>Verification of ownership and documentation</li>
              <li>Current market conditions at time of sale</li>
              <li>Any undisclosed damage or modifications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">6. Payment Terms</h2>
            <p className="text-neutral-300 leading-relaxed">
              Payment will be processed upon completion of:
            </p>
            <ul className="list-disc list-inside text-neutral-300 space-y-2 mt-3">
              <li>Vehicle inspection and verification</li>
              <li>Documentation and ownership transfer</li>
              <li>KYC verification (if required)</li>
              <li>Final price agreement</li>
            </ul>
            <p className="text-neutral-300 leading-relaxed mt-3">
              Digital payments may be subject to network fees and processing times.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">7. KYC and Compliance</h2>
            <p className="text-neutral-300 leading-relaxed">
              Under UAE Anti-Money Laundering and Counter-Terrorism Financing (AML/CFT) regulations, 
              we may require Know Your Customer (KYC) verification for certain transactions. 
              You agree to provide accurate identification and documentation when requested.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">8. Limitation of Liability</h2>
            <p className="text-neutral-300 leading-relaxed">
              CarVault shall not be liable for any indirect, incidental, special, consequential, or punitive damages, 
              including without limitation, loss of profits, data, use, goodwill, or other intangible losses, 
              resulting from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">9. Privacy and Data Protection</h2>
            <p className="text-neutral-300 leading-relaxed">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, 
              to understand our practices regarding the collection and use of your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">10. Governing Law</h2>
            <p className="text-neutral-300 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. 
              Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the UAE courts.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">11. Modifications</h2>
            <p className="text-neutral-300 leading-relaxed">
              We reserve the right to modify these terms at any time. We will notify users of any material changes 
              by posting the updated terms on our website. Continued use of our services constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-3">12. Contact Information</h2>
            <p className="text-neutral-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="mt-3 p-4 bg-neutral-800 rounded-lg">
              <p className="text-neutral-300">
                <strong>CarVault UAE</strong><br />
                Email: legal@carvault.ae<br />
                Phone: +971 XX XXX XXXX<br />
                Address: [Business Address, UAE]
              </p>
            </div>
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

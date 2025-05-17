import { FileText } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-2">
          <FileText className="size-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p className="lead">
            Last updated: 5/16/2025
          </p>

          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using MCRC&apos;s services, you agree to be bound by these Terms of Service
            and all applicable laws and regulations. If you do not agree with any of these terms,
            you are prohibited from using or accessing our services.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily access our services for personal, non-commercial
            transitory viewing only. This is the grant of a license, not a transfer of title, and
            under this license you may not:
          </p>
          <ul>
            <li>Modify or copy the materials</li>
            <li>Use the materials for any commercial purpose</li>
            <li>Attempt to decompile or reverse engineer any software</li>
            <li>Remove any copyright or other proprietary notations</li>
            <li>Transfer the materials to another person</li>
          </ul>

          <h2>3. Service Description</h2>
          <p>MCRC provides the following services:</p>
          <ul>
            <li>Community mediation</li>
            <li>Restorative justice programs</li>
            <li>Training and education</li>
            <li>Volunteer opportunities</li>
            <li>Community outreach</li>
          </ul>

          <h2>4. User Responsibilities</h2>
          <p>As a user of our services, you agree to:</p>
          <ul>
            <li>Provide accurate and complete information</li>
            <li>Maintain the confidentiality of your account</li>
            <li>Notify us of any unauthorized use</li>
            <li>Comply with all applicable laws and regulations</li>
            <li>Respect the rights of other users</li>
          </ul>

          <h2>5. Confidentiality</h2>
          <p>
            All information shared during mediation sessions and other services is confidential,
            except where disclosure is required by law or with your explicit consent.
          </p>

          <h2>6. Limitation of Liability</h2>
          <p>
            MCRC shall not be liable for any indirect, incidental, special, consequential, or
            punitive damages resulting from your use of or inability to use our services.
          </p>

          <h2>7. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. We will notify users of any
            material changes by posting the new Terms of Service on this page.
          </p>

          <h2>8. Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the
            State of Maryland, without regard to its conflict of law provisions.
          </p>

          <h2>9. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at:
          </p>
            <a href="mailto:director@mcrchoward.org" className="text-orange-500 underline">Email: director@mcrchoward.org</a><br />
            <a href="tel:+14103139432" className="text-orange-500 underline" >Phone: (410) 313-9432</a><br />
            <a href="https://maps.app.goo.gl/1234567890" className="text-orange-500 underline">Address: 123 Main Street, Howard County, MD 21043</a>
        </div>
      </div>
    </div>
  )
} 
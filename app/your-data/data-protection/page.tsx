import { Lock } from "lucide-react"

export default function DataProtectionPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-2">
          <Lock className="size-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Data Protection</h1>
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>1. Our Commitment to Data Protection</h2>
          <p>
            At MCRC, we are committed to protecting your personal data and ensuring its security.
            We implement robust technical and organizational measures to safeguard your information
            against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>2. Security Measures</h2>
          <h3>2.1 Technical Security</h3>
          <p>We employ various technical measures to protect your data:</p>
          <ul>
            <li>Encryption of data in transit and at rest</li>
            <li>Secure servers with regular security updates</li>
            <li>Firewall protection</li>
            <li>Regular security audits and penetration testing</li>
            <li>Access controls and authentication mechanisms</li>
          </ul>

          <h3>2.2 Organizational Security</h3>
          <p>Our organizational measures include:</p>
          <ul>
            <li>Staff training on data protection</li>
            <li>Strict access controls and authorization procedures</li>
            <li>Regular review of security policies</li>
            <li>Incident response procedures</li>
            <li>Data protection impact assessments</li>
          </ul>

          <h2>3. Data Storage and Processing</h2>
          <p>
            Your data is stored and processed in secure facilities that meet industry standards
            for physical and environmental security. We use trusted service providers who are
            bound by strict confidentiality agreements.
          </p>

          <h2>4. Data Retention</h2>
          <p>
            We retain your personal data only for as long as necessary to fulfill the purposes
            for which it was collected, including legal, accounting, or reporting requirements.
            When data is no longer needed, it is securely deleted or anonymized.
          </p>

          <h2>5. Your Role in Data Protection</h2>
          <p>You can help protect your data by:</p>
          <ul>
            <li>Using strong, unique passwords</li>
            <li>Keeping your login credentials secure</li>
            <li>Not sharing your account information</li>
            <li>Logging out after each session</li>
            <li>Reporting any security concerns immediately</li>
          </ul>

          <h2>6. Incident Response</h2>
          <p>
            In the event of a data breach or security incident, we have procedures in place to:
          </p>
          <ul>
            <li>Quickly identify and contain the incident</li>
            <li>Assess the impact and risk</li>
            <li>Notify affected individuals and authorities as required</li>
            <li>Implement measures to prevent future incidents</li>
            <li>Document and learn from the incident</li>
          </ul>

          <h2>7. Contact Us</h2>
          <p>
            If you have any questions about our data protection measures or want to report a
            security concern, please contact our Data Protection Officer at:
          </p>
          <p>
            <a href="mailto:director@mcrchoward.org" className="text-orange-500 underline">Email: director@mcrchoward.org</a><br />
            <a href="tel:+14103139432" className="text-orange-500 underline" >Phone: (410) 313-9432</a><br />
            <a href="https://maps.app.goo.gl/1234567890" className="text-orange-500 underline">Address: 123 Main Street, Howard County, MD 21043</a>
          </p>
        </div>
      </div>
    </div >
  )
}
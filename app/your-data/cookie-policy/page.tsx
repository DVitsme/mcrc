import { Eye } from "lucide-react"

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 flex items-center gap-2">
          <Eye className="size-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
        </div>

        <div className="prose prose-gray max-w-none dark:prose-invert">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>1. What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when
            you visit our website. They help us make your visit to our site better and provide
            essential functionality.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul>
            <li>Essential cookies for website functionality</li>
            <li>Authentication and security</li>
            <li>Remembering your preferences</li>
            <li>Analyzing how you use our website</li>
            <li>Improving our services</li>
          </ul>

          <h2>3. Types of Cookies We Use</h2>
          <h3>3.1 Essential Cookies</h3>
          <p>
            These cookies are necessary for the website to function properly. They enable basic
            functions like page navigation and access to secure areas of the website.
          </p>

          <h3>3.2 Preference Cookies</h3>
          <p>
            These cookies enable our website to remember information that changes the way the
            website behaves or looks, like your preferred language or region.
          </p>

          <h3>3.3 Analytics Cookies</h3>
          <p>
            We use analytics cookies to understand how visitors interact with our website. This
            helps us improve our services and user experience.
          </p>

          <h2>4. Third-Party Cookies</h2>
          <p>
            Some cookies are placed by third-party services that appear on our pages. We use
            these services to:
          </p>
          <ul>
            <li>Analyze website usage</li>
            <li>Provide social media features</li>
            <li>Process payments</li>
            <li>Deliver relevant advertisements</li>
          </ul>

          <h2>5. Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that
            are already on your computer and you can set most browsers to prevent them from
            being placed. However, if you do this, you may have to manually adjust some
            preferences every time you visit our website.
          </p>

          <h2>6. Cookie Settings</h2>
          <p>
            You can manage your cookie preferences through your browser settings. Here&apos;s how
            to access cookie settings in popular browsers:
          </p>
          <ul>
            <li>Google Chrome: Settings → Privacy and security → Cookies and other site data</li>
            <li>Mozilla Firefox: Options → Privacy & Security → Cookies and Site Data</li>
            <li>Safari: Preferences → Privacy → Cookies and website data</li>
            <li>Microsoft Edge: Settings → Cookies and site permissions → Cookies</li>
          </ul>

          <h2>7. Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. We will notify you of any
            changes by posting the new Cookie Policy on this page and updating the
            &quot;Last updated&quot; date.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us at:
          </p>
          <a href="mailto:director@mcrchoward.org" className="text-orange-500 underline">Email: director@mcrchoward.org</a><br />
          <a href="tel:+14103139432" className="text-orange-500 underline" >Phone: (410) 313-9432</a><br />
          <a href="https://maps.app.goo.gl/1234567890" className="text-orange-500 underline">Address: 123 Main Street, Howard County, MD 21043</a>
        </div>
      </div>
    </div >
  )
} 
import ContactForm from './ContactForm';

export const metadata = {
  title: 'Contact',
  description: 'Professional inquiries and partnerships.',
  alternates: { canonical: 'https://placebets.ai/contact' },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen w-full bg-[#020617] py-16 px-4">
      <div className="max-w-xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact</h1>
          <p className="text-slate-400 text-sm">
            Partnerships, press, bug reports. No picks.
          </p>
        </div>

        <ContactForm />

        <div className="mt-10 pt-6 border-t border-slate-800 text-sm text-slate-500">
          Direct email:{' '}
          <a
            href="mailto:info@placebets.ai"
            className="text-emerald-400 hover:text-emerald-300"
          >
            info@placebets.ai
          </a>
        </div>
      </div>
    </main>
  );
}

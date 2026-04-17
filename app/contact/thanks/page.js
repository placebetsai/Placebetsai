export const metadata = {
  title: 'Message Sent — PlaceBets.ai',
  description: 'Your message was received.',
  alternates: { canonical: 'https://placebets.ai/contact/thanks' },
};

export default function ContactThanksPage() {
  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl blur opacity-30"></div>
        <div className="relative bg-slate-950 border border-slate-800 rounded-xl p-8 shadow-2xl text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 mb-6">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">Message Sent</h1>
          <p className="text-slate-400 mb-6">
            We received your message and will get back to you shortly.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Send another message
          </a>
        </div>
      </div>
    </div>
  );
}

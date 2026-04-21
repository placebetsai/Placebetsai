export default function ContactForm() {
  return (
    <form
      action="https://formsubmit.co/info@placebets.ai"
      method="POST"
      className="space-y-5"
    >
      <input type="hidden" name="_captcha" value="false" />
      <input type="hidden" name="_next" value="https://placebets.ai/contact/thanks" />
      <input type="hidden" name="_subject" value="PlaceBets.ai Contact Form" />
      <input type="hidden" name="_template" value="table" />
      <input type="text" name="_honey" style={{ display: 'none' }} />

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1.5">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="Your name"
          autoComplete="name"
          className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1.5">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          placeholder="you@example.com"
          autoComplete="email"
          className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors"
        />
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-1.5">
          Subject
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue=""
          className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors appearance-none"
        >
          <option value="" disabled>Select a topic</option>
          <option value="General Inquiry">General Inquiry</option>
          <option value="Partnership">Partnership</option>
          <option value="Bug Report">Bug Report</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-1.5">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="What can we help you with?"
          autoComplete="on"
          className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors resize-vertical"
        />
      </div>

      <button
        type="submit"
        className="w-full px-6 py-3.5 text-base font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-600 transition-all duration-200"
      >
        Send Message
      </button>
    </form>
  );
}

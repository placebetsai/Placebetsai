import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Contact Us | IHateCollege.com"
        description="Got a story, idea, or want to vent about tuition? Reach us directly."
      />

      <section style={{ maxWidth: 600, margin: "0 auto", padding: "80px 20px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px,5vw,48px)", fontWeight: 900, marginBottom: 16 }}>
          Get In Touch
        </h1>
        <p style={{ color: "#888", fontSize: 17, lineHeight: 1.7, marginBottom: 40 }}>
          Got a story, a tip, or just want to vent about tuition?<br />
          Click below to send us an email — we read everything.
        </p>

        <a
          href="mailto:info@ihatecollege.com"
          style={{
            display: "inline-block",
            padding: "16px 36px",
            background: "#ff2020",
            color: "#fff",
            fontWeight: 900,
            fontSize: 17,
            borderRadius: 10,
            textDecoration: "none",
          }}
        >
          Email Us Here
        </a>

        <p style={{ color: "#555", fontSize: 13, marginTop: 24 }}>
          info@ihatecollege.com
        </p>
      </section>
    </Layout>
  );
}

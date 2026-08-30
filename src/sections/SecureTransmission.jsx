import { motion } from "framer-motion";
import ContactCard from "../components/contact/ContactCard";
import TransmissionForm from "../components/contact/TransmissionForm";

function SecureTransmission({ compact = false }) {
  return (
    <section id="secure-transmission" className={`section-shell transmission-bg px-5 md:px-10 ${compact ? "py-14" : "py-20"}`}>
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.4em] text-cyan-400">Secure Transmission</p>
          <h2 className="text-4xl font-black text-white md:text-6xl">Open A Hiring Channel</h2>
          <p className="mt-4 max-w-2xl text-slate-400">
            Direct channels for interviews, internship opportunities, collaboration, and project review.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-lg border border-green-500/20 bg-green-500/5 p-5">
              <p className="mb-4 text-xs uppercase tracking-[0.3em] text-green-300">Transmission Status</p>
              {[
                ["Encryption", "ACTIVE"],
                ["Response Time", "< 24 HOURS"],
                ["Availability", "OPEN"],
                ["Priority", "HIGH"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-white/5 py-3 last:border-0">
                  <span className="text-slate-400">{label}</span>
                  <span className="font-semibold text-cyan-200">{value}</span>
                </div>
              ))}
            </motion.div>

            <ContactCard label="Email Channel" value="chavanom020104@gmail.com" link="mailto:chavanom020104@gmail.com" />
            <ContactCard label="LinkedIn Channel" value="linkedin.com/in/omchavan02" link="https://linkedin.com/in/omchavan02" />
            <ContactCard label="GitHub Repository" value="github.com/Omchavan02" link="https://github.com/Omchavan02" />
            <ContactCard label="Location Node" value="Mumbai, Maharashtra, India" link="https://maps.google.com" />
          </div>

          <TransmissionForm />
        </div>
      </div>
    </section>
  );
}

export default SecureTransmission;

import { useState } from "react";
import emailjs from "@emailjs/browser";

function TransmissionForm() {
  const [formData, setFormData] = useState({
    from_name: "",
    from_email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendTransmission = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus("success");

      setFormData({
        from_name: "",
        from_email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      if (import.meta.env.DEV) console.error(error);
      setStatus("error");
    }

    setLoading(false);
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-cyan-500/20
        bg-slate-950/70
        p-8
      "
    >
      <h3 className="mb-2 text-2xl font-bold text-white">
        Transmission Panel
      </h3>

      <p className="mb-6 text-cyan-400">
        Establish secure communication channel.
      </p>

      <form
        onSubmit={sendTransmission}
        className="space-y-5"
      >
        <input
          type="text"
          name="from_name"
          value={formData.from_name}
          onChange={handleChange}
          placeholder="Operator Name"
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            p-4
            text-white
            outline-none
            focus:border-cyan-400
          "
        />

        <input
          type="email"
          name="from_email"
          value={formData.from_email}
          onChange={handleChange}
          placeholder="Operator Email"
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            p-4
            text-white
            outline-none
            focus:border-cyan-400
          "
        />

        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="Transmission Subject"
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            p-4
            text-white
            outline-none
            focus:border-cyan-400
          "
        />

        <textarea
          rows="6"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter secure message..."
          required
          className="
            w-full
            rounded-xl
            border
            border-slate-800
            bg-slate-900
            p-4
            text-white
            outline-none
            focus:border-cyan-400
          "
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full
            rounded-xl
            border
            border-cyan-500/40
            bg-cyan-500/10
            px-6
            py-4
            font-semibold
            text-cyan-400
            transition-all
            duration-300
            hover:bg-cyan-500/20
          "
        >
          {loading
            ? "ESTABLISHING SECURE CHANNEL..."
            : "INITIATE TRANSMISSION"}
        </button>

        {status === "success" && (
          <div
            className="
              rounded-xl
              border
              border-green-500/30
              bg-green-500/10
              p-4
              text-green-400
            "
          >
            TRANSMISSION SUCCESSFUL
          </div>
        )}

        {status === "error" && (
          <div
            className="
              rounded-xl
              border
              border-red-500/30
              bg-red-500/10
              p-4
              text-red-400
            "
          >
            TRANSMISSION FAILED
          </div>
        )}
      </form>
    </div>
  );
}

export default TransmissionForm;

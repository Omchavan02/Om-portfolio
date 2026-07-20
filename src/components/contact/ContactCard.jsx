function ContactCard({
  label,
  value,
  link,
}) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="
        block
        rounded-2xl
        border
        border-cyan-500/20
        bg-slate-950/70
        p-5
        transition-all
        duration-300
        hover:border-cyan-400
        hover:shadow-[0_0_30px_rgba(0,229,255,0.15)]
      "
    >
      <div className="flex items-center justify-between">

        <div>
          <p className="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-400">
            {label}
          </p>

          <p className="break-all text-white">
            {value}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />

          <span className="text-xs text-green-400">
            ONLINE
          </span>
        </div>

      </div>
    </a>
  );
}

export default ContactCard;
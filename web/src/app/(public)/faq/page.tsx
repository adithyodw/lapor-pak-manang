const faqs = [
  {
    qId: "Apa itu LAPOR PAK MANANG?",
    qEn: "What is LAPOR PAK MANANG?",
    aId: "LAPOR PAK MANANG adalah platform resmi untuk menyampaikan laporan dan pengaduan terkait tindak pidana, penyimpangan, dan masalah sosial kepada Kombes Manang Soebeti.",
    aEn: "LAPOR PAK MANANG is an official platform for submitting crime reports, misconduct alerts, and social issue complaints directly to Commissioner Manang Soebeti.",
  },
  {
    qId: "Apakah identitas saya dijaga?",
    qEn: "Is my identity protected?",
    aId: "Identitas dan data pribadi Anda dilindungi sesuai standar keamanan dan privasi. Informasi hanya digunakan untuk keperluan penanganan kasus.",
    aEn: "Your identity and personal data are protected according to strict security and privacy standards, and used only for case handling purposes.",
  },
];

export default function FaqPage() {
  return (
    <div className="gov-section">
      <div className="gov-container space-y-8">
        <header className="space-y-2">
          <h1 className="gov-heading-xl">
            Pertanyaan yang Sering Diajukan
            <span className="mt-2 block text-base font-normal text-slate-600">
              Frequently Asked Questions
            </span>
          </h1>
          <p className="gov-body max-w-2xl">
            Baca panduan singkat berikut sebelum mengirim laporan untuk
            memastikan informasi yang Anda sampaikan akurat dan dapat segera
            ditindaklanjuti.
          </p>
        </header>
        <div className="space-y-4">
          {faqs.map((item) => (
            <div key={item.qId} className="gov-card px-6 py-5">
              <h2 className="text-sm font-semibold text-slate-900">
                {item.qId}
                <span className="block text-xs font-normal text-slate-500">
                  {item.qEn}
                </span>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {item.aId}
              </p>
              <p className="mt-1 text-xs text-slate-500">{item.aEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


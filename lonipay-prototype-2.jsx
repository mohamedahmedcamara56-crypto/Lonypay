import { useState, useEffect } from "react";

const GNF = (n) => new Intl.NumberFormat("fr-GN").format(n) + " GNF";

const mockTransactions = [
  { id: 1, parent: "Aissatou Diallo", eleve: "Mamadou Diallo", montant: 450000, classe: "CM2", statut: "payé", heure: "08:32", methode: "Orange Money" },
  { id: 2, parent: "Fatoumata Bah", eleve: "Ibrahim Bah", montant: 380000, classe: "6ème", statut: "payé", heure: "09:15", methode: "MTN Money" },
  { id: 3, parent: "Mariama Camara", eleve: "Oumar Camara", montant: 520000, classe: "3ème", statut: "en attente", heure: "10:02", methode: "Orange Money" },
  { id: 4, parent: "Kadiatou Kouyaté", eleve: "Sekou Kouyaté", montant: 450000, classe: "CM1", statut: "payé", heure: "10:45", methode: "MTN Money" },
  { id: 5, parent: "Aminata Soumah", eleve: "Djénabou Soumah", montant: 380000, classe: "CE2", statut: "payé", heure: "11:20", methode: "Orange Money" },
];

const mockEnseignants = [
  { id: 1, nom: "M. Kofi Mensah", matiere: "Mathématiques", salaire: 1200000, statut: "payé", date: "28 Fév 2026" },
  { id: 2, nom: "Mme. Hawa Traoré", matiere: "Français", salaire: 1100000, statut: "payé", date: "28 Fév 2026" },
  { id: 3, nom: "M. Alpha Barry", matiere: "Sciences", salaire: 1050000, statut: "en attente", date: "—" },
  { id: 4, nom: "Mme. Oumou Sylla", matiere: "Histoire-Géo", salaire: 980000, statut: "payé", date: "28 Fév 2026" },
  { id: 5, nom: "M. Lansana Kaba", matiere: "Anglais", salaire: 1000000, statut: "en attente", date: "—" },
];

const mockProduits = [
  { id: 1, nom: "Kit Scolaire Complet", prix: 85000, stock: 120, categorie: "Fournitures", emoji: "🎒" },
  { id: 2, nom: "Uniforme Garçon", prix: 65000, stock: 80, categorie: "Tenues", emoji: "👕" },
  { id: 3, nom: "Uniforme Fille", prix: 65000, stock: 75, categorie: "Tenues", emoji: "👗" },
  { id: 4, nom: "Manuel CM2 Maths", prix: 25000, stock: 200, categorie: "Livres", emoji: "📚" },
  { id: 5, nom: "Cahiers (pack x10)", prix: 18000, stock: 350, categorie: "Fournitures", emoji: "📓" },
  { id: 6, nom: "Calculatrice Scientifique", prix: 45000, stock: 60, categorie: "Matériel", emoji: "🔢" },
];

// ─── PARENT VIEW ────────────────────────────────────────────────────────────
function ParentView() {
  const [step, setStep] = useState("home"); // home | form | confirm | success
  const [methode, setMethode] = useState("orange");
  const [montant, setMontant] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [panier, setPanier] = useState([]);
  const [tab, setTab] = useState("paiement"); // paiement | marketplace | recu

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep("success"); }, 2200);
  };

  const addToCart = (p) => {
    setPanier(prev => {
      const ex = prev.find(x => x.id === p.id);
      if (ex) return prev.map(x => x.id === p.id ? { ...x, qty: x.qty + 1 } : x);
      return [...prev, { ...p, qty: 1 }];
    });
  };

  const totalPanier = panier.reduce((s, x) => s + x.prix * x.qty, 0);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh", background: "linear-gradient(160deg, #0f1923 0%, #1a2d1a 50%, #0f1923 100%)", color: "#fff", display: "flex", flexDirection: "column" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      {/* Header */}
      <div style={{ padding: "20px 24px 0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 800, background: "linear-gradient(135deg, #4ade80, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LoniPay</div>
          <div style={{ fontSize: 11, color: "#6b7280", marginTop: 2 }}>Bonjour, Aissatou 👋</div>
        </div>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(135deg, #4ade80, #22d3ee)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>👩</div>
      </div>

      {/* Solde Card */}
      <div style={{ margin: "20px 24px", borderRadius: 20, background: "linear-gradient(135deg, #16a34a, #0891b2)", padding: "24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.07)" }} />
        <div style={{ position: "absolute", bottom: -30, right: 30, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 4 }}>Enfant</div>
        <div style={{ fontSize: 16, fontWeight: 700 }}>Mamadou Diallo — CM2</div>
        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>École Primaire Ratoma Centre</div>
        <div style={{ marginTop: 16, padding: "10px 16px", background: "rgba(255,255,255,0.15)", borderRadius: 12, display: "inline-flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 12 }}>✅ Frais 2025-2026</span>
          <span style={{ fontSize: 12, fontWeight: 700, background: "#4ade80", color: "#000", padding: "2px 8px", borderRadius: 6 }}>PAYÉ</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", margin: "0 24px", background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 4, gap: 4 }}>
        {[["paiement","💳 Paiement"], ["marketplace","🛒 Boutique"], ["recu","🧾 Reçus"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{ flex: 1, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, background: tab === key ? "linear-gradient(135deg, #16a34a, #0891b2)" : "transparent", color: tab === key ? "#fff" : "#6b7280", transition: "all 0.2s" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
        
        {/* ─── PAIEMENT TAB ─── */}
        {tab === "paiement" && step === "home" && (
          <div>
            <div style={{ fontSize: 14, color: "#9ca3af", marginBottom: 16 }}>Payer les frais scolaires</div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 20, marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Frais annuels 2025-2026</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#4ade80" }}>450 000 GNF</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>École Primaire Ratoma Centre · CM2</div>
            </div>
            
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Choisir le moyen de paiement</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[["orange", "🟠", "Orange Money", "#ea580c"], ["mtn", "🟡", "MTN Money", "#ca8a04"]].map(([key, emoji, label, color]) => (
                <div key={key} onClick={() => setMethode(key)} style={{ padding: 16, borderRadius: 14, border: `2px solid ${methode === key ? color : "rgba(255,255,255,0.1)"}`, background: methode === key ? `${color}22` : "rgba(255,255,255,0.03)", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}>
                  <div style={{ fontSize: 24 }}>{emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>Numéro de téléphone</div>
              <input value={phone} onChange={e => setPhone(e.target.value)} placeholder={methode === "orange" ? "624 XX XX XX" : "621 XX XX XX"} style={{ width: "100%", padding: "14px 16px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.05)", color: "#fff", fontSize: 15, fontWeight: 600, boxSizing: "border-box", outline: "none" }} />
            </div>

            <button onClick={() => setStep("confirm")} style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", background: "linear-gradient(135deg, #16a34a, #0891b2)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Payer 450 000 GNF →
            </button>
          </div>
        )}

        {tab === "paiement" && step === "confirm" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 24 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>{methode === "orange" ? "🟠" : "🟡"}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Confirmer le paiement</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 20, marginBottom: 20 }}>
              {[["Bénéficiaire", "École Primaire Ratoma Centre"], ["Élève", "Mamadou Diallo · CM2"], ["Montant", "450 000 GNF"], ["Via", methode === "orange" ? "Orange Money" : "MTN Money"], ["Frais LoniPay (1.5%)", "6 750 GNF"]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <span style={{ color: "#9ca3af", fontSize: 13 }}>{k}</span>
                  <span style={{ fontWeight: 600, fontSize: 13 }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 12 }}>
                <span style={{ fontWeight: 700 }}>TOTAL</span>
                <span style={{ fontWeight: 800, color: "#4ade80", fontSize: 16 }}>456 750 GNF</span>
              </div>
            </div>
            <button onClick={handlePay} disabled={loading} style={{ width: "100%", padding: 16, borderRadius: 14, border: "none", background: loading ? "#374151" : "linear-gradient(135deg, #16a34a, #0891b2)", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              {loading ? "⏳ Traitement en cours..." : "✅ Confirmer le paiement"}
            </button>
            <button onClick={() => setStep("home")} style={{ width: "100%", padding: 12, borderRadius: 14, border: "none", background: "transparent", color: "#6b7280", fontSize: 14, cursor: "pointer", marginTop: 8 }}>Annuler</button>
          </div>
        )}

        {tab === "paiement" && step === "success" && (
          <div style={{ textAlign: "center", paddingTop: 20 }}>
            <div style={{ fontSize: 64, marginBottom: 16, animation: "bounce 0.5s" }}>✅</div>
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Paiement réussi !</div>
            <div style={{ color: "#9ca3af", fontSize: 14, marginBottom: 24 }}>Un reçu PDF a été envoyé sur WhatsApp</div>
            <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid #4ade80", borderRadius: 16, padding: 20, marginBottom: 24 }}>
              <div style={{ fontSize: 11, color: "#4ade80", marginBottom: 4 }}>N° TRANSACTION</div>
              <div style={{ fontSize: 13, fontFamily: "monospace", fontWeight: 700 }}>LNP-2026-{Math.random().toString(36).substr(2,8).toUpperCase()}</div>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#4ade80", marginTop: 12 }}>450 000 GNF</div>
              <div style={{ fontSize: 12, color: "#6b7280", marginTop: 4 }}>École Primaire Ratoma Centre</div>
            </div>
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
              <div style={{ fontSize: 12, color: "#9ca3af", marginBottom: 8 }}>QR Code de validation</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: 3, width: 120, margin: "0 auto" }}>
                {Array(64).fill(0).map((_, i) => <div key={i} style={{ width: 12, height: 12, background: Math.random() > 0.5 ? "#4ade80" : "transparent", borderRadius: 1 }} />)}
              </div>
            </div>
            <button onClick={() => { setStep("home"); setTab("recu"); }} style={{ width: "100%", padding: 14, borderRadius: 14, border: "none", background: "linear-gradient(135deg, #16a34a, #0891b2)", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Voir mes reçus
            </button>
          </div>
        )}

        {/* ─── MARKETPLACE TAB ─── */}
        {tab === "marketplace" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: "#9ca3af" }}>Fournitures scolaires</div>
              {panier.length > 0 && (
                <div style={{ background: "#16a34a", borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>
                  🛒 {panier.reduce((s,x) => s+x.qty, 0)} articles
                </div>
              )}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {mockProduits.map(p => (
                <div key={p.id} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 14, border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{p.emoji}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{p.nom}</div>
                  <div style={{ fontSize: 11, color: "#6b7280", marginBottom: 10 }}>{p.categorie}</div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: "#4ade80", marginBottom: 10 }}>{GNF(p.prix)}</div>
                  <button onClick={() => addToCart(p)} style={{ width: "100%", padding: "8px 0", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #16a34a, #0891b2)", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                    + Ajouter
                  </button>
                </div>
              ))}
            </div>
            {panier.length > 0 && (
              <div style={{ position: "sticky", bottom: 0, marginTop: 20, background: "rgba(22,163,74,0.95)", borderRadius: 16, padding: 16, backdropFilter: "blur(10px)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 12 }}>{panier.reduce((s,x) => s+x.qty, 0)} article(s)</div>
                    <div style={{ fontSize: 18, fontWeight: 800 }}>{GNF(totalPanier)}</div>
                  </div>
                  <button style={{ padding: "12px 24px", borderRadius: 12, border: "none", background: "#fff", color: "#16a34a", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>
                    Commander →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── RECUS TAB ─── */}
        {tab === "recu" && (
          <div>
            <div style={{ fontSize: 14, color: "#9ca3af", marginBottom: 16 }}>Historique des paiements</div>
            {[
              { date: "05 Mars 2026", montant: 450000, label: "Frais scolaires T1", ref: "LNP-2026-A7F3K", ok: true },
              { date: "15 Jan 2026", montant: 85000, label: "Kit scolaire", ref: "LNP-2026-B2M9X", ok: true },
              { date: "02 Oct 2025", montant: 450000, label: "Frais scolaires T0", ref: "LNP-2025-C4D8W", ok: true },
            ].map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{r.label}</div>
                    <div style={{ color: "#6b7280", fontSize: 11, marginTop: 4 }}>{r.date}</div>
                    <div style={{ color: "#4b5563", fontSize: 10, marginTop: 2, fontFamily: "monospace" }}>{r.ref}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontWeight: 800, color: "#4ade80", fontSize: 15 }}>{GNF(r.montant)}</div>
                    <div style={{ fontSize: 10, background: "#16a34a22", color: "#4ade80", padding: "2px 8px", borderRadius: 6, marginTop: 4 }}>✅ Payé</div>
                  </div>
                </div>
                <button style={{ marginTop: 12, width: "100%", padding: "8px 0", borderRadius: 8, border: "1px solid rgba(255,255,255,0.1)", background: "transparent", color: "#9ca3af", fontSize: 12, cursor: "pointer" }}>
                  📄 Télécharger PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SCHOOL DASHBOARD VIEW ────────────────────────────────────────────────
function SchoolView() {
  const [tab, setTab] = useState("dashboard");
  const [payrollLoading, setPayrollLoading] = useState(null);
  const [enseignants, setEnseignants] = useState(mockEnseignants);

  const payEnseignant = (id) => {
    setPayrollLoading(id);
    setTimeout(() => {
      setEnseignants(prev => prev.map(e => e.id === id ? { ...e, statut: "payé", date: "05 Mars 2026" } : e));
      setPayrollLoading(null);
    }, 2000);
  };

  const totalCollecte = mockTransactions.filter(t => t.statut === "payé").reduce((s, t) => s + t.montant, 0);
  const totalSalaires = enseignants.reduce((s, e) => s + e.salaire, 0);
  const salairesPaies = enseignants.filter(e => e.statut === "payé").reduce((s, e) => s + e.salaire, 0);

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh", background: "#0d1117", color: "#e6edf3" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      {/* Sidebar + Main */}
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <div style={{ width: 220, background: "#161b22", borderRight: "1px solid #21262d", padding: "24px 0", display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #21262d" }}>
            <div style={{ fontSize: 20, fontWeight: 800, background: "linear-gradient(135deg, #4ade80, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>LoniPay</div>
            <div style={{ fontSize: 11, color: "#6e7681", marginTop: 2 }}>Dashboard École</div>
          </div>
          <div style={{ padding: "16px 12px", flex: 1 }}>
            {[["dashboard","📊","Dashboard"], ["transactions","💳","Paiements"], ["payroll","👨‍🏫","Payroll"], ["marketplace","🛒","Marketplace"]].map(([key, icon, label]) => (
              <button key={key} onClick={() => setTab(key)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 8, border: "none", background: tab === key ? "rgba(74,222,128,0.1)" : "transparent", color: tab === key ? "#4ade80" : "#8b949e", fontSize: 13, fontWeight: tab === key ? 700 : 400, cursor: "pointer", marginBottom: 4, textAlign: "left" }}>
                <span>{icon}</span>{label}
              </button>
            ))}
          </div>
          <div style={{ padding: "16px 20px", borderTop: "1px solid #21262d" }}>
            <div style={{ fontSize: 12, fontWeight: 700 }}>École Ratoma Centre</div>
            <div style={{ fontSize: 11, color: "#6e7681" }}>Directeur: M. Camara</div>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Header */}
          <div style={{ padding: "20px 32px", borderBottom: "1px solid #21262d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700 }}>
                {tab === "dashboard" ? "Vue d'ensemble" : tab === "transactions" ? "Paiements reçus" : tab === "payroll" ? "Gestion Payroll" : "Marketplace"}
              </div>
              <div style={{ fontSize: 13, color: "#6e7681", marginTop: 2 }}>Jeudi 05 Mars 2026</div>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, background: "#4ade80", borderRadius: "50%", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: "#4ade80" }}>Système actif</span>
            </div>
          </div>

          <div style={{ padding: "24px 32px" }}>

            {/* ─── DASHBOARD ─── */}
            {tab === "dashboard" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
                  {[
                    { label: "Collecté ce mois", value: GNF(totalCollecte), icon: "💰", color: "#4ade80", sub: "5 transactions" },
                    { label: "Élèves inscrits", value: "423", icon: "👦", color: "#22d3ee", sub: "+12 ce mois" },
                    { label: "Masse salariale", value: GNF(totalSalaires), icon: "👨‍🏫", color: "#a78bfa", sub: "5 enseignants" },
                    { label: "Ventes Marketplace", value: GNF(850000), icon: "🛒", color: "#fb923c", sub: "Commission: 63 750 GNF" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontSize: 12, color: "#6e7681", marginBottom: 8 }}>{s.label}</div>
                          <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                          <div style={{ fontSize: 11, color: "#6e7681", marginTop: 4 }}>{s.sub}</div>
                        </div>
                        <div style={{ fontSize: 24 }}>{s.icon}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini chart */}
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
                  <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Paiements de la semaine</div>
                    <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                      {[40, 65, 30, 90, 75, 55, 85].map((h, i) => (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                          <div style={{ width: "100%", height: `${h}%`, background: `linear-gradient(to top, #16a34a, #22d3ee)`, borderRadius: "4px 4px 0 0", minHeight: 4 }} />
                          <div style={{ fontSize: 10, color: "#6e7681" }}>{"LMMJVSD"[i]}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Impayés</div>
                    <div style={{ fontSize: 32, fontWeight: 800, color: "#ef4444" }}>47</div>
                    <div style={{ fontSize: 12, color: "#6e7681", marginTop: 4 }}>élèves en attente</div>
                    <div style={{ marginTop: 16, fontSize: 13, color: "#f97316" }}>= {GNF(47 * 450000)}</div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TRANSACTIONS ─── */}
            {tab === "transactions" && (
              <div>
                <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#0d1117" }}>
                        {["Parent", "Élève", "Classe", "Montant", "Méthode", "Heure", "Statut"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, color: "#6e7681", fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map(t => (
                        <tr key={t.id} style={{ borderTop: "1px solid #21262d" }}>
                          <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600 }}>{t.parent}</td>
                          <td style={{ padding: "14px 16px", fontSize: 13, color: "#8b949e" }}>{t.eleve}</td>
                          <td style={{ padding: "14px 16px", fontSize: 13 }}><span style={{ background: "#21262d", padding: "2px 8px", borderRadius: 6, fontSize: 11 }}>{t.classe}</span></td>
                          <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: "#4ade80" }}>{GNF(t.montant)}</td>
                          <td style={{ padding: "14px 16px", fontSize: 12, color: "#8b949e" }}>{t.methode === "Orange Money" ? "🟠" : "🟡"} {t.methode}</td>
                          <td style={{ padding: "14px 16px", fontSize: 12, color: "#6e7681" }}>{t.heure}</td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: t.statut === "payé" ? "#16a34a22" : "#f9731622", color: t.statut === "payé" ? "#4ade80" : "#fb923c" }}>
                              {t.statut === "payé" ? "✅ Payé" : "⏳ En attente"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div style={{ marginTop: 16, padding: 16, background: "rgba(74,222,128,0.07)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#4ade80" }}>Total collecté : {GNF(totalCollecte)}</span>
                  <span style={{ fontSize: 12, color: "#6e7681", marginLeft: 16 }}>Commission LoniPay (1,5%) : {GNF(Math.round(totalCollecte * 0.015))}</span>
                </div>
              </div>
            )}

            {/* ─── PAYROLL ─── */}
            {tab === "payroll" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
                  {[
                    { label: "Masse salariale totale", value: GNF(totalSalaires), color: "#a78bfa" },
                    { label: "Déjà versé", value: GNF(salairesPaies), color: "#4ade80" },
                    { label: "Reste à verser", value: GNF(totalSalaires - salairesPaies), color: "#f97316" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 12, color: "#6e7681", marginBottom: 8 }}>{s.label}</div>
                      <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, overflow: "hidden" }}>
                  <div style={{ padding: "16px 20px", borderBottom: "1px solid #21262d", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Enseignants — Mars 2026</div>
                    <button style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                      Tout payer en masse
                    </button>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ background: "#0d1117" }}>
                        {["Enseignant", "Matière", "Salaire", "Statut", "Date versement", "Action"].map(h => (
                          <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 12, color: "#6e7681", fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {enseignants.map(e => (
                        <tr key={e.id} style={{ borderTop: "1px solid #21262d" }}>
                          <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                              <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
                                {e.nom.includes("Mme") ? "👩" : "👨"}
                              </div>
                              {e.nom}
                            </div>
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: 13, color: "#8b949e" }}>{e.matiere}</td>
                          <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: "#a78bfa" }}>{GNF(e.salaire)}</td>
                          <td style={{ padding: "14px 16px" }}>
                            <span style={{ padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: e.statut === "payé" ? "#16a34a22" : "#f9731622", color: e.statut === "payé" ? "#4ade80" : "#fb923c" }}>
                              {e.statut === "payé" ? "✅ Payé" : "⏳ En attente"}
                            </span>
                          </td>
                          <td style={{ padding: "14px 16px", fontSize: 12, color: "#6e7681" }}>{e.date}</td>
                          <td style={{ padding: "14px 16px" }}>
                            {e.statut === "en attente" ? (
                              <button onClick={() => payEnseignant(e.id)} disabled={payrollLoading === e.id} style={{ padding: "6px 14px", borderRadius: 8, border: "none", background: payrollLoading === e.id ? "#374151" : "linear-gradient(135deg, #7c3aed, #4f46e5)", color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
                                {payrollLoading === e.id ? "⏳..." : "💸 Payer"}
                              </button>
                            ) : (
                              <button style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #21262d", background: "transparent", color: "#6e7681", fontSize: 12, cursor: "pointer" }}>
                                📄 Bulletin
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ─── MARKETPLACE ─── */}
            {tab === "marketplace" && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 20 }}>
                  {[
                    { label: "Ventes ce mois", value: GNF(850000), icon: "📦", color: "#fb923c" },
                    { label: "Commission LoniPay (7.5%)", value: GNF(63750), icon: "💰", color: "#4ade80" },
                    { label: "Commandes en cours", value: "12", icon: "🚚", color: "#22d3ee" },
                  ].map((s, i) => (
                    <div key={i} style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 16 }}>
                      <div style={{ fontSize: 11, color: "#6e7681", marginBottom: 6 }}>{s.label}</div>
                      <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value} <span style={{ fontSize: 20 }}>{s.icon}</span></div>
                    </div>
                  ))}
                </div>
                <div style={{ background: "#161b22", border: "1px solid #21262d", borderRadius: 12, padding: 20 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Produits disponibles</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                    {mockProduits.map(p => (
                      <div key={p.id} style={{ background: "#0d1117", borderRadius: 10, padding: 14, border: "1px solid #21262d" }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>{p.emoji}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>{p.nom}</div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 14, fontWeight: 800, color: "#fb923c" }}>{GNF(p.prix)}</span>
                          <span style={{ fontSize: 11, color: "#6e7681" }}>Stock: {p.stock}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────
export default function App() {
  const [view, setView] = useState("landing"); // landing | parent | school

  if (view === "parent") return (
    <div>
      <div style={{ position: "fixed", top: 12, left: 12, zIndex: 999 }}>
        <button onClick={() => setView("landing")} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 12, cursor: "pointer", backdropFilter: "blur(10px)" }}>← Retour</button>
      </div>
      <div style={{ maxWidth: 390, margin: "0 auto" }}><ParentView /></div>
    </div>
  );

  if (view === "school") return (
    <div>
      <div style={{ position: "fixed", top: 12, left: 240, zIndex: 999 }}>
        <button onClick={() => setView("landing")} style={{ padding: "8px 16px", borderRadius: 20, border: "none", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: 12, cursor: "pointer", backdropFilter: "blur(10px)" }}>← Retour</button>
      </div>
      <SchoolView />
    </div>
  );

  // Landing
  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", minHeight: "100vh", background: "linear-gradient(160deg, #0f1923 0%, #0a1f0a 60%, #0f1923 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#fff" }}>
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <div style={{ textAlign: "center", maxWidth: 560, padding: "0 24px" }}>
        <div style={{ fontSize: 48, fontWeight: 900, background: "linear-gradient(135deg, #4ade80, #22d3ee)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>LoniPay</div>
        <div style={{ fontSize: 16, color: "#6e7681", marginBottom: 8 }}>La finance digitale au service de l'éducation guinéenne</div>
        <div style={{ fontSize: 13, color: "#374151", marginBottom: 48 }}>Prototype interactif · ANSUTEN 2026</div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <button onClick={() => setView("parent")} style={{ padding: "28px 24px", borderRadius: 20, border: "1px solid rgba(74,222,128,0.2)", background: "rgba(74,222,128,0.05)", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(74,222,128,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(74,222,128,0.05)"}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>📱</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#4ade80", marginBottom: 6 }}>Vue Parent</div>
            <div style={{ fontSize: 13, color: "#6e7681", lineHeight: 1.5 }}>Payer les frais scolaires, acheter des fournitures, consulter les reçus</div>
          </button>
          <button onClick={() => setView("school")} style={{ padding: "28px 24px", borderRadius: 20, border: "1px solid rgba(34,211,238,0.2)", background: "rgba(34,211,238,0.05)", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(34,211,238,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(34,211,238,0.05)"}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>🏫</div>
            <div style={{ fontSize: 16, fontWeight: 800, color: "#22d3ee", marginBottom: 6 }}>Dashboard École</div>
            <div style={{ fontSize: 13, color: "#6e7681", lineHeight: 1.5 }}>Gérer les paiements, payer les enseignants, suivre la marketplace</div>
          </button>
        </div>

        <div style={{ marginTop: 40, display: "flex", justifyContent: "center", gap: 32 }}>
          {[["💳", "Orange Money & MTN"], ["👨‍🏫", "Payroll enseignants"], ["🛒", "Marketplace"], ["🧾", "Reçus QR Code"]].map(([icon, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{icon}</div>
              <div style={{ fontSize: 10, color: "#4b5563" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

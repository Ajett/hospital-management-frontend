export default function HospitalCard({ hospital }) {
  return <article className="hospital-placeholder-card"><div className="hospital-card-body"><h3>{hospital?.name || "MediCare Hospital"}</h3><p>{hospital?.address || "Healthcare facility"}</p></div></article>;
}

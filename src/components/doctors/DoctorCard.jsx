export default function DoctorCard({ doctor }) {
  return <article className="public-doctor-card"><div className="public-doctor-card-body"><h3>{doctor?.name || "Doctor"}</h3><p>{doctor?.specialization || "Healthcare Specialist"}</p></div></article>;
}

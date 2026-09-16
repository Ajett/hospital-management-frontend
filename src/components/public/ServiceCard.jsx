export default function ServiceCard({ title, description, icon = "+" }) {
  return <article className="home-service-card"><div className="home-service-icon">{icon}</div><h3>{title}</h3><p>{description}</p></article>;
}

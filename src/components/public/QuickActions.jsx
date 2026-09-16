export default function QuickActions({ items = [] }) {
  return <div className="home-quick-grid">{items.map((item) => <div className="home-quick-item" key={item}>{item}</div>)}</div>;
}

import PublicNavbar from "../components/public/PublicNavbar";
import PublicFooter from "../components/public/PublicFooter";

export default function PublicLayout({ children }) {
  return <><PublicNavbar />{children}<PublicFooter /></>;
}

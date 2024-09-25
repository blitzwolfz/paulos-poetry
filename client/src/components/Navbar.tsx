type Props = {};
import { useContext, useState } from "react";
import { Search } from "react-bootstrap-icons";
import { SetState } from "../types";
import "./styles/navbar.scss";
import { Store } from "../App";
import { handleLogout } from "../util/handleLogin";

export default function Navbar({}: Props) {
  const [search, setSearch] = useState("");

  const { user, setUser } = useContext(Store);

  const onLogout = () => handleLogout(setUser);
  const onSearch = () => {
    console.log("searching for:", search);
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <Link href="/">Home</Link>
          <SearchBar search={search} setSearch={setSearch} onSearch={onSearch} />
          <Link href="/poetry">Poetry</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/translations">Translations</Link>

          {user.id ? (
            <div style={{ cursor: "pointer" }} onClick={onLogout}>
              Logout
            </div>
          ) : (
            <>
              <Link href="/login">Sign In</Link>
              <Link href="/register">Join</Link>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}

function Link({ href, children }: { href: string; children?: React.ReactNode }) {
  return (
    <li>
      <a className="nav-link" href={href}>
        {children}
      </a>
    </li>
  );
}

interface SearchBarProps {
  search: string;
  setSearch: SetState<string>;
  onSearch: () => void;
}

function SearchBar({ search, setSearch, onSearch }: SearchBarProps) {
  return (
    <li className="nav-search">
      <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      <button onClick={onSearch} className="nav-search--button">
        <Search size={18} />
      </button>
    </li>
  );
}

import "./home.scss";
import logoImg from "../../assets/Logo.png";
import { useGitContext } from "../../hooks/useGithub";
import { UsersAlreadySearched } from "./components/UsersAlreadySearched";
export function Home() {
  const { handleSubmit, username, setUsername } = useGitContext();

  return (
    <div className="container-home">
      <img src={logoImg} alt="" />

      <div className="content-home">
        <h1>Explore respositórios no Github</h1>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Digite aqui ..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit" onClick={handleSubmit}>
            Pesquisar
          </button>
        </div>
      </div>

      <div className="list-users-searched">
        <UsersAlreadySearched />
      </div>
    </div>
  );
}

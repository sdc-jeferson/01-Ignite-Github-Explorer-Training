import "./profile.scss";
import logoImg from "../../assets/Logo.png";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { ListRepo } from "../../components/ListRepo";
import { useGitContext } from "../../hooks/useGithub";
export function Profile() {
  const { respData } = useGitContext();

  if (!respData) {
    return <div className="loading-profile">Carregando ... </div>;
  }

  return (
    <div className="container-profile">
      <div className="header-profile">
        <Link to="/">
          <img src={logoImg} alt="" />
        </Link>
        <Link to="/" className="to-back">
          <IoIosArrowBack /> Voltar
        </Link>
      </div>

      <div className="content-profile">
        <img
          src={respData?.avatar_url ?? ""}
          alt=""
          className="imagem do avatar"
        />

        <div className="resume-profile">
          <h2>{respData.login}/repo</h2>
          <p>{respData.bio}</p>
        </div>
      </div>

      <div className="status-profile">
        <div>
          <span>{respData.public_repos}</span>
          <p>Repositórios públicos</p>
        </div>
        <div>
          <span>{respData.followers}</span>
          <p>Seguidores</p>
        </div>
        <div>
          <span>{respData.following}</span>
          <p>Seguindo</p>
        </div>
      </div>

      <ul className="repos-profile-wrapper">
        <ListRepo />
      </ul>
    </div>
  );
}

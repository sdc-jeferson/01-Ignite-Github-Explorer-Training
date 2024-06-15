import { GrNext } from "react-icons/gr";
import "./styles.scss";
import { useGitContext } from "../../../../hooks/useGithub";
import { Link } from "react-router-dom";

export function UsersAlreadySearched() {
  const { userAlreadySearcheds } = useGitContext();

  return (
    <>
      <div className="users-already-searched-container">
        {userAlreadySearcheds.map((user) => (
          <div className="content-wrapper-already-searched">
            <div className="info-user">
              <img src={user.avatar_url!} alt="" className="image-users" />
              <div>
                <h2>{user.login}</h2>
                <p>{user.bio}</p>
              </div>
            </div>
            <button>
              <Link to={user.html_url} target="_blank">
                <GrNext size={16} />
              </Link>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

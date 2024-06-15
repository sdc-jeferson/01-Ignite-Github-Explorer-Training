import "./list_repo.scss";
import { GrNext } from "react-icons/gr";
import { GithubRepos } from "../../context/ThemeContext";
import { useGitContext } from "../../hooks/useGithub";

export function ListRepo() {
  const { repositories } = useGitContext();

  return (
    <>
      {repositories.map((repo: GithubRepos) => (
        <li className="card-wrap" key={repo.id}>
          <div>
            <h3>{repo.name}</h3>
            <p>{repo.full_name}</p>
          </div>
          <a href={repo.html_url} target="_blank">
            <GrNext />
          </a>
        </li>
      ))}
    </>
  );
}

import "./error.scss";
import errorImg from "../../assets/404-error.svg";
import { Link } from "react-router-dom";

export function Error() {
  return (
    <div className="container-error">
      <img src={errorImg} alt="" />
      <Link to="/">Voltar a Home</Link>
    </div>
  );
}

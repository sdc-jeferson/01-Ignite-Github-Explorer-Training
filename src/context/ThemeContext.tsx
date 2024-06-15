import { ReactNode, createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface GithubRepos {
  id: number;
  html_url: string;
  name: string;
  full_name: string;
  description: string;
}

interface GithubUser {
  login: string;
  avatar_url: string | null;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

interface ThemeContextType {
  username: string;
  setUsername: (username: string) => void;
  handleSubmit: () => void;
  respData: GithubUser;
  handleListRepositories: () => void;
  repositories: GithubRepos[];
  userAlreadySearcheds: GithubUser[];
}

export const ThemeContext = createContext({} as ThemeContextType);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const KEY_LOCAL_STORAGE = "@datausers:userAlreadySearcheds";

  const [username, setUsername] = useState("");
  const [respData, setRespData] = useState<GithubUser>({} as GithubUser);
  const [repositories, setRepositories] = useState<GithubRepos[]>([]);
  const [userAlreadySearcheds, setUserAlreadySearcheds] = useState<
    GithubUser[]
  >([]);

  const navigate = useNavigate();

  async function handleSubmit() {
    try {
      const response = await api.get(`/${username}`);
      const data = await response.data;
      setRespData(data);
      setUserAlreadySearcheds((state) => [...state, data]);

      navigate("/profile");
      setUsername("");
      await handleListRepositories();
      return;
    } catch (error) {
      toast.warn("Usuário não encontrado", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
      setUsername("");
    }
  }

  async function handleListRepositories() {
    try {
      const dataRepos = await api.get(`${username}/repos`);
      setRepositories(dataRepos.data);
    } catch (error) {
      toast.warn("Repositório não encontrado", {
        position: "top-center",
        autoClose: 2000,
        theme: "light",
      });
    }
  }

  useEffect(() => {
    localStorage.setItem(
      KEY_LOCAL_STORAGE,
      JSON.stringify(userAlreadySearcheds)
    );
  }, [userAlreadySearcheds]);

  return (
    <ThemeContext.Provider
      value={{
        handleSubmit,
        username,
        setUsername,
        respData,
        handleListRepositories,
        repositories,
        userAlreadySearcheds,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

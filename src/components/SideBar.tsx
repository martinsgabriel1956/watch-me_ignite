import { memo, useCallback, useEffect, useMemo, useState } from "react";

import "../styles/sidebar.scss";

import { api } from "../services/api";
import { Button } from "../components/Button";
interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

interface sideBarProps {
  selectedGenreId: number;
  setSelectedGenreId: (id: number) => void;
}

export function SideBarComponent(props: sideBarProps ) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>("genres").then((response) => {
      setGenres(response.data);
    });
  }, []);

  const handleClickButton = useCallback((id: number) => {
    return props.setSelectedGenreId(id);
  }, [props.selectedGenreId]);

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>
      
      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={props.selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}

export const SideBar = memo(SideBarComponent, (prevProps, nexProps) => {
  return Object.is(prevProps.genres, nexProps.genres) && prevProps.selectedGenreId === nexProps.selectedGenreId
})

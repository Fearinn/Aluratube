import { useState } from "react";
import StyledRegisterVideo from "components/VideoRegister/styles";
import getIdFromURL from "utils/getIdFromURL";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://szaruafpiauzxitymguy.supabase.co";
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6YXJ1YWZwaWF1enhpdHltZ3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyMjE4NDgsImV4cCI6MTk4Mzc5Nzg0OH0.t0Bfs0pKt2LtGwQb5BE9AB7OoK8hWkdsNs5wqvzHSak";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

const useForm = <T,>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    changeHandler,
    resetForm,
  };
};

function VideoRegister() {
  const [open, setOpen] = useState(false);
  const initialValues = { title: "", url: "", playlist: "", youtubeId: "" };

  const registerForm = useForm(initialValues);

  return (
    <>
      <StyledRegisterVideo>
        {open && (
          <>
            <form
              aria-labelledby="legend"
              onSubmit={async (event) => {
                event.preventDefault();

                try {
                  const registration = await supabase.from("video").insert({
                    playlist: registerForm.values.playlist,
                    title: registerForm.values.title,
                    url: registerForm.values.url,
                    thumb: `https://img.youtube.com/vi/${getIdFromURL(
                      registerForm.values.url
                    )}/hqdefault.jpg`,
                    youtubeId: getIdFromURL(registerForm.values.url),
                  });

                  if (registration.error)
                    throw new Error(
                      ` este v??deo j?? foi adiconado anteriormente. Voc?? pode usar a barra de busca para encontr??-lo.`
                    );
                } catch (error) {
                  alert(`${error}`);
                }
                registerForm.resetForm();
                setOpen(false);
              }}
            >
              <div>
                <button
                  type="button"
                  className="close-modal"
                  onClick={() => setOpen(false)}
                >
                  X
                </button>
                <fieldset>
                  <legend id="legend">Enviar v??deo</legend>
                  <input
                    placeholder="T??tulo do v??deo"
                    name="title"
                    onChange={registerForm.changeHandler}
                    value={registerForm.values.title}
                    required
                  />

                  <input
                    pattern="((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-_]{11})(\S+)?"
                    title="Uma URL v??lida cont??m determinada estrutura e um id com 11 caracteres"
                    placeholder="URL"
                    name="url"
                    onChange={registerForm.changeHandler}
                    value={registerForm.values.url}
                    required
                  />
                  <FormControl fullWidth sx={{ marginBottom: "0.5rem" }}>
                    <InputLabel className="playlist-label">Playlist</InputLabel>
                    <Select
                      variant="outlined"
                      className="playlist-select"
                      required
                      name="playlist"
                      value={registerForm.values.playlist}
                      /* @ts-ignore */
                      onChange={registerForm.changeHandler}
                      label="Playlist"
                    >
                      <MenuItem value="jogos">Jogos</MenuItem>
                      <MenuItem value="tecnologia">Tecnologia</MenuItem>
                      <MenuItem value="esportes">Esportes</MenuItem>
                      <MenuItem value="outros">Outros</MenuItem>
                    </Select>
                  </FormControl>
                </fieldset>
                <button type="submit">Cadastrar</button>
                {getIdFromURL(registerForm.values.url)?.length === 11 && (
                  <img
                    alt=""
                    src={`https://img.youtube.com/vi/${getIdFromURL(
                      registerForm.values.url
                    )}/hqdefault.jpg`}
                  />
                )}
              </div>
            </form>
          </>
        )}
        <button className="add-video" onClick={() => setOpen(true)}>
          +
        </button>
      </StyledRegisterVideo>
    </>
  );
}

export default VideoRegister;

import { useState } from "react";
import StyledRegisterVideo from "components/VideoRegister/styles";
import getIdFromURL from "utils/getIdFromURL";

const useRegisterVideoForm = <T,>(initialValues: T) => {
  const [values, setValues] = useState(initialValues);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const submitForm = (event: React.FormEvent) => {
    event.preventDefault();
    setValues(initialValues);
  };

  return {
    values,
    changeHandler,
    submitForm,
  };
};

function VideoRegister() {
  const [open, setOpen] = useState(false);
  const initialValues = { title: "", url: "" };

  const registerForm = useRegisterVideoForm(initialValues);
  return (
    <>
      <StyledRegisterVideo>
        {open && (
          <>
            <form
              aria-labelledby="legend"
              onSubmit={(event) => registerForm.submitForm(event)}
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
                  <legend id="legend">Enviar vídeo</legend>
                  <input
                    placeholder="Título do vídeo"
                    name="title"
                    onChange={registerForm.changeHandler}
                    value={registerForm.values.title}
                    required
                  />
                  <input
                    pattern={`(?:http(?:s)?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/))([^\?&\"'<> #]{11})`}
                    title="Uma URL válida contém determinada estrutura e um id com 11 caracteres"
                    placeholder="URL"
                    name="url"
                    onChange={registerForm.changeHandler}
                    value={registerForm.values.url}
                    required
                  />
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

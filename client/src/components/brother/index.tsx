import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { apiUrl } from "../../services/base";
import { BrotherType } from "../../services/types";
import { vote } from "../../services/vote";

type BrotherProps = {
  brother: BrotherType;
  voted: (brother: BrotherType) => void;
};

function Brother({ brother, voted }: BrotherProps) {
  const siteKey = "6LdWbv0eAAAAABLuVrtuOEryaSAPb0Gwo65m8BRn";
  const recaptchaRef = useRef<any>(null);
  const [open, setOpen] = useState(false);

  async function handleVote() {
    const captchaToken = recaptchaRef.current.getValue();
    recaptchaRef.current.reset();

    await vote(brother.id, captchaToken as string);

    voted(brother);
  }

  return (
    <div className="mb-2" onClick={() => setOpen(!open)}>
      <div
        className="d-flex align-items-center border"
        style={{ cursor: "pointer" }}
      >
        <div className="flex-grow-1 ms-3">{brother.name}</div>
        <div className="flex-shrink-0">
          <img src={`${apiUrl}${brother.avatar}`} alt={brother.name} />
        </div>
      </div>
      {open && (
        <div className="border p-5 d-flex align-itens-center justify-content-center">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={handleVote}
          />
        </div>
      )}
    </div>
  );
}

export default Brother;

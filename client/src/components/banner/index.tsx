import { useEffect, useMemo, useState } from "react";
import { apiUrl } from "../../services/base";

import { publicSurvey } from "../../services/public-survey";
import { BrotherType, SurveyType } from "../../services/types";

import { Container, Botao1, Botao2, BrothersImages } from "./styles";

function Banner() {
  const [survey, setSurvey] = useState<SurveyType | null>(null);
  const [brothers, setBrothers] = useState<BrotherType[]>([]);

  const brotherNames = useMemo(() => {
    const names = brothers.map((brother) => brother.name);
    const lastName = names.pop();

    return `${names.join(", ")} ou ${lastName}`;
  }, [brothers]);

  const brotherOut = useMemo(() => {
    return survey?.status === "done"
      ? brothers.find((brother) => brother.id === survey.brother_out_id)
      : null;
  }, [brothers, survey]);

  useEffect(() => {
    publicSurvey().then((survey) => {
      setSurvey(survey);
      setBrothers(survey?.brothers || []);
    });
  }, []);

  return (
    <Container>
      <BrothersImages count={brothers.length}>
        <div className="background">
          {brothers.map((brother) => (
            <div key={brother.id}>
              <img
                src={`${apiUrl}${brother.avatar.replace(
                  "header.png",
                  "pagina.webp"
                )}`}
                alt={brother.name}
              />
            </div>
          ))}
        </div>
      </BrothersImages>
      <Botao1 to={`/votacao/${survey?.id}`}>
        {survey?.status === "active" ? (
          <>Paredão do BBB22: Vote para eliminar. {brotherNames}?</>
        ) : (
          <>Votação finalizada, {brotherOut?.name} está fora da casa</>
        )}
      </Botao1>
      {survey?.status === "active" && (
        <Botao2 to={`/votacao/${survey?.id}`}>vote agora</Botao2>
      )}
    </Container>
  );
}

export default Banner;

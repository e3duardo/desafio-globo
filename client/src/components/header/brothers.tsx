import { useEffect, useState } from "react";
import { apiUrl } from "../../services/base";
import { brotherList } from "../../services/brother";
import { BrotherType } from "../../services/types";
import { Container, Brothers, Brother } from "./styles";

function BrothersHeader() {
  const [brothers, setBrothers] = useState<BrotherType[]>([]);

  useEffect(() => {
    brotherList().then((brothers) => {
      setBrothers(brothers || []);
    });
  }, []);

  return (
    <Container>
      <Brothers>
        {brothers.map((brother) => (
          <Brother out={brother.status === "out"} key={brother.id}>
            <img src={`${apiUrl}${brother.avatar}`} alt={brother.name} />
          </Brother>
        ))}
      </Brothers>
    </Container>
  );
}

export default BrothersHeader;

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useSetRecoilState } from "recoil";

import { menuState } from "../state";

const Favorites = () => {
  const { userId } = useParams();
  const setMenu = useSetRecoilState(menuState);

  useEffect(() => {
    setMenu(6);
  }, [setMenu]);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Articles favorited by @{userId}</title>
        </Helmet>
      </HelmetProvider>
    </>
  );
};

export default Favorites;
"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { UserGlobalContext } from "@/provider/contextProvider";

const ListClientButton = ({ options, close }) => {
  const { setListUserData, address } = UserGlobalContext();

  const popUpEvent = () => {
    if (!address) {
      return;
    }
    close(false);
    setListUserData(true);
  };
  return (
    <button
      onClick={() => popUpEvent()}
      className={`optionButton transition-all	duration-500 bg-fondTwo text-white flex items-center justify-center border-2 border-intColorOne w-12 h-12 cursor-pointer	 rounded-full	fixed ${
        options ? "bottomPersonal" : "bottom-4"
      }  right-4`}
    >
      <FontAwesomeIcon icon={faList} />
    </button>
  );
};

export default ListClientButton;

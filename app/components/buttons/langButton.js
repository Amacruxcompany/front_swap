"use client";
import { UserGlobalContext } from "@/provider/contextProvider";


const LangButtonComponent = ({ options, close }) => {

    const { setLang, lang } = UserGlobalContext()

    const changeLang = async () => {
        close(false);
        setLang(!lang)
    };



    return (
        <button
            onClick={changeLang}
            className={`optionButton transition-all	duration-500 bg-fondTwo text-white flex items-center justify-center border-2 border-intColorOne w-12 h-12 cursor-pointer	 rounded-full	fixed ${options ? "langButton" : "bottom-4"
                }  right-4`}
        >
            {lang ? 'ES' : 'EN'}
        </button>
    );
};

export default LangButtonComponent;

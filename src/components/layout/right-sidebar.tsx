import ButtonAuth from "components/button/auth";
import ThreadHeader from "components/thread/header";
import { useSelector } from "react-redux";
import { ReducerType } from "states";
import { SIGN_IN, SIGN_UP } from "utils/routes";

function RightSidebar() {
    const state = useSelector<ReducerType, ReducerType>((state) => state);
    const users = state?.user?.users?.reverse();

    return (
        <div className="w-[300px] min-h-screen p-4 flex flex-col items-start justify-between border-left">
            {!state?.user?.id ? (
                <div className="bg-white rounded-xl p-4 border border-solid border-gray-200 w-full font-twitter-chirp gap-3 flex flex-col">
                    <p className="font-semibold text-xl m-0">Baru kenal My Forum?</p>
                    <p className="m-0 text-gray-500 text-xs !font-light">Daftar sekarang untuk mendapatkan timeline pribadi Anda sendiri!</p>
                    <ButtonAuth to={SIGN_IN}>Masuk</ButtonAuth>
                    <ButtonAuth to={SIGN_UP}>Buat akun</ButtonAuth>
                    <span className="text-xs text-gray-400">Dengan mendaftar, Anda menyetujui Persyaratan Layanan dan Kebijakan Privasi.</span>
                </div>
            ) : (
                <div className="bg-gray-100 rounded-xl w-full p-3">
                    <p className="font-bold text-xl">Untuk dilihat</p>
                    {users?.map((usr, i) => {
                        if (i > 4) return null;
                        return <ThreadHeader className="border-bottom py-2" key={i} user={usr} />;
                    })}
                </div>
            )}
            <div className="w-full text-center text-gray-400 flex gap-2">
                Made with <p className="constant-tilt-shake m-0">❤️</p> by fiqriardiansyah
            </div>
        </div>
    );
}

export default RightSidebar;

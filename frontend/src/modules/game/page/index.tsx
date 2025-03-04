import { GameGlobe } from "../components/globe";
import { FormWrapper } from "../components/form";
import { Layout } from "../../common/components/layout";
import { useAppState } from "@store/index";
import { Toast } from "@modules/common/components/toast";

export function Game() {
  const [state] = useAppState();
  return (
    <Layout>
      {state?.toast?.visible && (
        <Toast message={state?.toast?.message} type={state?.toast.type} />
      )}
      <div className="flex flex-col lg:flex-row  md:h-full">
        <div className="w-full lg:w-1/3 bg-black h-full  text-white p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-yellow-400 text-center">
            Where in the World Are We?
          </h2>
          <FormWrapper />
        </div>

        <div className="w-full h-full lg:w-2/3 relative overflow-hidden">
          <GameGlobe />
        </div>
      </div>
    </Layout>
  );
}

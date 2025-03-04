import { GameGlobe } from "../components/globe";
import { FormWrapper } from "../components/form";
import { Layout } from "../../common/components/layout";
import { useAppState } from "@store/index";
import { Toast } from "@modules/common/components/toast";

export function Game() {
  const [state] = useAppState();
  return (
    <Layout>
      {state?.toast?.visibile && (
        <Toast message={state?.toast?.message} type={state?.toast.type} />
      )}
      <div className="flex h-full">
        <div className="w-1/3 bg-black text-white p-6 flex flex-col  items-center">
          <h2 className="text-xl font-bold mb-4 text-yellow-400">
            Where in the World Are We?
          </h2>
          <FormWrapper />
        </div>

        <div className="w-2/3 relative">
          <GameGlobe />
        </div>
      </div>
    </Layout>
  );
}

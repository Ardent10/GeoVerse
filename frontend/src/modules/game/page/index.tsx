import { GameGlobe } from "../components/globe";
import { FormWrapper } from "../components/form";
import { Layout } from "../../common/components/layout";

export function Game() {
  return (
    <Layout>
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

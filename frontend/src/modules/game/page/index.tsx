import { GameGlobe } from "../components/globe";
import { FormWrapper } from "../components/form";
import { Layout } from "../../common/components/layout";
import { useAppState } from "@store/index";
import { Toast } from "@modules/common/components/toast";
import { motion } from "framer-motion";
import { GameWrapper } from "../components/challenge/challenge";
import { InvitedPopup } from "../components/popup/invitedPopup";
import { useEffect } from "react";

export function Game() {
  const [state, dispatch] = useAppState();

  useEffect(() => {
    if (state?.user?.invited) {
      dispatch({
        type: "SET_SHOW_INVITED_POPUP",
        payload: {
          showInvitedPopup: true,
        },
      });
    }
  }, [state?.user?.invited]);
  return (
    <Layout>
      {state?.showInvitedPopup && <InvitedPopup />}
      {state?.toast?.visible && (
        <Toast message={state?.toast?.message} type={state?.toast.type} />
      )}
      <div className="flex flex-col justify-center h-full lg:flex-row md:h-full">
        <div className="w-full lg:w-1/3 bg-black h-full text-white p-6 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-yellow-400 text-center">
            Where in the World Are We?
          </h2>

          {!state?.showCountryForm ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full flex flex-col justify-center"
            >
              <GameWrapper />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-full flex flex-col justify-center"
            >
              <FormWrapper />
            </motion.div>
          )}
        </div>

        <div className="w-full h-full lg:w-2/3 relative overflow-hidden">
          <GameGlobe />
        </div>
      </div>
    </Layout>
  );
}

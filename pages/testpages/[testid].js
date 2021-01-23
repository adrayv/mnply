import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import db from "~/services/firebase/firestore";
import superagent from "superagent";

const TestPage = () => {
  const router = useRouter();
  const { testid } = router.query;

  useEffect(() => {
    if (testid) {
      return db
        .collection("tests")
        .doc(testid)
        .onSnapshot((doc) => {
          const data = doc.data();
          console.log({ data });
        });
    }
  }, [testid]);

  const onClick = useCallback(() => {
    (async () => {
      const { body } = await superagent.get(`/api/testpages/${testid}`);
      console.log({ body });
    })();
  }, [testid]);

  return (
    <>
      <p>Test: {testid}</p>
      <button onClick={onClick}>ping</button>
    </>
  );
};

export default TestPage;

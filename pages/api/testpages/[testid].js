import db from "../../../services/firebase/firestore";

export default async function handler(req, res) {
  const {
    query: { testid },
  } = req;

  console.log({ testid });

  const date = new Date().toISOString();

  await db.collection("tests").doc(testid).set({ date });

  return res.status(200).json({ date });
}

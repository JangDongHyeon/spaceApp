import routes from "../routes";
import Summary from "../models/Summary";
import User from "../models/User";
import request from "request-promise-native";

export const addSummary = async (req, res) => {
  const {
    params: { id },
    body: { contents }
  } = req;
  const options = {
    uri: "https://chat.neoali.com:8074/summary_short",
    method: "POST",
    form: { String: contents }
  };
  let summary;
  try {
    await request(options)
      .then(body => {
        summary = body;
      })
      .catch(err => console.log(err));
    const user = await User.findById(id);
    const newSummary = await Summary.create({
      summary: summary,
      userId: id
    });

    user.summarys.push(newSummary);
    user.save();
    res.json({ summary_index: newSummary._id, summary: summary });
  } catch (error) {
    console.log(error);
    res.status(400);
  } finally {
    res.end();
  }
};

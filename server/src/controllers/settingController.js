import SiteSetting from "../models/SiteSetting.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { createSuccess } from "../utils/apiResponse.js";

const getDoc = async () => {
  let doc = await SiteSetting.findOne({ key: "site" });
  if (!doc) {
    doc = await SiteSetting.create({ key: "site" });
  }
  return doc;
};

export const getSettings = asyncHandler(async (req, res) => {
  const doc = await getDoc();
  createSuccess(res, doc);
});

export const updateSettings = asyncHandler(async (req, res) => {
  const doc = await getDoc();

  const patch = {};
  if (req.body.site) patch.site = req.body.site;
  if (req.body.pricing) patch.pricing = req.body.pricing;

  const updated = await SiteSetting.findByIdAndUpdate(doc._id, patch, {
    new: true,
    runValidators: true,
  });

  createSuccess(res, updated);
});

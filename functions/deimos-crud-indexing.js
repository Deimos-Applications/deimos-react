const deburr = require("lodash/deburr");

const INDEX_FIELD = "keywords";

const getTokens = (value) => {
  const tokens = [];

  // TODO: Add more formatting rules
  const formattedValue = deburr(value.toLowerCase());

  for (let index = 1; index <= formattedValue.length; index++) {
    tokens.push(formattedValue.substr(0, index));
  }

  return tokens;
};

const deimosCrudIndexing = (fields, changes, { eventType }) => {
  // console.log("Deimos CRUD Indexing", fields, eventType);

  const ALLOWED_TYPES = [
    "google.firestore.document.update",
    "google.firestore.document.create",
  ];

  if (ALLOWED_TYPES.includes(eventType)) {
    const data = changes.after.data();
    console.log(data);

    let keywords = {};

    if (data[INDEX_FIELD]) {
      keywords = data[INDEX_FIELD];
      console.log(`replacing ${INDEX_FIELD}...`, keywords);
    }

    for (const field of fields) {
      console.log(`indexing ${field}`);

      if (data[field]) {
        const tokens = getTokens(data[field]);
        keywords[field] = tokens;
      }
    }

    // Write the new payload
    return changes.after.ref.set({ [INDEX_FIELD]: keywords }, { merge: true });
  }
};

module.exports = deimosCrudIndexing;

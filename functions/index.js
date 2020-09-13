const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { integrify } = require("integrify");
const capitalize = require("lodash/capitalize");

admin.initializeApp();
const db = admin.firestore();

integrify({ config: { functions, db } });

const deimosCrudIndexing = require("./deimos-crud-indexing");

const DEIMOS_SYNC_COLLECTION = "deimos-crud-sync";
const baseDoc = {
  id: "",
  name: "",
  total: 0,
  last: null,
};

const getDocCount = async (collection) => {
  // TODO: Find a better way to get the total count
  const docsData = await db.collection(collection).select("id").get();
  return docsData.size;
};

// Deimos CRUD pagination tracking
exports.deimosCrudPaginationTrackingCreate = functions.firestore
  .document("/{collection}/{docId}")
  .onCreate(async (snap, ctx) => {
    const collection = ctx.params.collection;
    const last = snap.id;

    const doc = await db
      .collection(DEIMOS_SYNC_COLLECTION)
      .doc(collection)
      .get();

    if (doc.exists) {
      const data = doc.data();

      let total = 0;

      if (data.total) {
        total = data.total + 1;
      } else {
        total = await getDocCount(collection);
      }

      return db
        .collection(DEIMOS_SYNC_COLLECTION)
        .doc(collection)
        .update({ total, last });
    } else {
      await db
        .collection(DEIMOS_SYNC_COLLECTION)
        .doc(collection)
        .set({
          ...baseDoc,
          name: capitalize(collection),
          id: collection,
          total: await getDocCount(collection),
          last,
        });
    }
  });

exports.deimosCrudPaginationTrackingDelete = functions.firestore
  .document("/{collection}/{docId}")
  .onDelete(async (_snap, ctx) => {
    const collection = ctx.params.collection;

    const doc = await db
      .collection(DEIMOS_SYNC_COLLECTION)
      .doc(collection)
      .get();

    if (doc.exists) {
      const data = doc.data();

      let total = 0;

      if (data.total) {
        total = data.total - 1;
      } else {
        total = await getDocCount(collection);
      }

      return db
        .collection(DEIMOS_SYNC_COLLECTION)
        .doc(collection)
        .update({ total });
    } else {
      await db
        .collection(DEIMOS_SYNC_COLLECTION)
        .doc(collection)
        .set({
          ...baseDoc,
          name: capitalize(collection),
          id: collection,
          total: await getDocCount(collection),
        });
    }
  });

// Deimos CRUD Search
exports.deimosCrudUser = functions.firestore
  .document("/user/{userId}")
  .onWrite((changes, ctx) => deimosCrudIndexing(["name"], changes, ctx));

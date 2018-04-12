import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const meaning = 'glossaries/{uid}/meanings/{word}';

export const onMeaningCreate = functions
    .database
    .ref(meaning)
    .onCreate(async (s, e) => {
        const {uid, word} = e.params;
        const char = word.charAt(0);
        await admin.database().ref(`glossaries/${uid}/letters/${char}`).set(true);
        await admin.database().ref(`glossaries/${uid}/words/${char}/${word}`).set(true);
    });

export const onMeaningDelete = functions
    .database
    .ref(meaning)
    .onDelete((s, e) => {
        const {uid, word} = e.params;
        const char = word.charAt(0);
        return admin.database().ref(`glossaries/${uid}/words/${char}/${word}`).remove();
    });

const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const csvWriter = createCsvWriter({
    path: 'words.csv',
    header: [
        //id는 field이름, title은 가장 위에 제목을 나타낸다
        {id: 'kanji', title: 'Kanji'},
        {id: 'word', title: 'Word'},
        {id: 'meaning', title: 'Meaning'},
        {id: 'meaning_fr', title: 'Meaning_FR'},
        {id: 'meaning_kr', title: 'Meaning_KR'}
    ]
});

const kanjiRawData = fs.readFileSync('kanji_v4.json');
const kanjis = JSON.parse(kanjiRawData);

const data = [];

for(const kanji of kanjis) {

    for(const word of kanji.words) {
        data.push(
            {
                kanji: kanji.kanji,
                word: word.word,
                meaning: word.meaning,
                meaning_fr: word.meaning_fr,
                meaning_kr: word.meaning_kr
            }
        )

    }
}


csvWriter
    .writeRecords(data)
    .then(()=> console.log('The CSV file was written successfully'));


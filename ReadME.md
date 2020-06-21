
*Basic, Read CSV file*

***Use `csv-parse` npm module for this purpose***

```jsx
    const parser = require('csv-parse');
    const fs = require('fs');

    const csvData = []; //array json임.

    fs.createReadStream(__dirname + '/kanji_data.csv')
        .pipe(
            parser({
                delimiter: ','
            })
        )
        .on('data', dataRow => {
            csvData.push(dataRow);
        })
        .on('end', () => {
            console.log(csvData);
        });
        
```

***Write file***

```jsx
    const kanjiFormatJSONArr = [];

    for(const kanji of csvData) {
        kanjiFormatJSONArr.push(
            {
                kanji: kanji[0],
                kr: kanji[1].replace('·', ','),
                on: kanji[2].replace('·', ','),
                kun: kanji[3].replace('·', ',')
            }
        )
    }
    const data = JSON.stringify(kanjiFormatJSONArr);
    fs.writeFileSync('formatted_kanji_for_updates.json', data);


```
*** Write CSV file, with `csv-writer` module ***

```jsx

    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    const csvWriter = createCsvWriter({
        path: 'out.csv',
        header: [
            {id: 'name', title: 'Name'},
            {id: 'surname', title: 'Surname'},
            {id: 'age', title: 'Age'},
            {id: 'gender', title: 'Gender'},
        ]
    });

    const data = [
        {
            name: 'John',
            surname: 'Snow',
            age: 26,
            gender: 'M'
        }, {
            name: 'Clair',
            surname: 'White',
            age: 33,
            gender: 'F',
        }, {
            name: 'Fancy',
            surname: 'Brown',
            age: 78,
            gender: 'F'
        }
    ];

    csvWriter
        .writeRecords(data)
        .then(()=> console.log('The CSV file was written successfully'));


```

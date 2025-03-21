document.querySelector('[js-csv-form]').addEventListener('submit', function(event) {
    event.preventDefault();
    let $this = this;

    let $text = $this.querySelector('textarea');
    let text = $text.value;

    let lines = text.replaceAll('\n ', ' ').split('~\n');

    let jsonArray = {};

    lines.forEach(function(line, index) {
        let columns = line.split('~');
        if(columns.length == 1)
            columns = line.split(';');
        if(columns.length == 1)
            columns = line.split(',');
        if(columns.length < 7)
            return;

        let i = 2;

        let name = columns[0].replaceAll(' ', '').trim().toLowerCase() + columns[1].trim().replaceAll(' ', '').toLowerCase();

        name = name.replaceAll('`', '').replaceAll('\'','').replaceAll('`','');

        // console.log(name);

        let id = md5(name);

        let user = {
            "group": "",
            "spec": "",
            "semesters": []
        }

        // console.log(columns);

        for(let i = 2; i < columns.length - 1; i += 5) {
            let number = parseInt(columns[i]);
            if(user.semesters.length < number) {
                user.semesters.push([
                    {
                        "credits": columns[i + 1],
                        "name": columns[i + 3],
                        "type": columns[i + 2],
                        "grade": parseInt(columns[i + 4])
                    }
                ]);
                continue;
            }

            // console.log(number);

            user.semesters[number - 1].push({
                "credits": columns[i + 1],
                "name": columns[i + 3],
                "type": columns[i + 2],
                "grade": parseInt(columns[i + 4])
            });
        }
        if(user.semesters.length > 0)
            jsonArray[id] = user;

        // let obj = {
        //     "name": columns[0],
        //     "ukr": parseFloat(columns[1].replace(',', '.')),
        //     "math": parseFloat(columns[2].replace(',', '.')),
        //     "history": parseFloat(columns[3].replace(',', '.')),
        //     "geo": parseFloat(columns[9].replace(',', '.')),
        //     "eng": parseFloat(columns[4].replace(',', '.')),
        //     "chem": parseFloat(columns[7].replace(',', '.')),
        //     "phis": parseFloat(columns[6].replace(',', '.')),
        //     "bio": parseFloat(columns[5].replace(',', '.')),
        //     "lit": parseFloat(columns[8].replace(',', '.')),
        //     // "con": columns[0],
        //     // "coef": columns[0],
        // };

        // if(columns[10].length > 0) 
        //     obj.con =  parseFloat(columns[10].replace(',', '.'));
        // if(columns[11].length > 0) 
        //     obj.coef =  parseFloat(columns[11].replace(',', '.'));

        // jsonArray.push(obj);
    });

    $text.value = JSON.stringify(jsonArray);
});
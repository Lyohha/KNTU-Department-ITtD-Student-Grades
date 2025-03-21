console.log("Grade app start")

$(document).ready(function() {
    function fillTable(student) {
        let $table = $('.view-table');

        student.semesters.forEach(function(value, index) {
            let semester = index + 1;
            let crossNumber = 0;

            let year = 0;

            if(semester == 1 || semester == 2) year = 1;
            if(semester == 3 || semester == 4) year = 2;
            if(semester == 5 || semester == 6) year = 3;
            if(semester == 7 || semester == 8) year = 4;

            let $semester = $(`<tr><td colspan="7" class="table-year">${year} курс, ${semester} семестр</td></tr>`);
            $table.append($semester);

            let grade = 0;
            let countGrades = 0;

            value.forEach(function(obj, j) {
                if(obj.grade == 0)
                    return;

                crossNumber++;
                countGrades++;

                grade += obj.grade;

                let grade2 = '';
                let grade3 = '';

                if(obj.grade < 60) {
                    grade2 = 'не задовільно';
                    grade3 = 'F';
                }
                else if(obj.grade < 64) {
                    grade2 = 'задовільно';
                    grade3 = 'E';
                }
                else if(obj.grade < 74) {
                    grade2 = 'задовільно';
                    grade3 = 'D';
                }
                else if(obj.grade < 82) {
                    grade2 = 'добре';
                    grade3 = 'С';
                }
                else if(obj.grade < 90) {
                    grade2 = 'добре';
                    grade3 = 'B';
                }
                else {
                    grade2 = 'відмінно';
                    grade3 = 'А';
                }

                if(obj.type.toLowerCase() == 'залік') {
                    grade2 = obj.grade < 60 ? 'не зараховано' : 'зараховано';
                }

                let credits = obj.credits / 30;

                if(parseInt(credits) * 30 != obj.credits)
                    credits = credits.toFixed(2);
                else
                    credits = credits.toFixed(0);

                let $element = $(`
                    <tr>
                        <td>${crossNumber}</td>
                        <td class="align_left">${obj.name}</td>
                        <td>${obj.credits}/${credits}</td>
                        <td>${obj.type}</td>
                        <td>${grade2}</td>
                        <td>${obj.grade}</td>
                        <td>${grade3}</td>
                    </tr>
                `);
                $table.append($element);
            });

            // if(countGrades > 0) {
            //     grade /= countGrades;
            //     $element = $(`
            //         <tr>
            //             <td colspan="2" class="align_left table-grade">Середній бал успішності за семестр</td>
            //             <td></td>
            //             <td></td>
            //             <td></td>
            //             <td class="table-grade">${grade.toFixed(2)}</td>
            //         </tr>
            //     `);
            //     $table.append($element);
            // }
        });

        $('.none').removeClass('none');
    }

    $('form').submit(function(event) {
        event.preventDefault();

        let $first = $('[name="first_name"]');
        let $second = $('[name="second_name"]');
        let $third = $('[name="third_name"]');
        let $group = $('[name="group_name"]');

        let first = $first.val().trim().toLowerCase();
        let second = $second.val().trim().toLowerCase();
        let third = $third.val().trim().toLowerCase();
        let group = $group.val().trim().replaceAll(' ', '').toLowerCase();

        let value = first + second + third + group;

        value = value.replaceAll('`', '').replaceAll('\'','').replaceAll('`','');

        // console.log(value);

        value = md5(value);
        // console.log(value);

        // console.log(window.grades[value]);

        if(window.grades[value] == null) {
            alert("Студент з такими даними не знайдено!")
            return;
        }

        $('.student-name').html($first.val().trim() + ' ' + $second.val().trim() + ' ' +  $third.val().trim() + ' ' + $group.val().trim().replaceAll(' ', '').toUpperCase());

        fillTable(window.grades[value]);
        $(this).addClass('none');
    });

    
});
let cities, person, specializations = [];

Promise.all(
    [
        fetch('../data/cities.json'),
        fetch('../data/person.json'),
        fetch('../data/specializations.json')
    ]
).then(async ([citiesResp, personResp, specializationsResp]) => {
    const citiesJson = await citiesResp.json();
    const personJson = await personResp.json();
    const specializationsJson = await specializationsResp.json();
    return [citiesJson, personJson, specializationsJson];
}).then((response) => {
    cities = response[0];
    person = response[1];
    specializations = response[2];

    dataWork();
});


function dataWork() {
    // person.forEach(element => {
    //     console.log(getInfo.call(element));        
    // });
    //task3();
    //task4();
    //task5();
    task6();
};

function getInfo(addInfo = '') {
    let location = cities.find(el => {
        return el.id === this.personal.locationId
    });
    return `${this.personal.firstName} ${this.personal.lastName}, ${location.name}${addInfo}`;
};

function task3() {
    let spec = specializations.find(el => {
        return el.name === 'designer';
    });
    console.log('%cДизайнеры владеющие Figma:', 'color: green');
    person.filter(el => {
        return el.personal.specializationId === spec.id;
    }).filter(el => {
        return el.skills.some(el => {
            return el.name.toLowerCase() === 'figma';
        });
    }).forEach(el => {
        let figmaSkill = el.skills.find(el => {
            return el.name.toLowerCase() === 'figma';
        });
        console.log(getInfo.call(el, `, уровень владения Figma: ${figmaSkill.level}`));
    });
};

function task4() {
    person.find(el => {
        return el.skills.find(elSkill => {
            if (elSkill.name.toLowerCase() === 'react') {
                console.log('%cПервый попавшийся разработчик, владеющий React:', 'color: green');
                console.log(getInfo.call(el, `, уровень владения React: ${elSkill.level}`));
                return true;
            };
        });
    });
};

function calculateAge(birthday) {
    const [day, month, year] = birthday.split('.');
    const birthdate = new Date(year, month, day);
    const today = new Date();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    let age = today.getFullYear() - birthdate.getFullYear();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) age--;
    return age;
};

function task5() {
    console.log('%cПользователи старше 18 лет:', 'color: green');
    person.forEach(el => {
        const age = calculateAge(el.personal.birthday);
        if (age > 18) {
            console.log(getInfo.call(el, `, Возраст: ${age}`));
        };
    });
    console.log('%cПользователи младше 18 лет:', 'color: green');
    person.forEach(el => {
        const age = calculateAge(el.personal.birthday);
        if (age <= 18) {
            console.log(getInfo.call(el, `, Возраст: ${age}`));
        };
    });
};

function task6() {
    //const salaryItem = person.request.find(item => item.name === 'Зарплата');
    //const salary = salaryItem ? Number(salaryItem.value) : 0;
    
    let pers = person.filter(ind => {
        return ind.personal.specializationId === specializations.find(spec => { return spec.name.toLowerCase() === 'backend' }).id
            && ind.personal.locationId === cities.find(city => { return city.name.toLowerCase() === 'москва' }).id
            && ind.request.find(req => { return req.name.toLowerCase() === 'тип занятости' }).value.toLowerCase() === 'полная';
    }).map(el=>{
        el.request.find(salary=>{return salary.name.toLowerCase()==='зарплата'}).value;
    })

    let costArr = pers.find(ind => { return ind.request.some(cost => { return cost.name.toLowerCase() === 'зарплата' })});

    console.log(costArr);
};
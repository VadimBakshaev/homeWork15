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
    task3();
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
    console.log('%cДизайнеры владеющие Figma:','color: green');
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